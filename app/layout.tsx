import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCL Soluções | Pisos Laminados e Vinílicos",
  description: "A base perfeita para o seu projeto. Encontre o piso ideal para sua casa ou escritório.",
  openGraph: {
    title: "MCL Soluções | Pisos Laminados e Vinílicos",
    description: "A base perfeita para o seu projeto. Encontre o piso ideal para sua casa ou escritório.",
    url: "https://mclsolucoes.com.br",
    siteName: "MCL Soluções",
    images: [
      {
        url: "https://mclsolucoes.com.br/og-logo.jpg",
        width: 800,
        height: 800,
        alt: "MCL Soluções Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCL Soluções | Pisos Laminados e Vinílicos",
    description: "A base perfeita para o seu projeto. Encontre o piso ideal.",
    images: ["https://mclsolucoes.com.br/hero_home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
