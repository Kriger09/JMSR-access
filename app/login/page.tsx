"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Ingresa correo y contraseña.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        setError("No se encontró un perfil válido.");
        return;
      }

      if (profile.role === "admin") {
        router.push("/admin");
        return;
      }

      if (profile.role === "caseta") {
        router.push("/caseta");
        return;
      }

      if (profile.role === "resident") {
        router.push("/residente");
        return;
      }

      setError("Rol no válido.");
    } catch {
      setError("Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-4 py-6 overflow-hidden">
      <section className="relative max-w-6xl mx-auto flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-red-900/20 blur-3xl" />
          <div className="absolute bottom-24 left-10 h-56 w-56 rounded-full bg-yellow-600/10 blur-3xl" />
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-center">
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300 shadow-2xl">
              Acceso seguro
            </div>

            <div className="mt-1 flex">
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl" />
              <img
                src="./icon-192.png"
                alt="JMSR Access"
                className="relative w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,115,0,0.35)]"
              />
            </div>
          </div>

            <p className="mt-5 uppercase tracking-[0.35em] text-orange-400 font-semibold text-sm">
              Fraccionamiento José María Sánchez Ramírez
            </p>

            <h1 className="mt-5 text-6xl font-black tracking-tight leading-none">
              Control seguro de accesos residenciales
            </h1>

            <p className="mt-6 text-neutral-300 text-lg max-w-xl leading-relaxed">
              Plataforma digital para administrar accesos, validar códigos QR, gestionar visitas y fortalecer la seguridad del fraccionamiento.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <section className="relative bg-neutral-900/90 border border-neutral-800 rounded-[2rem] p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />

              <div className="flex justify-center lg:hidden mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl" />
              <img
                src="./icon-192.png"
                alt="JMSR Access"
                className="relative w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,115,0,0.35)]"
              />
            </div>
              </div>

              <p className="text-orange-400 font-semibold tracking-[0.3em] uppercase text-xs">
                JMSR Access
              </p>

              <div className="mt-2 inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-300">
                Versión 1.0
              </div>

              <h1 className="text-4xl md:text-5xl font-black mt-3 tracking-tight">
                Iniciar sesión
              </h1>

              <p className="text-neutral-400 mt-4 leading-relaxed text-sm md:text-base">
                Acceso exclusivo para residentes, caseta y administración autorizada.
              </p>

              <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-800/50 p-3 text-xs text-neutral-400">
                Todas las actividades de acceso y validación quedan registradas para fines de seguridad y control interno.
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="usuario@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-800/90 border border-neutral-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className="w-full bg-neutral-800/90 border border-neutral-700 rounded-2xl px-5 py-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-950/80 border border-red-800 text-red-200 rounded-2xl p-4 text-sm font-semibold">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="group w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl py-4 font-black text-lg transition-all active:scale-[0.99] shadow-2xl shadow-orange-950/40"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Ingresando...
                    </span>
                  ) : (
                    <span>
                      Entrar al sistema
                      <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
      <section className="relative max-w-6xl mx-auto flex items-center justify-center">
        <div className="mt-10 w-full max-w-5xl rounded-[2rem] border border-neutral-800 bg-neutral-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <p className="text-orange-400 font-semibold tracking-[0.25em] uppercase text-m">
                Acerca de JMSR Access
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black">
                Plataforma digital de control residencial
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
                JMSR Access es un sistema diseñado para fortalecer la seguridad, organización y trazabilidad del control de accesos del Fraccionamiento José María Sánchez Ramírez.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
                <p className="text-orange-400 text-lg font-black uppercase tracking-[0.2em]">
                  QR temporales
                </p>
                <p className="mt-2 text-neutral-400 text-m leading-relaxed">
                  Generación de códigos de acceso con vigencia limitada para visitantes autorizados.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
                <p className="text-orange-400 text-lg font-black uppercase tracking-[0.2em]">
                  Caseta
                </p>
                <p className="mt-2 text-neutral-400 text-m leading-relaxed">
                  Validación rápida de visitantes mediante escaneo QR y registro de entrada o rechazo.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
                <p className="text-orange-400 text-lg font-black uppercase tracking-[0.2em]">
                  Administración
                </p>
                <p className="mt-2 text-neutral-400 text-m leading-relaxed">
                  Gestión de casas, usuarios, roles, dispositivos autorizados e historial operativo.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-5">
                <p className="text-orange-400 text-lg font-black uppercase tracking-[0.2em]">
                  Trazabilidad
                </p>
                <p className="mt-2 text-neutral-400 text-m leading-relaxed">
                  Registro digital de actividades para consulta, control interno y seguimiento de accesos.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-4">
            <p className="text-sm text-orange-100 leading-relaxed">
              Versión 1.0 orientada a operación residencial, control de visitantes y administración segura de accesos.
            </p>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">
              Desarrollado por Kriger
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}