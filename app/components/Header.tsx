"use client"
import Image from "next/image"
import { UTMAwareLink as Link } from "./UTMAwareLink"
import { useState } from "react"
import { DynamicWhatsAppLink } from "./DynamicWhatsAppLink"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative w-36 sm:w-40 md:w-48 h-12 sm:h-14 md:h-16 shrink-0 block">
                    <Image
                        src="/logo.png"
                        alt="MCL Soluções Logo"
                        fill
                        className="object-contain object-left md:object-center"
                        priority
                    />
                </Link>

                {/* Mobile Menu Icon */}
                <button
                    className="lg:hidden p-2 text-mcl-blue hover:text-mcl-gold transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    )}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6 font-bold text-sm text-mcl-blue tracking-wide">
                    <Link href="/" className="hover:text-mcl-gold transition-colors">INÍCIO</Link>
                    <Link href="/quem-somos" className="hover:text-mcl-gold transition-colors">QUEM SOMOS</Link>
                    <Link href="/laminados" className="hover:text-mcl-gold transition-colors">LAMINADOS</Link>
                    <Link href="/vinilicos" className="hover:text-mcl-gold transition-colors">VINÍLICOS</Link>
                    <Link href="#" className="hover:text-mcl-gold transition-colors">PROJETOS</Link>
                    <Link href="/contato" className="hover:text-mcl-gold transition-colors">CONTATO</Link>
                    <DynamicWhatsAppLink
                        defaultMessage="Olá! Gostaria de solicitar um orçamento de pisos."
                        className="bg-mcl-gold text-white px-6 py-2.5 rounded-full hover:bg-[#8F684C] transition-all shadow-md ml-4 text-xs tracking-wider"
                    >
                        SOLICITAR ORÇAMENTO
                    </DynamicWhatsAppLink>
                </nav>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl flex flex-col px-4 py-4 gap-2 font-bold text-sm text-mcl-blue tracking-wide z-50 animate-in slide-in-from-top-2">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 border-b border-gray-50 uppercase">INÍCIO</Link>
                    <Link href="/quem-somos" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 border-b border-gray-50 uppercase">QUEM SOMOS</Link>
                    <Link href="/laminados" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 border-b border-gray-50 uppercase">LAMINADOS</Link>
                    <Link href="/vinilicos" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 border-b border-gray-50 uppercase">VINÍLICOS</Link>
                    <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 border-b border-gray-50 uppercase">PROJETOS</Link>
                    <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="hover:text-mcl-gold transition-colors w-full py-3 uppercase">CONTATO</Link>

                    <DynamicWhatsAppLink
                        defaultMessage="Olá! Gostaria de solicitar um orçamento de pisos."
                        className="bg-mcl-gold text-white px-6 py-3.5 mt-2 rounded-full hover:bg-[#8F684C] transition-all shadow-md text-xs tracking-wider w-full mb-2 text-center block"
                    >
                        SOLICITAR ORÇAMENTO
                    </DynamicWhatsAppLink>
                </div>
            )}
        </header>
    )
}
