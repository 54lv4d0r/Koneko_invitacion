import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mis XV - Marelynk Nicole Altamirano",
  description: "Invitación Digital",
  openGraph: {
    title: "Mis XV - Marelynk Nicole Altamirano",
    description: "Invitación Digital",
    url: "https://koneko-invitacion.vercel.app",
    siteName: "Invitación Digital",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
