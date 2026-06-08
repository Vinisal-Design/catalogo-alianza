import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const brand = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alianza Jeans — Catálogo",
  description:
    "Catálogo completo Alianza Jeans: jaquetas, calças, shorts e saias femininas e masculinas. Moda jeans com qualidade.",
  openGraph: {
    title: "Alianza Jeans — Catálogo",
    description: "Catálogo completo de moda jeans Alianza.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15110e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${brand.variable}`}
    >
      <body className="bg-sand text-ink font-body antialiased">{children}</body>
    </html>
  );
}
