import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
        url: "https://mclsolucoes.com.br/og-logo-black.jpg",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17988428930"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17988428930');
          `}
        </Script>
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-17988428930/_zHqCPqr3oEcEILJxoFD',
                'value': 1.0,
                'currency': 'BRL',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
