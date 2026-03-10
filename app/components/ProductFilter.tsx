"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

interface ProductFilterProps {
    readonly basePath?: string
}

export function ProductFilter({ basePath }: ProductFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentTone = searchParams.get("tone") || "todos"
    const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")

    useEffect(() => {
        setSearchValue(searchParams.get("q") || "")
    }, [searchParams])

    const filterOptions = [
        { label: "TODOS", value: "todos" },
        { label: "TONS CLAROS", value: "tons-claros" },
        { label: "TONS ESCUROS", value: "tons-escuros" },
        { label: "AMADEIRADOS QUENTES", value: "amadeirados-quentes" },
    ]

    const handleFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "todos") {
            params.delete("tone")
        } else {
            params.set("tone", value)
        }

        const route = basePath ?? pathname
        router.push(`${route}?${params.toString()}`, { scroll: false })
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (searchValue.trim()) {
            params.set("q", searchValue.trim())
        } else {
            params.delete("q")
        }

        // Reset to first page or tone if desired, but we can keep tone filter as is
        const route = basePath ?? pathname
        router.push(`${route}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex flex-col items-center gap-6 my-8 px-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Pesquisar Pisos, rodapés e acabamentos"
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-mcl-blue focus:ring-1 focus:ring-mcl-blue shadow-sm text-sm"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-mcl-blue transition-colors">
                    <Search className="w-5 h-5" />
                </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                {filterOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleFilter(option.value)}
                        className={`
                px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider
                transition-all duration-300 border-2
                ${currentTone === option.value
                                ? "bg-mcl-blue text-white border-mcl-blue shadow-md"
                                : "bg-white text-mcl-blue border-mcl-blue/20 hover:border-mcl-blue/60"}`
                        }
                    >
                        {currentTone === option.value ? option.label : `[ ${option.label} ]`}
                    </button>
                ))}
            </div>
        </div>
    )
}
