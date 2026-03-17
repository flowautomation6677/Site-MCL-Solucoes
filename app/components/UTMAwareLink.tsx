"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ComponentProps, Suspense } from "react"

type UTMAwareLinkProps = ComponentProps<typeof Link>

function UTMAwareLinkContent(props: UTMAwareLinkProps) {
    const searchParams = useSearchParams()

    // All standard UTM parameters to propagate
    const UTM_PARAMS = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"]

    // Collect whichever UTM params exist in the current URL
    const utmEntries = UTM_PARAMS
        .map((key) => [key, searchParams.get(key)] as [string, string | null])
        .filter(([, value]) => value !== null)

    // If no UTMs or href isn't a string, return a normal Link
    if (utmEntries.length === 0 || typeof props.href !== "string") {
        return <Link {...props} />
    }

    // Build new href copying all UTM params from the current URL
    const hrefObj = new URL(props.href, "http://localhost")
    for (const [key, value] of utmEntries) {
        hrefObj.searchParams.set(key, value!)
    }

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
