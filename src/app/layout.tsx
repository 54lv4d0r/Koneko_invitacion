import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mis XV - Natasha | Invitación Digital",
  description: "Te invito a compartir conmigo este día tan especial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
