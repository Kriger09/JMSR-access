

"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AppNavbarProps = {
  title: string;
  role: "admin" | "caseta" | "resident";
};

export default function AppNavbar({ title, role }: AppNavbarProps) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const roleLabel =
    role === "admin"
      ? "Administrador"
      : role === "caseta"
        ? "Caseta"
        : "Residente";

  return (
    <header className="group relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-3xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-orange-600/20 blur-3xl" />
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-neutral-950/60 blur-3xl" />
      <div className="group relative">
        <p className="text-orange-400 font-semibold tracking-[0.3em] uppercase text-sm">
          JMSR Access
        </p>

        <h1 className="text-3xl md:text-4xl font-black mt-2">{title}</h1>

        <p className="text-neutral-400 mt-2 text-sm">
          Sesión activa como: {roleLabel}
        </p>
      </div>

      <button
        onClick={logout}
        className="group relative bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-2xl px-6 py-4 font-bold transition-all"
      >
        Cerrar sesión
      </button>
    </header>
  );
}