"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { WhatsAppLink } from "./WhatsAppLink"

interface DynamicWhatsAppLinkProps {
    readonly defaultMessage?: string
    readonly children: React.ReactNode
    readonly className?: string
    readonly ariaLabel?: string
    readonly productName?: string
}

function DynamicWhatsAppLinkContent({ 
    defaultMessage = "Olá! Gostaria de falar com um especialista em pisos.", 
    children, 
    className, 
    ariaLabel,
    productName 
}: DynamicWhatsAppLinkProps) {
    const searchParams = useSearchParams()
    
    // Calcula a mensagem baseada no nome do produto ou na padrão
    const initialMsg = productName 
        ? `Olá! Tenho interesse no produto: ${productName}. Gostaria de solicitar um orçamento.`
        : defaultMessage

    const source = searchParams.get("utm_source")?.toLowerCase()
    const campaign = searchParams.get("utm_campaign")?.toLowerCase()
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
                mensagem = "Olá! Vim pelo Google e gostaria de falar com um especialista em pisos."
            } else if (source === "meta" || source === "facebook" || source === "instagram") {
                mensagem = `Olá! Vi seu anúncio no ${fonteFormatada} e gostaria de falar com um especialista em pisos.`
            } else {
                mensagem = `Olá! Vim através do ${fonteFormatada} e gostaria de falar com um especialista em pisos.`
            }
        }
    }

    // Adiciona rodapé de rastreamento UTM se houver source ou campaign
    if (source || campaign) {
        const utmSource = source ?? "direto"
        const utmCampaign = campaign ?? "sem-campanha"
        mensagem += `\n\n[UTM: ${utmSource} | ${utmCampaign}]`
    }

    const waHref = `https://wa.me/5521996749001?text=${encodeURIComponent(mensagem)}`

    return (
        <WhatsAppLink href={waHref} className={className} ariaLabel={ariaLabel}>
            {children}
        </WhatsAppLink>
    )
}


export function DynamicWhatsAppLink(props: DynamicWhatsAppLinkProps) {
    const fallbackMsg = props.productName 
        ? `Olá! Tenho interesse no produto: ${props.productName}. Gostaria de solicitar um orçamento.`
        : (props.defaultMessage || "Olá! Gostaria de falar com um especialista em pisos.")

    return (
        <Suspense fallback={
            <WhatsAppLink 
                href={`https://wa.me/5521996749001?text=${encodeURIComponent(fallbackMsg)}`} 
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
