import Image from "next/image"
import Link from "next/link"
import { WhatsAppLink } from "./WhatsAppLink"

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
)

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

export function Footer() {
    return (
        <footer className="pt-16 bg-[#081B3A] text-white font-sans mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b-2 border-mcl-gold/70 text-center lg:text-left">

                    {/* Brand Info */}
                    <div className="flex flex-col gap-5 items-center lg:items-start">
                        <div className="relative w-48 h-20 mx-auto lg:mx-0">
                            {/* Removed the white wrapper since we're using the negative (light) logo version */}
                            <Image
                                src="/Logo-MCL-negativo-transparente.png"
                                alt="MCL Soluções Logo"
                                fill
                                className="object-contain object-center lg:object-left"
                            />
                        </div>
                        <p className="text-gray-300 text-[15px] leading-relaxed pr-4 mt-2">
                            Sua parceira em pisos laminados e vinílicos. Qualidade e profissionalismo para o seu ambiente.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <button type="button" aria-label="Facebook" className="text-white hover:text-mcl-gold transition-colors">
                                <FacebookIcon />
                            </button>
                            <a href="https://www.instagram.com/mclsolucoes/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-mcl-gold transition-colors">
                                <InstagramIcon />
                            </a>
                            <WhatsAppLink
                                href="https://wa.me/5521985778195"
                                className="text-white hover:text-mcl-gold transition-colors"
                                ariaLabel="WhatsApp"
                            >
                                <WhatsAppIcon />
                            </WhatsAppLink>
                        </div>
                    </div>

                    {/* Navegação */}
                    <div className="flex flex-col gap-4 lg:pl-4">
                        <h4 className="text-[16px] font-bold tracking-wider mb-2 text-white">NAVEGAÇÃO</h4>
                        <Link href="/" className="text-gray-300 hover:text-white text-[15px] transition-colors">Início</Link>
                        <Link href="/laminados" className="text-gray-300 hover:text-white text-[15px] transition-colors">Laminados</Link>
                        <Link href="/vinilicos" className="text-gray-300 hover:text-white text-[15px] transition-colors">Vinílicos</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">Projetos</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">Contato</Link>
                    </div>

                    {/* Informações */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[16px] font-bold tracking-wider mb-2 text-white">INFORMAÇÕES</h4>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">Sobre Nós</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">FAQ</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">Política de Privacidade</Link>
                        <Link href="#" className="text-gray-300 hover:text-white text-[15px] transition-colors">Termos de Uso</Link>
                    </div>

                    {/* Contato */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[16px] font-bold tracking-wider mb-2 text-white">CONTATO</h4>
                        <div className="text-gray-300 text-[15px] flex flex-col gap-1">
                            <span className="font-bold text-white">Endereço:</span>
                            <span>Rua Senador Correia, 5</span>
                            <span>Santa Eugênia - Nova Iguaçu</span>
                        </div>
                        <div className="text-gray-300 text-[15px] flex flex-col gap-1">
                            <span className="font-bold text-white">Telefone:</span>
                            <WhatsAppLink
                                href="https://wa.me/5521985778195"
                                className="hover:text-mcl-gold transition-colors"
                            >
                                (21) 98577-8195
                            </WhatsAppLink>
                        </div>
                        <div className="text-gray-300 text-[15px] flex flex-col gap-1">
                            <span className="font-bold text-white">E-mail:</span>
                            <a href="mailto:contato@mclsolucoes.com.br" className="hover:text-white transition-colors">contato@mclsolucoes.com.br</a>
                        </div>
                        <div className="text-gray-300 text-[15px] flex flex-col gap-1">
                            <span className="font-bold text-white">Horário:</span>
                            <span>10h às 16h00 de segunda-feira a sexta-feira</span>
                        </div>
                    </div>

                </div>

                {/* Sub-footer */}
                <div className="py-6 flex justify-center items-center text-[13px] text-gray-400">
                    <p>© {new Date().getFullYear()} MCL Soluções. Todos os direitos reservados. Desenvolvido por Flow Automation</p>
                </div>
            </div>
        </footer>
    )
}
