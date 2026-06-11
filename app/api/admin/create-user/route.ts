

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
      full_name,
      role,
      house_id,
    } = body;

    if (!email || !password || !full_name || !role) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    const userId = authUser.user.id;

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        email,
        full_name,
        role,
        house_id: house_id || null,
      });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);

      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: userId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}