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
