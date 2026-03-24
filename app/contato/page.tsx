import { Mail, MapPin, Phone, Clock, Star } from "lucide-react"

const InstagramIcon = ({ className }: { readonly className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { DynamicWhatsAppLink } from "../components/DynamicWhatsAppLink"

export default function ContatoPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center pt-16 pb-16 md:py-24 px-4 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-96 bg-mcl-blue/5 -skew-y-3 transform origin-top-left -z-10" />
                <div className="absolute bottom-0 right-0 w-full h-96 bg-mcl-gold/5 skew-y-3 transform origin-bottom-right -z-10" />

                <div className="max-w-7xl mx-auto w-full text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#081B3A] tracking-tight mb-4 uppercase">
                        CONTATO
                    </h1>
                    <div className="w-24 h-1.5 bg-mcl-gold mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        Estamos prontos para tirar suas dúvidas e ajudar no projeto do seu novo piso.
                    </p>
                </div>

                <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 z-10">
                    {/* Left side: Info */}
                    <div className="bg-[#081B3A] text-white p-10 md:p-14 md:w-[45%] flex flex-col justify-center relative overflow-hidden">
                        {/* Abstract shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-mcl-gold/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                        <div className="relative z-10 flex flex-col gap-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Fale Conosco</h2>

                            <DynamicWhatsAppLink className="flex items-center gap-5 hover:bg-white/5 p-3 -ml-3 rounded-2xl transition-colors group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-mcl-gold/20 group-hover:scale-105 transition-all shrink-0">
                                    <Phone className="w-7 h-7 text-mcl-gold" />
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Telefone / WhatsApp</span>
                                    <span className="block text-xl font-medium">(21) 99674-9001</span>
                                </div>
                            </DynamicWhatsAppLink>

                            <a href="mailto:vendas.mcl.solucoes@gmail.com" className="flex items-center gap-5 hover:bg-white/5 p-3 -ml-3 rounded-2xl transition-colors group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-mcl-gold/20 group-hover:scale-105 transition-all shrink-0">
                                    <Mail className="w-7 h-7 text-mcl-gold" />
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">E-mail</span>
                                    <span className="block text-lg font-medium break-all">vendas.mcl.solucoes@gmail.com</span>
                                </div>
                            </a>

                            <div className="flex items-start gap-5 p-3 -ml-3 group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <MapPin className="w-7 h-7 text-mcl-gold" />
                                </div>
                                <div className="pt-1">
                                    <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Endereço</span>
                                    <span className="block text-lg font-medium leading-relaxed">Rua Senador Correia, 5<br />Santa Eugênia - Nova Iguaçu</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-3 -ml-3 group">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Clock className="w-7 h-7 text-mcl-gold" />
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Horário</span>
                                    <span className="block text-lg font-medium">10h às 16h (Seg à Sex)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Social/Map */}
                    <div className="p-10 md:p-14 md:w-[55%] bg-white flex flex-col justify-center gap-10">
                        <div>
                            <h3 className="text-2xl font-bold text-[#081B3A] mb-8 relative inline-block">
                                Redes Sociais
                                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-mcl-gold rounded-full"></div>
                            </h3>

                            <div className="flex flex-col gap-5">
                                <a
                                    href="https://www.instagram.com/mclsolucoes/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-5 rounded-[1.5rem] border-2 border-gray-100 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/10 transition-all group bg-gray-50/50"
                                >
                                    <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                        <InstagramIcon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-extrabold text-[#081B3A] text-lg mb-1">Instagram</span>
                                        <span className="block text-sm text-gray-500 font-medium">@mclsolucoes | Veja nossos projetos</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-pink-500 group-hover:border-pink-200 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </a>

                                <a
                                    href="https://www.google.com/search?q=MCL+Soluções+pisos+nova+iguaçu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-5 rounded-[1.5rem] border-2 border-gray-100 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group bg-gray-50/50"
                                >
                                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                        <Star className="w-7 h-7 fill-current" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-extrabold text-[#081B3A] text-lg mb-1">Google Meu Negócio</span>
                                        <span className="block text-sm text-gray-500 font-medium">Confira nossas avaliações 5.0 estrelas</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="rounded-[1.5rem] overflow-hidden border border-gray-200 shadow-md h-56 relative bg-gray-100 flex items-center justify-center group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.966455325567!2d-43.4357774!3d-22.766627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99672008fb56a1%3A0xe5a363a02bbdc3fa!2sR.%20Sen.%20Correia%2C%205%20-%20Santa%20Eugenia%2C%20Nova%20Igua%C3%A7u%20-%20RJ%2C%2026286-060!5e0!3m2!1spt-BR!2sbr!4v1709848281000!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa de localização MCL Soluções"
                                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
