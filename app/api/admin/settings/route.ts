import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const supabaseAuthVerifier = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("system_settings")
      .select(
        "id, system_name, neighborhood_name, max_devices_per_house, max_active_qr, qr_expiration_hours, created_at, updated_at"
      )
      .limit(1)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ settings: data });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
        system_name,
        neighborhood_name,
        max_devices_per_house,
        max_active_qr,
        qr_expiration_hours,
        confirmation_password,
      } = body;

    const { data: existingSettings, error: existingSettingsError } = await supabaseAdmin
      .from("system_settings")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existingSettingsError) {
      return NextResponse.json(
        { error: existingSettingsError.message },
        { status: 400 }
      );
    }

    if (!existingSettings?.id) {
      return NextResponse.json(
        { error: "No existe una configuración inicial del sistema." },
        { status: 404 }
      );
    }

    if (!confirmation_password) {
        return NextResponse.json(
          { error: "Para modificar la configuración debes ingresar la contraseña autorizada." },
          { status: 401 }
        );
    }
      
    const { error: confirmationError } = await supabaseAuthVerifier.auth.signInWithPassword({
        email: "kriger.yagob09@gmail.com",
        password: confirmation_password,
    });
      
    if (confirmationError) {
        return NextResponse.json(
          { error: "Contraseña de autorización incorrecta." },
          { status: 401 }
        );
    }

    if (!system_name || !neighborhood_name) {
      return NextResponse.json(
        { error: "Nombre del sistema y fraccionamiento son obligatorios." },
        { status: 400 }
      );
    }

    if (
      Number(max_devices_per_house) < 1 ||
      Number(max_active_qr) < 1 ||
      Number(qr_expiration_hours) < 1
    ) {
      return NextResponse.json(
        { error: "Los límites deben ser mayores a cero." },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("system_settings")
      .update({
        system_name,
        neighborhood_name,
        max_devices_per_house: Number(max_devices_per_house),
        max_active_qr: Number(max_active_qr),
        qr_expiration_hours: Number(qr_expiration_hours),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingSettings.id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    const { data: updatedSettings, error: updatedSettingsError } = await supabaseAdmin
      .from("system_settings")
      .select(
        "id, system_name, neighborhood_name, max_devices_per_house, max_active_qr, qr_expiration_hours, created_at, updated_at"
      )
      .eq("id", existingSettings.id)
      .maybeSingle();

    if (updatedSettingsError) {
      return NextResponse.json(
        { error: updatedSettingsError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ settings: updatedSettings ?? null });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}