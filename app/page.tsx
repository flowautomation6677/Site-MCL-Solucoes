import Image from "next/image"
import Link from "next/link"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { WhatsAppLink } from "./components/WhatsAppLink"
import { ShieldCheck, Droplet, DollarSign, Ruler } from "lucide-react"

export const metadata = {
  title: "MCL Soluções | Pisos Laminados e Vinílicos",
  description: "A base perfeita para o seu projeto. Encontre o piso ideal com a MCL Soluções.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-mcl-light flex flex-col font-sans">
      <Header />

      {/* HERO SECTION */}
      <section className="w-full relative min-h-[500px] flex items-center bg-white overflow-hidden">
        {/* Background Image mostly on the right */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="relative w-full lg:w-[65%] h-full">
            <Image
              src="/hero_home.jpg"
              alt="Sala com piso laminado perfeito"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 65vw"
              className="object-cover"
              priority
            />
            {/* Soft fade overlay on the left side of the image */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent hidden md:block"></div>
            {/* Dark/White overlay for mobile readability */}
            <div className="absolute inset-0 bg-white/70 md:hidden"></div>
          </div>
        </div>

        {/* Text Content overlaying the white/gradient area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
          <div className="max-w-xl py-12 md:py-16 lg:py-24 md:bg-gradient-to-r md:from-white md:via-white/95 md:to-transparent md:pr-12 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-mcl-blue leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-6 uppercase">
              A BASE PERFEITA<br className="hidden md:block" /> PARA O SEU PROJETO<br className="hidden lg:block" /> DE PISOS.
            </h1>
            <p className="text-base sm:text-lg text-gray-800 md:text-gray-700 mb-8 md:mb-10 leading-relaxed font-semibold md:font-medium mx-auto md:mx-0 max-w-sm md:max-w-none">
              Pisos laminados e vinílicos com instalação especializada e acabamento impecável.
            </p>
            <WhatsAppLink
              href="https://wa.me/5521996749001?text=Olá! Gostaria de falar com um especialista em pisos."
              className="inline-block bg-mcl-blue text-white w-full sm:w-auto px-8 py-4 md:py-3.5 rounded-full font-bold shadow-lg hover:bg-[#081B3A] transition-transform active:scale-95 text-sm tracking-widest text-center"
            >
              FALAR COM UM ESPECIALISTA
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS SECTION */}
      {/* Deep blue background block - matching mockup EXACTLY */}
      <div className="w-full relative z-20 mt-8 md:mt-12 bg-white">

        {/* The solid blue color taking the bottom half */}
        <div className="w-full bg-mcl-blue h-[70%] md:h-[450px] absolute bottom-0 z-0"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pb-12 md:pb-16">

          {/* Card Laminados */}
          <div className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-black/5">
            <div className="relative h-48 md:h-64 w-full">
              {/* Note: The user requested fidelity. In the mockup this is exactly half the card's height */}
              <Image
                src="/piso_laminado.jpg"
                alt="Piso Laminado Textura"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:pb-10 flex flex-col items-center flex-1 bg-white">
              <h2 className="text-xl md:text-[22px] font-extrabold text-[#081B3A] tracking-wider mb-6 md:mb-8 uppercase">
                Pisos Laminados
              </h2>
              <div className="flex gap-4 sm:gap-8 md:gap-12 w-full justify-center mb-8">
                <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-mcl-gold rounded-full bg-orange-50/50">
                    <DollarSign className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#404040]">Custo-benefício</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-mcl-gold rounded-full bg-orange-50/50">
                    <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#404040]">Instalação rápida</span>
                </div>
              </div>
              <Link href="/laminados" className="w-full sm:w-[85%] mt-auto">
                <button className="w-full bg-[#122442] text-white py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest hover:bg-blue-900 transition-colors">
                  VER OPÇÕES DE LAMINADOS
                </button>
              </Link>
            </div>
          </div>

          {/* Card Vinílicos */}
          <div className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-black/5">
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src="/piso_vinilico.jpg"
                alt="Piso Vinílico Textura"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:pb-10 flex flex-col items-center flex-1 bg-white">
              <h2 className="text-xl md:text-[22px] font-extrabold text-[#081B3A] tracking-wider mb-6 md:mb-8 uppercase">
                Pisos Vinílicos
              </h2>
              <div className="flex gap-4 sm:gap-8 md:gap-12 w-full justify-center mb-8">
                <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-mcl-gold rounded-full bg-orange-50/50">
                    <Droplet className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#404040]">Resistente à água</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-mcl-gold rounded-full bg-orange-50/50">
                    <Ruler className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#404040]">Conforto acústico</span>
                </div>
              </div>
              <Link href="/vinilicos" className="w-full sm:w-[85%] mt-auto">
                <button className="w-full bg-[#122442] text-white py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest hover:bg-blue-900 transition-colors">
                  VER OPÇÕES DE VINÍLICOS
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}



