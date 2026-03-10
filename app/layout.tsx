import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { WhatsAppFAB } from "./components/WhatsAppFAB";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mclsolucoes.com.br"),
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
                'send_to': 'AW-17988428930/z10tCNPot4IcEILJxoFD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vq505r344x");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "MCL Soluções",
              "description": "A base perfeita para o seu projeto. Encontre o piso ideal para sua casa ou escritório.",
              "url": "https://mclsolucoes.com.br",
              "telephone": "+5521996749001",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Senador Correia, 5",
                "addressLocality": "Nova Iguaçu",
                "addressRegion": "RJ",
                "addressCountry": "BR"
              },
              "image": "https://mclsolucoes.com.br/og-logo-black.jpg",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
