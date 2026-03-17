"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ComponentProps, Suspense } from "react"

type UTMAwareLinkProps = ComponentProps<typeof Link>

function UTMAwareLinkContent(props: UTMAwareLinkProps) {
    const searchParams = useSearchParams()
    const utmSource = searchParams.get("utm_source")

    // If there is no utm_source, or if the href isn't a simple string, just return a normal Link.
    if (!utmSource || typeof props.href !== "string") {
        return <Link {...props} />
    }

    // Append utm_source dynamically
    const hrefObj = new URL(props.href, "http://localhost") // Dummy base for relative URLs
    hrefObj.searchParams.set("utm_source", utmSource)
    
    // We only want the pathname + search
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
