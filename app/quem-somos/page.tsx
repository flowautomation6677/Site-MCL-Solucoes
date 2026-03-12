import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Target, Eye, Shield, CheckCircle2 } from "lucide-react"

export const metadata = {
    title: "Quem Somos | MCL Soluções",
    description: "Conheça a MCL Soluções, especialista em fornecimento e instalação de pisos.",
}

export default function QuemSomosPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <Header />

            {/* HERO SECTION - MASSIVE TYPOGRAPHIC */}
            <section className="w-full relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center bg-[#081B3A] overflow-hidden">
                {/* Abstract geometric background patterns */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-[#0A224A] rotate-12 transform origin-center z-0"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[30%] h-[150%] bg-mcl-gold/10 -rotate-12 transform origin-center z-0"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-[80px] font-black text-white leading-[1.1] tracking-tighter mb-6">
                        QUEM <span className="text-mcl-gold">SOMOS</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
                        Transformando ambientes através de soluções que unem <strong className="text-white font-semibold">qualidade</strong>, <strong className="text-white font-semibold">estética</strong> e <strong className="text-white font-semibold">funcionalidade</strong>.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT - ASYMMETRIC TENSION & LAYERED */}
            <section className="w-full py-20 relative bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative">
                        {/* Left column: Text Content */}
                        <div className="lg:col-span-7 lg:pr-12 flex flex-col justify-center">
                            <h2 className="text-sm font-bold tracking-[0.2em] text-mcl-gold uppercase mb-4">Nossa Essência</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-[#081B3A] mb-8 leading-tight">
                                Mais que obras, realizamos <br className="hidden md:block" />projetos e sonhos.
                            </h3>
                            
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Somos uma empresa especializada em <strong className="text-[#081B3A]">fornecimento e instalação de pisos</strong>, dedicada a transformar ambientes através de soluções que unem qualidade, estética e funcionalidade.
                                </p>
                                <p>
                                    Nosso compromisso é oferecer um atendimento profissional e transparente, com especificações corretas para cada tipo de ambiente e necessidade, garantindo que cada cliente faça a melhor escolha para seu projeto.
                                </p>
                                <p>
                                    Trabalhamos com honestidade, pró-atividade, simplicidade, respeito e conhecimento técnico.
                                </p>
                            </div>
                        </div>

                        {/* Right column: Image/Abstract block */}
                        <div className="lg:col-span-5 relative h-[400px] lg:h-auto w-full group">
                            {/* Sharp edges, brutalist framing */}
                            <div className="absolute inset-0 bg-[#081B3A] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 ease-out z-0"></div>
                            <div className="absolute inset-0 bg-mcl-gold -translate-x-4 -translate-y-4 group-hover:-translate-x-6 group-hover:-translate-y-6 transition-transform duration-500 ease-out z-0 opacity-50"></div>
                            <div className="absolute inset-0 bg-white border-2 border-[#081B3A] z-10 p-8 flex flex-col justify-center items-center text-center">
                                <Target size={64} className="text-mcl-gold mb-6 stroke-[1.5]" />
                                <blockquote className="text-2xl font-bold text-[#081B3A] italic leading-tight">
                                    &quot;O compromisso com o seu ambiente é a nossa marca.&quot;
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION, VISION, VALUES - EXPERIMENTAL CENTER-STAGGERED OR BRUTALIST GRID */}
            <section className="w-full py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        
                        {/* Missão */}
                        <div className="flex flex-col md:pl-12 border-l-4 border-mcl-gold">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#081B3A] text-white">
                                    <Target size={32} />
                                </div>
                                <h2 className="text-4xl font-extrabold text-[#081B3A] tracking-tight">Missão</h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                                Ser referência em fornecimento e instalação de pisos, cuidando de cada detalhe do processo para entregar qualidade, segurança e excelência.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Buscamos atender clientes, fornecedores e parceiros de forma exemplar, promovendo crescimento contínuo, aprendizado técnico e desenvolvimento sustentável.
                            </p>
                        </div>

                        {/* Visão */}
                        <div className="flex flex-col md:pr-12 md:text-right md:items-end border-r-0 md:border-r-4 border-l-4 md:border-l-0 border-mcl-gold">
                            <div className="flex items-center gap-4 mb-6 md:flex-row-reverse">
                                <div className="p-3 bg-[#081B3A] text-white">
                                    <Eye size={32} />
                                </div>
                                <h2 className="text-4xl font-extrabold text-[#081B3A] tracking-tight">Visão</h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-4 md:text-right">
                                Manter uma cultura de aprendizado contínuo e evolução constante, buscando excelência em todas as áreas em que atuamos.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed md:text-right">
                                Trabalhamos com clareza, eficiência e visão estratégica, sempre evoluindo para oferecer as melhores soluções do mercado.
                            </p>
                        </div>

                        {/* Valores - Span full width with a different topology */}
                        <div className="md:col-span-2 pt-12 border-t-2 border-gray-100">
                            <div className="flex items-center justify-center gap-4 mb-16">
                                <div className="p-3 bg-[#081B3A] text-white">
                                    <Shield size={32} />
                                </div>
                                <h2 className="text-4xl font-extrabold text-[#081B3A] tracking-tight text-center">Nossos Valores</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: "Fé em Deus", desc: "Acreditando que o trabalho dignifica e transforma." },
                                    { title: "Honestidade e Transparência", desc: "O pilar essencial em todas as nossas relações e negociações." },
                                    { title: "Respeito", desc: "Com nossos clientes, parceiros, fornecedores e colaboradores." },
                                    { title: "Compromisso com a Qualidade", desc: "Atenção rigorosa em cada detalhe de cada projeto." },
                                    { title: "Trabalho com Propósito", desc: "Buscando sempre fazer o nosso melhor, todos os dias." },
                                ].map((value) => (
                                    <div key={value.title} className="bg-gray-50 border border-gray-200 p-8 hover:bg-[#081B3A] hover:text-white transition-colors duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-mcl-gold flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-xl font-bold mb-3 text-[#081B3A] group-hover:text-mcl-gold transition-colors">{value.title}</h4>
                                                <p className="text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                                                    {value.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
