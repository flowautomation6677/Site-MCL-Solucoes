# 📱 Manual: Botão WhatsApp Dinâmico com UTM (Next.js)

> Estratégia para rastrear a origem dos leads vindos de anúncios (Google Ads, Meta Ads etc.) e incluir mensagens personalizadas nos botões de WhatsApp.

---

## 🧠 Conceito Geral

Quando você cria anúncios pagos, adiciona **parâmetros UTM** na URL de destino:

```
https://seusite.com/?utm_source=meta
https://seusite.com/?utm_source=google
```

Ao chegar no site, o código lê esse parâmetro e **personaliza automaticamente a mensagem do WhatsApp** enviada pelo visitante. O resultado: você sabe de onde cada lead veio diretamente pelo histórico do WhatsApp.

---

## 🏗️ Arquitetura da Solução

```
Anúncio (UTM na URL)
     ↓
Site Next.js (lê utm_source via useSearchParams)
     ↓
DynamicWhatsAppLink → mensagem personalizada no wa.me
```

---

## 📦 Componente 1: `DynamicWhatsAppLink.tsx`

**O coração da solução.** Lê o UTM da URL e monta a mensagem do WhatsApp dinamicamente.

### Arquivo completo

```tsx
"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { WhatsAppLink } from "./WhatsAppLink" // Componente base (veja abaixo)

interface DynamicWhatsAppLinkProps {
    readonly defaultMessage?: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
    readonly productName?: string // opcional: nome do produto de interesse
}

function DynamicWhatsAppLinkContent({
    defaultMessage = "Olá! Gostaria de falar com um especialista.",
    children,
    className,
    ariaLabel,
    productName
}: DynamicWhatsAppLinkProps) {
    const searchParams = useSearchParams()

    const initialMsg = productName
        ? `Olá! Tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`
        : defaultMessage

    const source = searchParams.get("utm_source")?.toLowerCase()
    let mensagem = initialMsg

    if (source) {
        const fonteFormatada = source.charAt(0).toUpperCase() + source.slice(1)

        if (productName) {
            if (source === "google" || source === "googleads") {
                mensagem = `Olá! Vim pelo Google, tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`
            } else if (source === "meta" || source === "facebook" || source === "instagram") {
                mensagem = `Olá! Vi seu anúncio no ${fonteFormatada}, tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`
            } else {
                mensagem = `Olá! Vim através do ${fonteFormatada}, tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`
            }
        } else {
            if (source === "google" || source === "googleads") {
                mensagem = "Olá! Vim pelo Google e gostaria de falar com um especialista."
            } else if (source === "meta" || source === "facebook" || source === "instagram") {
                mensagem = `Olá! Vi seu anúncio no ${fonteFormatada} e gostaria de falar com um especialista.`
            } else {
                mensagem = `Olá! Vim através do ${fonteFormatada} e gostaria de falar com um especialista.`
            }
        }
    }

    const waHref = `https://wa.me/SEUNUMERO?text=${encodeURIComponent(mensagem)}`
    // ⚠️ Substitua SEUNUMERO pelo número com DDI+DDD (ex: 5521999999999)

    return (
        <WhatsAppLink href={waHref} className={className} ariaLabel={ariaLabel}>
            {children}
        </WhatsAppLink>
    )
}

export function DynamicWhatsAppLink(props: DynamicWhatsAppLinkProps) {
    const fallbackMsg = props.productName
        ? `Olá! Tenho interesse no produto: ${props.productName}. Gostaria de solicitar um orçamento.`
        : (props.defaultMessage || "Olá! Gostaria de falar com um especialista.")

    return (
        <Suspense fallback={
            <WhatsAppLink
                href={`https://wa.me/SEUNUMERO?text=${encodeURIComponent(fallbackMsg)}`}
                className={props.className}
                ariaLabel={props.ariaLabel}
            >
                {props.children}
            </WhatsAppLink>
        }>
            <DynamicWhatsAppLinkContent {...props} />
        </Suspense>
    )
}
```

> **Por que o `Suspense`?** O hook `useSearchParams()` requer que o componente seja um *Client Component*. Envolvê-lo em `Suspense` garante que páginas *Server Component* funcionem corretamente sem prejudicar o SEO.

---

## 📦 Componente 2: `WhatsAppLink.tsx`

Componente base simples que renderiza o `<a>` para o WhatsApp.

```tsx
interface WhatsAppLinkProps {
    readonly href: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
}

export function WhatsAppLink({ href, children, className, ariaLabel }: WhatsAppLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={ariaLabel}
        >
            {children}
        </a>
    )
}
```

---

## 📦 Componente 3: `UTMAwareLink.tsx`

**Preserva o UTM ao navegar entre páginas internas.** Substitui o `<Link>` padrão do Next.js.

```tsx
"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ComponentProps, Suspense } from "react"

type UTMAwareLinkProps = ComponentProps<typeof Link>

function UTMAwareLinkContent(props: UTMAwareLinkProps) {
    const searchParams = useSearchParams()
    const utmSource = searchParams.get("utm_source")

    if (!utmSource || typeof props.href !== "string") {
        return <Link {...props} />
    }

    const hrefObj = new URL(props.href, "http://localhost")
    hrefObj.searchParams.set("utm_source", utmSource)
    const newHref = `${hrefObj.pathname}${hrefObj.search}`

    return <Link {...props} href={newHref} />
}

export function UTMAwareLink(props: UTMAwareLinkProps) {
    return (
        <Suspense fallback={<Link {...props} />}>
            <UTMAwareLinkContent {...props} />
        </Suspense>
    )
}
```

### Como usar

Substitua `import Link from "next/link"` por:

```tsx
import { UTMAwareLink as Link } from "./UTMAwareLink"
```

O restante do código continua **idêntico** — é um drop-in replacement.

---

## 🚀 Como implementar em um novo projeto

### Passo 1 — Configure os UTMs nos seus anúncios

| Plataforma | Parâmetro sugerido |
|---|---|
| Google Ads | `?utm_source=google` |
| Meta / Facebook | `?utm_source=meta` |
| Instagram | `?utm_source=instagram` |
| E-mail marketing | `?utm_source=email` |

### Passo 2 — Copie os 3 componentes

1. `WhatsAppLink.tsx` — componente base
2. `DynamicWhatsAppLink.tsx` — inteligência UTM + produto
3. `UTMAwareLink.tsx` — preservação do UTM entre páginas

Ajuste o número do WhatsApp (`SEUNUMERO`) em `DynamicWhatsAppLink.tsx`.

### Passo 3 — Substitua os links de navegação

Em `Header.tsx`, `Footer.tsx` e qualquer outro arquivo com links internos:

```tsx
// Antes
import Link from "next/link"

// Depois
import { UTMAwareLink as Link } from "./UTMAwareLink"
```

### Passo 4 — Substitua os botões de WhatsApp

```tsx
// Antes (link estático)
<a href="https://wa.me/5521999999999?text=Olá!">Falar no WhatsApp</a>

// Depois (dinâmico com UTM)
<DynamicWhatsAppLink className="...">
    Falar no WhatsApp
</DynamicWhatsAppLink>

// Com produto específico (ex: modal de produto)
<DynamicWhatsAppLink productName={product.name} className="...">
    Solicitar Orçamento
</DynamicWhatsAppLink>
```

---

## 💬 Lógica das Mensagens

| Cenário | Mensagem gerada |
|---|---|
| Sem UTM | "Olá! Gostaria de falar com um especialista." |
| `utm_source=google` | "Olá! Vim pelo Google e gostaria de falar com um especialista." |
| `utm_source=meta` | "Olá! Vi seu anúncio no Meta e gostaria de falar com um especialista." |
| `utm_source=instagram` | "Olá! Vi seu anúncio no Instagram e gostaria de falar com um especialista." |
| Qualquer outro source | "Olá! Vim através do [Source] e gostaria de falar com um especialista." |
| Com produto + Google | "Olá! Vim pelo Google, tenho interesse no produto: [Nome]. Gostaria de solicitar um orçamento." |
| Com produto + Meta | "Olá! Vi seu anúncio no Meta, tenho interesse no produto: [Nome]. Gostaria de solicitar um orçamento." |

---

## ⚠️ Armadilhas Comuns

### 1. EPERM no Windows (Prisma + Next.js dev server)
```
EPERM: operation not permitted, rename '...query_engine-windows.dll.node'
```
**Causa:** O servidor de dev está travando o arquivo do Prisma.  
**Solução:**
```powershell
taskkill /F /IM node.exe
npx prisma db push
npm run dev
```

### 2. UTM sumindo ao navegar
**Causa:** Usar `<Link>` padrão do Next.js limpa os query params.  
**Solução:** Usar `UTMAwareLink` em todos os links de navegação interna.

### 3. `useSearchParams` quebrando SSR
**Causa:** Usar o hook diretamente em Server Components.  
**Solução:** Sempre envolver em `Suspense` (já implementado no `DynamicWhatsAppLink`).

---

## ✅ Checklist de Implementação

- [ ] Copiar `WhatsAppLink.tsx`, `DynamicWhatsAppLink.tsx`, `UTMAwareLink.tsx`
- [ ] Ajustar número do WhatsApp em `DynamicWhatsAppLink.tsx`
- [ ] Ajustar texto padrão das mensagens para o novo negócio
- [ ] Substituir `Link` por `UTMAwareLink` no Header e Footer
- [ ] Substituir links `wa.me` estáticos por `<DynamicWhatsAppLink>`
- [ ] Configurar UTMs nos anúncios do Google Ads e Meta Ads
- [ ] Testar acessando `?utm_source=google` e `?utm_source=meta` e clicar no WhatsApp
- [ ] (Opcional) Configurar GTM para rastrear cliques no WhatsApp

---

## 📊 Rastreamento de Cliques no WhatsApp via GTM

> Esta seção documenta a implementação **real** feita no projeto MCL Soluções, já testada e funcionando em produção.

### Ferramentas instaladas

| Ferramenta | ID / Detalhe |
|---|---|
| Google Tag Manager | `GTM-MBSZ2SBJ` |
| Google Ads (para conversão) | `AW-17988428930` |
| Microsoft Clarity (gravação de sessão) | `vq505r344x` |

---

### Como funciona o fluxo completo

```
Usuário clica no botão WhatsApp
     ↓
onClick (WhatsAppLink.tsx)
     ↓
1. dataLayer.push({ event: "click_whatsapp" })  → GTM detecta o evento
2. gtag_report_conversion(href)                 → Dispara conversão no Google Ads
     ↓
GTM processa e envia para GA4 / Google Ads
```

---

### Passo 1 — Instalação do GTM no `layout.tsx`

O GTM e os scripts de rastreamento foram adicionados no `<head>` do Root Layout:

```tsx
// app/layout.tsx
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

        {/* ③ Função de conversão do Google Ads (chamada no clique do WhatsApp) */}
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

        {/* ④ Microsoft Clarity (gravação de tela + heatmaps) */}
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
        {/* GTM noscript fallback (para quem bloqueia JS) */}
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

> **Por que `strategy="afterInteractive"`?** Para não bloquear o carregamento da página — o GTM é carregado após o HTML principal ser renderizado.

---

### Passo 2 — O `WhatsAppLink.tsx` com tracking

Este é o componente base que dispara os eventos de rastreamento no clique:

```tsx
// components/WhatsAppLink.tsx
"use client"

interface WhatsAppLinkProps {
    readonly href: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
    readonly target?: string
    readonly rel?: string
}

// Declara a função gtag_report_conversion para TypeScript reconhecer
declare global {
    interface Window {
        gtag_report_conversion?: (url?: string) => boolean
    }
}

export function WhatsAppLink({
    href,
    children,
    className,
    ariaLabel,
    target = "_blank",
    rel = "noopener noreferrer",
}: WhatsAppLinkProps) {
    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
        // ① Dispara o evento para o GTM/GA4
        if (globalThis.window !== undefined) {
            const win = globalThis.window as any
            win.dataLayer = win.dataLayer || []
            win.dataLayer.push({ event: "click_whatsapp" })
        }

        // ② Dispara conversão no Google Ads
        // Se a função existir (script carregado), previne o link e espera o callback
        if (typeof globalThis.window?.gtag_report_conversion === "function") {
            e.preventDefault()
            globalThis.window.gtag_report_conversion(href)
        }
    }

    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={className}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {children}
        </a>
    )
}
```

#### Por que dois rastreamentos?

| Rastreamento | O que faz |
|---|---|
| `dataLayer.push({ event: "click_whatsapp" })` | Envia evento para o GTM, que pode repassar ao GA4, Meta Pixel, e qualquer outra ferramenta configurada no container |
| `gtag_report_conversion(href)` | Dispara explicitamente uma **conversão** do Google Ads com o label `z10tCNPot4IcEILJxoFD`, necessário para o modelo de atribuição de conversão funcionar dentro do Google Ads |

> **Diferença importante:** O GA4 via GTM rastreia *comportamento* (analytics). O `gtag_report_conversion` rastreia *conversões* para otimização de campanhas. Os dois são necessários em conjunto.

---

### Como configurar no painel do GTM

#### Trigger (Gatilho)

1. Tipo: **Evento personalizado**
2. Nome do evento: `click_whatsapp` ← deve ser **exatamente igual** ao `event` do `dataLayer.push`
3. Ativado em: todos os eventos personalizados

#### Tag do GA4

1. Tipo: **Evento do Google Analytics: GA4**
2. Nome do evento: `click_whatsapp`
3. Vinculado ao Trigger acima

#### Verificação

Use o **Preview Mode** do GTM (botão "Preview" no painel) e clique num botão de WhatsApp no site. Você verá o evento `click_whatsapp` aparecer no painel de debug em tempo real.

---

### Para reutilizar em novos projetos

1. Substitua `GTM-MBSZ2SBJ` pelo ID do novo GTM container
2. Substitua `AW-17988428930` pelo ID da conta do Google Ads
3. Substitua `z10tCNPot4IcEILJxoFD` pelo label da conversão criada no Google Ads
4. Substitua `vq505r344x` pelo ID da nova conta do Microsoft Clarity (opcional)
5. Copie `WhatsAppLink.tsx` sem alterações — a lógica de disparo é genérica


```
Usuário clica no botão WhatsApp
     ↓
onClick → dispara window.dataLayer.push(...)
     ↓
GTM escuta o dataLayer e detecta o evento
     ↓
GTM envia o evento para GA4 / Meta Pixel / etc.
```

---

### Passo 1 — Instalar o GTM no Next.js

Adicione o script do GTM no arquivo `app/layout.tsx`:

```tsx
// app/layout.tsx
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-XXXXXXX');
                        `,
                    }}
                />
            </head>
            <body>
                {/* GTM noscript fallback */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
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

> ⚠️ Substitua `GTM-XXXXXXX` pelo seu ID real do GTM.

---

### Passo 2 — Criar o helper `gtm.ts`

Crie um arquivo utilitário para disparar eventos de forma centralizada:

```ts
// lib/gtm.ts

export function pushGTMEvent(event: Record<string, unknown>) {
    if (typeof window === "undefined") return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
}
```

Declare o `dataLayer` no TypeScript para evitar erros de tipo:

```ts
// types/global.d.ts  (ou em qualquer .d.ts do projeto)
declare global {
    interface Window {
        dataLayer: Record<string, unknown>[]
    }
}
```

---

### Passo 3 — Atualizar o `WhatsAppLink.tsx` com o evento

O rastreamento é feito num `onClick` no componente base:

```tsx
// components/WhatsAppLink.tsx
"use client"

import { pushGTMEvent } from "@/lib/gtm"

interface WhatsAppLinkProps {
    readonly href: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
    readonly utmSource?: string      // origem (meta, google...)
    readonly productName?: string    // nome do produto (opcional)
    readonly location?: string       // onde o botão está: "header", "footer", "modal", "fab"
}

export function WhatsAppLink({
    href,
    children,
    className,
    ariaLabel,
    utmSource,
    productName,
    location = "site",
}: WhatsAppLinkProps) {
    const handleClick = () => {
        pushGTMEvent({
            event: "whatsapp_click",          // nome do evento no GTM
            whatsapp_location: location,      // onde clicou
            whatsapp_utm_source: utmSource || "organico",  // origem do tráfego
            whatsapp_product: productName || null,          // produto (se houver)
        })
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            {children}
        </a>
    )
}
```

---

### Passo 4 — Passar as props até o `WhatsAppLink`

Atualize o `DynamicWhatsAppLink` para retransmitir o `utmSource` e `location`:

```tsx
// Adicione as props na interface
interface DynamicWhatsAppLinkProps {
    // ... anteriores
    readonly location?: string   // "header" | "footer" | "modal" | "fab" | "hero"
}

// No retorno, passe para o WhatsAppLink
return (
    <WhatsAppLink
        href={waHref}
        className={className}
        ariaLabel={ariaLabel}
        utmSource={source || undefined}
        productName={productName}
        location={location}
    >
        {children}
    </WhatsAppLink>
)
```

#### Uso com localização:

```tsx
// Header
<DynamicWhatsAppLink location="header">Solicitar Orçamento</DynamicWhatsAppLink>

// Botão flutuante
<DynamicWhatsAppLink location="fab">...</DynamicWhatsAppLink>

// Modal de produto
<DynamicWhatsAppLink location="modal" productName={product.name}>
    Solicitar Orçamento
</DynamicWhatsAppLink>
```

---

### Passo 5 — Configurar o GTM (interface web)

Acesse [tagmanager.google.com](https://tagmanager.google.com) e configure:

#### 5.1 — Criar o Trigger (Gatilho)

1. Vá em **Gatilhos → Novo**
2. Tipo: **Evento personalizado**
3. Nome do evento: `whatsapp_click`
4. Este gatilho é ativado em: **Todos os eventos personalizados**
5. Salve como: `Gatilho - WhatsApp Click`

#### 5.2 — Criar variáveis de dataLayer

Crie 3 variáveis do tipo "variável da camada de dados":

| Nome da variável | Chave dataLayer |
|---|---|
| `DL - WA Location` | `whatsapp_location` |
| `DL - WA UTM Source` | `whatsapp_utm_source` |
| `DL - WA Product` | `whatsapp_product` |

#### 5.3 — Criar a Tag do GA4

1. Vá em **Tags → Nova**
2. Tipo: **Evento do Google Analytics: GA4**
3. ID de medição: seu `G-XXXXXXXX`
4. Nome do evento: `whatsapp_click`
5. **Parâmetros do evento:**

| Parâmetro | Valor |
|---|---|
| `location` | `{{DL - WA Location}}` |
| `utm_source` | `{{DL - WA UTM Source}}` |
| `product_name` | `{{DL - WA Product}}` |

6. Gatilho: `Gatilho - WhatsApp Click`
7. Salve e **publique** o container.

---

### Como ver os dados no GA4

1. Acesse **GA4 → Relatórios → Engajamento → Eventos**
2. Procure o evento `whatsapp_click`
3. Clique no evento para ver os parâmetros (`location`, `utm_source`, `product_name`)

Para análises avançadas, use o **Explorador de dados** (Explore) com:
- Dimensão: `whatsapp_location` → veja qual botão converte mais
- Dimensão: `utm_source` → veja qual canal gera mais leads
- Dimensão: `product_name` → veja qual produto atrai mais interesse

---

### Estrutura final do evento no dataLayer

Um clique no botão de orçamento do modal, vindo de um anúncio do Meta, envia:

```js
{
    event: "whatsapp_click",
    whatsapp_location: "modal",
    whatsapp_utm_source: "meta",
    whatsapp_product: "Piso Vinílico Durafloor"
}
```

Isso permite filtrar no GA4 com total precisão: **qual produto, em qual parte do site, vindo de qual anúncio**.

