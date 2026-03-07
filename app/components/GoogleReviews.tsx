import { Star } from "lucide-react"
import Image from "next/image"

const REVIEWS = [
    {
        id: 1,
        name: "Livia Teixeira",
        text: "Excelente atendimento! Pontual e simplesmente ficou linda minha sala 🙏",
        initials: "LT",
        color: "bg-blue-600",
        date: "2 meses atrás",
        image: "/images/livia-teixeira.jpg"
    },
    {
        id: 2,
        name: "Melina Pompeu",
        text: "Serviço excelente, do primeiro contato à execução rápida. Segunda vez que contrato o serviço e recomendo.",
        initials: "MP",
        color: "bg-green-600",
        date: "4 meses atrás",
        image: "/images/melina.jpg"
    },
    {
        id: 3,
        name: "Roberto Almeida",
        text: "Foram extremamente pontuais e a qualidade do trabalho ficou ótima.",
        initials: "RA",
        color: "bg-purple-600",
        date: "5 meses atrás",
        image: "/images/piso-laminado-eucafloor-prime-click-carvalho-rustico.jpg"
    },
    {
        id: 4,
        name: "Juliana Santos",
        text: "Meu salão ficou lindíssimo. Serviço atencioso, diligente e de ótima qualidade.",
        initials: "JS",
        color: "bg-orange-600",
        date: "7 meses atrás",
        image: "/images/piso-vinilico-tarkett-injoy-papoula.jpg"
    },
]

export function GoogleReviews() {
    return (
        <section className="w-full bg-mcl-light py-16 md:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-[#081B3A] tracking-tight mb-4 uppercase">
                            O QUE NOSSOS CLIENTES DIZEM
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <span className="text-[#081B3A] font-bold text-3xl">5,0</span>
                                <div className="flex text-[#FBBC05]">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={`star-headline-${i}`} className="w-6 h-6 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                <div className="text-sm">
                                    <span className="font-bold text-gray-900 block">Google Meu Negócio</span>
                                    <span className="text-gray-500">Avaliação Excelente</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://www.google.com/search?q=MCL+Soluções+pisos+nova+iguaçu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-gray-200 text-[#081B3A] px-6 py-3 rounded-full font-bold text-sm tracking-wider hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap"
                    >
                        VER AVALIAÇÕES NO GOOGLE
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-full ${review.color} text-white flex items-center justify-center font-bold text-lg`}>
                                    {review.initials}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{review.name}</h3>
                                    <span className="text-xs text-gray-500">{review.date}</span>
                                </div>
                            </div>
                            <div className="flex text-[#FBBC05] mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={`review-${review.id}-star-${i}`} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                "{review.text}"
                            </p>
                            {review.image && (
                                <div className="relative w-full h-40 mt-auto rounded-xl overflow-hidden mb-4">
                                    <Image
                                        src={review.image}
                                        alt={`Projeto de ${review.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-100 flex items-center gap-2 mt-auto">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-mcl-blue fill-current">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                <span className="text-xs font-semibold text-mcl-blue">Avaliação verificada</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
