import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
    {
        "name": "Piso Laminado Quick-Step Vision Carvalho Vitoriano",
        "slug": "piso-laminado-quick-step-vision-carvalho-vitoriano-1",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-quick-step-vision-carvalho-vitoriano.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Quick-Step Vision Carvalho Vitoriano oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Fresno Decape New",
        "slug": "piso-laminado-eucafloor-prime-fresno-decape-new-2",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-fresno-decape-new.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Fresno Decape New oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "piso laminado Eucafloor Prime CLICK - Carvalho Rústico",
        "slug": "piso-laminado-eucafloor-prime-click-carvalho-r-stico-3",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-carvalho-rustico.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado piso laminado Eucafloor Prime CLICK - Carvalho Rústico oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Gran Elegance Belmonte",
        "slug": "gran-elegance-belmonte-4",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/gran-elegance-belmonte.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Gran Elegance Belmonte oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Max Elegance Claire Oak",
        "slug": "max-elegance-claire-oak-5",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/max-elegance-claire-oak.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Max Elegance Claire Oak oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "New Evidence Click Moka",
        "slug": "new-evidence-click-moka-6",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/new-evidence-click-moka.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado New Evidence Click Moka oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Square Mármore Imperador",
        "slug": "square-m-rmore-imperador-7",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/square-marmore-imperador.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Square Mármore Imperador oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Prime Click Castanho Terracota",
        "slug": "prime-click-castanho-terracota-8",
        "category": "Laminado",
        "tone": "Tons Escuros",
        "imageUrl": "/images/prime-click-castanho-terracota.jpeg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Prime Click Castanho Terracota oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click - Kalahari",
        "slug": "piso-laminado-eucafloor-prime-click-kalahari-9",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-kalahari.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click - Kalahari oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado clicado Durafloor Nature Nagoya",
        "slug": "piso-laminado-clicado-durafloor-nature-nagoya-10",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-clicado-durafloor-nature-nagoya.webp",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado clicado Durafloor Nature Nagoya oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Taos Urban - Durafloor",
        "slug": "piso-taos-urban-durafloor-11",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-taos-urban-durafloor.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Taos Urban - Durafloor oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Durafloor Petra City",
        "slug": "piso-laminado-durafloor-petra-city-12",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-durafloor-petra-city.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Durafloor Petra City oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Unique Ultra Durafloor Toledo",
        "slug": "piso-laminado-unique-ultra-durafloor-toledo-13",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-unique-ultra-durafloor-toledo.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Unique Ultra Durafloor Toledo oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor New Evidênce Veneto",
        "slug": "piso-laminado-eucafloor-new-evid-nce-veneto-14",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-new-evidence-veneto.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor New Evidênce Veneto oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Cappuccino",
        "slug": "piso-laminado-eucafloor-prime-cappuccino-15",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-cappuccino.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Cappuccino oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor prime Noce Oro",
        "slug": "piso-laminado-eucafloor-prime-noce-oro-16",
        "category": "Laminado",
        "tone": "Tons Escuros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-noce-oro.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor prime Noce Oro oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor PRIME Carvalho",
        "slug": "piso-laminado-eucafloor-prime-carvalho-17",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-carvalho.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor PRIME Carvalho oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Carvalho Maiorca",
        "slug": "piso-laminado-eucafloor-prime-carvalho-maiorca-18",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-carvalho-maiorca.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Carvalho Maiorca oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click Andorra New",
        "slug": "piso-laminado-eucafloor-prime-click-andorra-new-19",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-andorra-new.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click Andorra New oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Quick Step Floorest PREMIERE Malta 1067",
        "slug": "piso-laminado-quick-step-floorest-premiere-malta-1067-20",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-quick-step-floorest-premiere-malta-1067.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Quick Step Floorest PREMIERE Malta 1067 oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Durafloor New Way Carvalho York",
        "slug": "piso-laminado-durafloor-new-way-carvalho-york-21",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-durafloor-new-way-carvalho-york.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Durafloor New Way Carvalho York oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Click - Decapê",
        "slug": "piso-laminado-eucafloor-prime-click-decap-22",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-decape.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Click - Decapê oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click Carvalho Coimbra",
        "slug": "piso-laminado-eucafloor-prime-click-carvalho-coimbra-23",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-carvalho-coimbra.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click Carvalho Coimbra oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click Carvalho canela",
        "slug": "piso-laminado-eucafloor-prime-click-carvalho-canela-24",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-carvalho-canela.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click Carvalho canela oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click Italian Noce",
        "slug": "piso-laminado-eucafloor-prime-click-italian-noce-25",
        "category": "Laminado",
        "tone": "Tons Escuros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-italian-noce.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click Italian Noce oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor prime Lâmina Amêndoa",
        "slug": "piso-laminado-eucafloor-prime-l-mina-am-ndoa-26",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-lamina-amendoa.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor prime Lâmina Amêndoa oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Click Nogueira Malaga",
        "slug": "piso-laminado-eucafloor-prime-click-nogueira-malaga-27",
        "category": "Laminado",
        "tone": "Tons Escuros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-nogueira-malaga.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Click Nogueira Malaga oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Click Nogueira Natural",
        "slug": "piso-laminado-eucafloor-prime-click-nogueira-natural-28",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-nogueira-natural.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Click Nogueira Natural oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Elmo Natural",
        "slug": "piso-laminado-eucafloor-prime-elmo-natural-29",
        "category": "Laminado",
        "tone": "Amadeirados Quentes",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-elmo-natural.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Elmo Natural oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso laminado Eucafloor Prime Valência",
        "slug": "piso-laminado-eucafloor-prime-val-ncia-30",
        "category": "Laminado",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-valencia.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso laminado Eucafloor Prime Valência oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso Laminado Eucafloor Prime Click Cacau Rodapé Cor Do Piso",
        "slug": "piso-laminado-eucafloor-prime-click-cacau-rodap-cor-do-piso-31",
        "category": "Laminado",
        "tone": "Tons Escuros",
        "imageUrl": "/images/piso-laminado-eucafloor-prime-click-cacau-rodape-cor-do-piso.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Conforto Térmico\"]",
        "thickness": "7mm",
        "resistance": "AC3",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso laminado Piso Laminado Eucafloor Prime Click Cacau Rodapé Cor Do Piso oferece o equilíbrio ideal entre durabilidade e sofisticação. Sua tecnologia avançada garante alta resistência a riscos e facilidade de limpeza, tornando-o perfeito para ambientes residenciais e comerciais de tráfego moderado. Transforme seu espaço com o conforto e a estética acolhedora da madeira.\"}"
    },
    {
        "name": "Piso vinílico tarkett Injoy Papoula",
        "slug": "piso-vin-lico-tarkett-injoy-papoula-36",
        "category": "Vinilico",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-vinilico-tarkett-injoy-papoula.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Resistente à Água\"]",
        "thickness": "5mm",
        "resistance": "0.30mm (Capa)",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso vinílico Piso vinílico tarkett Injoy Papoula é a solução inteligente para quem busca praticidade sem abrir mão da elegância. 100% resistente à água, é ideal para todos os ambientes internos. Este padrão confere um visual contemporâneo, somado a um excelente conforto acústico e térmico.\"}"
    },
    {
        "name": "Piso vinílico Finottato Imponente Chocolate Suíço",
        "slug": "piso-vin-lico-finottato-imponente-chocolate-su-o-39",
        "category": "Vinilico",
        "tone": "Tons Escuros",
        "imageUrl": "/images/piso-vinilico-finottato-imponente-chocolate-suico.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Resistente à Água\"]",
        "thickness": "5mm",
        "resistance": "0.30mm (Capa)",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso vinílico Piso vinílico Finottato Imponente Chocolate Suíço é a solução inteligente para quem busca praticidade sem abrir mão da elegância. 100% resistente à água, é ideal para todos os ambientes internos. Este padrão confere um visual contemporâneo, somado a um excelente conforto acústico e térmico.\"}"
    },
    {
        "name": "Piso vinílico Vinilforte (cinza) granada",
        "slug": "piso-vin-lico-vinilforte-cinza-granada-40",
        "category": "Vinilico",
        "tone": "Tons Claros",
        "imageUrl": "/images/piso-vinilico-vinilforte-cinza-granada.jpg",
        "benefits": "[\"Instalação rápida\",\"Acabamento impecável\",\"Resistente à Água\"]",
        "thickness": "5mm",
        "resistance": "0.30mm (Capa)",
        "warranty": "10 anos",
        "techSpecsMisc": "{\"Descrição\":\"O piso vinílico Piso vinílico Vinilforte (cinza) granada é a solução inteligente para quem busca praticidade sem abrir mão da elegância. 100% resistente à água, é ideal para todos os ambientes internos. Este padrão confere um visual contemporâneo, somado a um excelente conforto acústico e térmico.\"}"
    }
]

async function main() {
    await prisma.product.deleteMany({})

    for (const prod of products) {
        await prisma.product.create({
            data: prod
        })
    }
    console.log('Seed completo. ' + products.length + ' produtos inseridos.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
