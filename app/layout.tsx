import type { Metadata, Viewport } from "next";
import "./globals.css";
import MobileNavbar from "./components/MobileNavbar";

export const metadata: Metadata = {
  title: {
    default: "JSMR Access",
    template: "%s | JSMR Access",
  },
  description:
    "Sistema de control de acceso QR para el Fraccionamiento José María Sánchez Ramírez.",
  applicationName: "JSMR Access",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "JSMR Access",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192_2.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512_2.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192_2.png",
    apple: [
      { url: "/icon-192_2.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512_2.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-black">
      <body className="bg-black text-white">
        <div className="min-h-screen bg-black">
          {children}

          <footer className="px-4 pb-28 pt-8 md:pb-8">
            <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-neutral-800 bg-neutral-950 px-5 py-6 text-center shadow-2xl">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-400">
                JSMR Access v1.0
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-300">
                Sistema de Control de Acceso Residencial
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-300">
                Desarrollado por Kriger
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                © 2026 JSMR Access. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </div>

        <MobileNavbar />
      </body>
    </html>
  );
}