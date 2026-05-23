import type { Metadata, Viewport } from "next";
import "./globals.css";
import InstallPWA from "./components/InstallPWA";
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
        {children}
        <InstallPWA />
        <MobileNavbar />
      </body>
    </html>
  );
}