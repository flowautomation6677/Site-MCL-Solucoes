# 📊 Manual de Trackeamento: Site MCL Soluções

Este documento serve como guia passo a passo da infraestrutura de trackeamento implementada no site da **MCL Soluções**, detalhando as ferramentas conectadas, a injeção dos scripts e o rastreamento de eventos personalizados (como o clique no WhatsApp).

---

## 🛠️ Ecossistema de Ferramentas

O site utiliza as seguintes ferramentas integradas:

| Ferramenta | ID / Detalhe | Função Principal |
|---|---|---|
| **Google Tag Manager** | `GTM-MBSZ2SBJ` | Gerenciador central de tags (recebe os eventos do site e distribui para GA4, Ads, etc.). |
| **Google Ads** | `AW-17988428930` | Rastreamento e otimização de campanhas (conversões). |
| **Google Analytics 4** | Configurado via GTM | Análise de tráfego, sessões, engajamento e eventos avançados. |
| **Microsoft Clarity** | `vq505r344x` | Gravação de tela dos usuários e mapas de calor (Heatmaps). |

---

## 🚀 Passo 1: Instalação dos Scripts Globais

Todos os scripts base de rastreamento estão injetados no arquivo principal de layout (`app/layout.tsx`). Utilizou-se o `<Script>` nativo do Next.js com a estratégia `afterInteractive` para não bloquear o carregamento visual da página (melhorando o tempo de carregamento).

### Códigos injetados no `<head>`:

1. **Google Tag Manager (GTM)**: Script de inicialização.
2. **Google Ads (gtag.js)**: Carrega a biblioteca global de acompanhamento.
3. **Google Ads Conversion Callback**: Função customizada `gtag_report_conversion` para disparar os leads de WhatsApp.
4. **Microsoft Clarity**: Script de monitoramento visual.

**Exemplo do código implantado (`app/layout.tsx`):**
```tsx
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* ① Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MBSZ2SBJ');
          `}
        </Script>

        {/* ② Google Ads tag base */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17988428930" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17988428930');
          `}
        </Script>

        {/* ③ Função de conversão do Google Ads (para clique no WhatsApp) */}
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

        {/* ④ Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vq505r344x");
          `}
        </Script>
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MBSZ2SBJ"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
```

---

## 🎯 Passo 2: Rastreamento de Eventos (Botão WhatsApp)

A conversão principal do site ocorre quando o usuário clica para chamar no WhatsApp. Foi configurado um duplo rastreamento:
1. Envio de um evento customizado (`click_whatsapp`) para o **DataLayer** do GTM.
2. Disparo direto de conversão do **Google Ads** via callback.

### Como a ação é interceptada (`components/WhatsAppLink.tsx`)
```tsx
function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // ① Dispara o evento para o GTM (que repassará ao GA4 / Meta)
    if (globalThis.window !== undefined) {
        const win = globalThis.window as any
        win.dataLayer = win.dataLayer || []
        win.dataLayer.push({ event: "click_whatsapp" })
    }

    // ② Dispara conversão explícita no Google Ads
    if (typeof globalThis.window?.gtag_report_conversion === "function") {
        e.preventDefault() // Impede a abertura instantânea para o disparo ocorrer
        globalThis.window.gtag_report_conversion(href)
    }
}
```

---

## ⚙️ Passo 3: Configuração Prática no Painel do GTM

Para que os cliques acima apareçam no **Google Analytics 4**, o container do GTM deve estar configurado com as seguintes regras:

### 3.1. Criar o Gatilho (Trigger)
O gatilho precisa "escutar" o exato momento em que o `dataLayer.push({ event: "click_whatsapp" })` é acionado.
- **Vá em**: Gatilhos → Novo
- **Tipo de Gatilho**: Evento Personalizado
- **Nome do Evento**: `click_whatsapp` (deve ser exatamente igual ao código)
- **Nome sugerido para salvar**: `Gatilho - WhatsApp Click`

### 3.2. Criar a Tag do GA4 (Disparo do evento de conversão)
A Tag enviará o dado armazenado no GTM para o painel do Google Analytics.
- **Vá em**: Tags → Nova
- **Tipo de Tag**: Evento do Google Analytics: GA4
- **ID de Medição**: Insira o seu `G-XXXXXXXX` (Código do GA4).
- **Nome do Evento**: `whatsapp_click` (como vai aparecer nos relatórios do GA4).
- **Gatilho de acionamento**: Selecione o `Gatilho - WhatsApp Click` criado anteriormente.
- Salve e **Publique** as alterações do seu espaço de trabalho do GTM.

---

## ✅ Resumo de Verificação e QA

Se quiser testar se tudo foi implementado corretamente:
1. Abra o painel do **Google Tag Manager** e clique em **Visualizar (Preview)**.
2. Conecte com a URL do site.
3. No site, clique em algum botão de WhatsApp.
4. Volte para o painel de diagnóstico do GTM e verifique no menu lateral se o evento `click_whatsapp` apareceu (isso confirma que o `dataLayer` interceptou o clique perfeitamente).
5. Verifique a Tag do GA4 como *Fired (Acionada)* no mesmo evento.
