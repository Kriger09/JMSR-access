import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { device_id, is_active } = await request.json();

    if (!device_id || typeof is_active !== "boolean") {
      return NextResponse.json(
        { error: "Parámetros inválidos." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("resident_devices")
      .update({
        is_active,
      })
      .eq("id", device_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
