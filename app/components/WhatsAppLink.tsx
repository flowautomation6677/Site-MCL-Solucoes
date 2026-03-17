"use client"

interface WhatsAppLinkProps {
    readonly href: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
    readonly target?: string
    readonly rel?: string
}

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
        if (globalThis.window !== undefined) {
            const win = globalThis.window as any
            win.dataLayer = win.dataLayer || []
            win.dataLayer.push({ event: "click_whatsapp" })
        }

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
