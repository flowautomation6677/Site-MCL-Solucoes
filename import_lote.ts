/**
 * import_lote.ts
 * Batch product import — ECOMEX + Quick-Step lote
 * Run: npx tsx import_lote.ts
 *
 * - Copies images from Produtos_Cadastrar/ → public/images/produtos/<slug>.<ext>
 * - Upserts each product in the DB (idempotent, safe to re-run)
 * - Regenerates prisma/seed.ts with all products from DB
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ─── Product definitions ───────────────────────────────────────────────────────

interface ProductDef {
  sourceFile: string; // original filename in Produtos_Cadastrar/
  name: string;
  slug: string;
  category: string;
  tone: string;
  techSpecsMisc: string;
}

const PRODUCTS: ProductDef[] = [
  // ── Quick-Step Laminados ─────────────────────────────────────────────────────
  {
    sourceFile:
      "Piso Laminado Quick-Step Alto Tráfego Eligna Wide Carvalho Café Restaurado 3679.jpeg",
    name: "Quick-Step Alto Tráfego Eligna Wide Carvalho Café Restaurado 3679",
    slug: "quick-step-alto-trafego-eligna-wide-carvalho-cafe-restaurado-3679",
    category: "Laminado",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Eleve o seu ambiente com o Quick-Step Alto Tráfego Eligna Wide Carvalho Café Restaurado 3679 — um piso laminado desenvolvido para quem não abre mão de sofisticação e resistência. Com acabamento que remete à autenticidade da madeira restaurada, ele entrega conforto termoacústico superior, mantendo o ambiente mais fresco no verão e aquecido no inverno. Sua superfície é de limpeza fácil e altíssima resistência ao tráfego intenso, perfeito para residências e espaços comerciais modernos.",
    }),
  },
  {
    sourceFile:
      "Piso Laminado Quick-Step Eligna Wide Castanheiro Escuro Restaurado 3785.jpeg",
    name: "Quick-Step Eligna Wide Castanheiro Escuro Restaurado 3785",
    slug: "quick-step-eligna-wide-castanheiro-escuro-restaurado-3785",
    category: "Laminado",
    tone: "Escuros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Imponência e elegância com o Quick-Step Eligna Wide Castanheiro Escuro Restaurado 3785. O tom escuro e profundo cria ambientes sofisticados, dignos de projetos de alto padrão. Além do visual impactante, o piso oferece excelente isolamento termoacústico — reduzindo ruídos e regulando a temperatura — e praticidade total na limpeza do dia a dia.",
    }),
  },
  {
    sourceFile:
      "Piso Laminado Quick-Step Impressive Carvalho Marrom Acinzentado 1850.jpeg",
    name: "Quick-Step Impressive Carvalho Marrom Acinzentado 1850",
    slug: "quick-step-impressive-carvalho-marrom-acinzentado-1850",
    category: "Laminado",
    tone: "Escuros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O Quick-Step Impressive Carvalho Marrom Acinzentado 1850 une a modernidade dos tons cinzentos com a aconchegante textura do carvalho. Perfeito para projetos contemporâneos, este piso laminado proporciona conforto térmico e acústico excepcionais, além de ser resistente a arranhões e de manutenção simplíssima. Uma escolha que transforma qualquer espaço.",
    }),
  },
  {
    sourceFile:
      "Piso Laminado Quick-Step Impressive Carvalho Suave Médio 1856.jpeg",
    name: "Quick-Step Impressive Carvalho Suave Médio 1856",
    slug: "quick-step-impressive-carvalho-suave-medio-1856",
    category: "Laminado",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Versatilidade e charme natural em um só produto: o Quick-Step Impressive Carvalho Suave Médio 1856. Com tom equilibrado que combina com qualquer estilo de decoração, este laminado garante conforto termoacústico de primeira linha, superfície resistente ao uso diário e limpeza prática. Ideal para criar ambientes acolhedores e contemporâneos.",
    }),
  },

  // ── ECOMEX Eco Hard ──────────────────────────────────────────────────────────
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Hard Madrid.jpeg",
    name: "Ecomex Eco Hard Madrid",
    slug: "ecomex-eco-hard-madrid",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O piso vinílico Ecomex Eco Hard Madrid traz a sofisticação das madeiras quentes para o seu ambiente, com 100% de resistência à água. Sua tecnologia Hard Floor une rigidez e conforto acústico, amortecendo os sons do tráfego diário. De limpeza facilíssima, é a escolha inteligente para quem quer modernidade e praticidade sem abrir mão do estilo.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Hard Vigo.jpeg",
    name: "Ecomex Eco Hard Vigo",
    slug: "ecomex-eco-hard-vigo",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Inspire-se na elegância europeia com o Ecomex Eco Hard Vigo. Este piso vinílico combina o visual amadeirado quente com durabilidade excepcional e resistência total à água, ideal para cozinhas, banheiros e áreas de alto tráfego. Seu conforto acústico e térmico elevado transforma qualquer ambiente em um espaço premium e aconchegante.",
    }),
  },

  // ── ECOMEX Eco Home ──────────────────────────────────────────────────────────
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Bize.jpeg",
    name: "Ecomex Eco Home Bize",
    slug: "ecomex-eco-home-bize",
    category: "Vinílico",
    tone: "Claros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Luminosidade e leveza para o seu lar com o Ecomex Eco Home Bize. Seus tons claros ampliam visualmente os ambientes e trazem frescor ao design de interiores. Completamente resistente à água e com excelente isolamento termoacústico, este piso vinílico é a opção perfeita para quem busca modernidade, higiene e facilidade de manutenção.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Lille.jpeg",
    name: "Ecomex Eco Home Lille",
    slug: "ecomex-eco-home-lille",
    category: "Vinílico",
    tone: "Claros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O Ecomex Eco Home Lille é a escolha certa para ambientes que pedem delicadeza e modernidade. Com paleta clara inspirada na sofisticação francesa, este piso vinílico oferece conforto térmico notável, baixo ruído e superfície 100% impermeável. Limpe em segundos e desfrute de um espaço sempre impecável.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Lyon.jpeg",
    name: "Ecomex Eco Home Lyon",
    slug: "ecomex-eco-home-lyon",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Inspirado na beleza de Lyon, este piso vinílico Ecomex Eco Home entrega uma estética amadeirada calorosa e contemporânea. Sua composição oferece isolamento acústico superior e conforto térmico para todos os ambientes. Impermeável e de fácil limpeza, é perfeito para salas, quartos e corredores que precisam de durabilidade sem sacrificar o estilo.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Nantes.jpeg",
    name: "Ecomex Eco Home Nantes",
    slug: "ecomex-eco-home-nantes",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O Ecomex Eco Home Nantes une o charme das madeiras quentes com a praticidade do vinil moderno. Resistente à água, a arranhões e ao tráfego intenso, este piso garante um excelente conforto termoacústico, tornando os ambientes mais silenciosos e agradáveis. Uma solução premium que é tão fácil de instalar quanto de limpar.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Versalhes.jpeg",
    name: "Ecomex Eco Home Versalhes",
    slug: "ecomex-eco-home-versalhes",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Leve a grandiosidade de Versalhes para o seu ambiente com este piso vinílico Ecomex Eco Home. O sofisticado padrão amadeirado é combinado com tecnologia de ponta que garante resistência à água, conforto acústico e térmico e facilidade na limpeza. Um piso que transforma qualquer espaço em um ambiente nobre e acolhedor.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Home Vienne.jpeg",
    name: "Ecomex Eco Home Vienne",
    slug: "ecomex-eco-home-vienne",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Elegância e praticidade em equilíbrio perfeito: o Ecomex Eco Home Vienne apresenta veios amadeirados quentes que trazem aconchego ao seu lar. 100% impermeável e com ótimo isolamento termoacústico, este piso vinílico é ideal para todos os cômodos, mantendo o ambiente silencioso, confortável e sempre fácil de higienizar.",
    }),
  },

  // ── ECOMEX Eco Premium ───────────────────────────────────────────────────────
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium - Paris.jpeg",
    name: "Ecomex Eco Premium Paris",
    slug: "ecomex-eco-premium-paris",
    category: "Vinílico",
    tone: "Claros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O charme parisiense ao seu alcance com o Ecomex Eco Premium Paris. Seus tons claros e refinados trazem luminosidade e sofisticação a qualquer projeto. Como todo piso vinílico Premium da Ecomex, é 100% resistente à água, oferece excelente conforto termoacústico e limpeza facilitada — uma escolha de alto padrão para ambientes contemporâneos.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Cannes.jpeg",
    name: "Ecomex Eco Premium Cannes",
    slug: "ecomex-eco-premium-cannes",
    category: "Vinílico",
    tone: "Claros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Sofisticação premium com o Ecomex Eco Premium Cannes. Com padrão claro e elegante, este piso vinílico amplia visualmente os ambientes e entrega conforto acústico e térmico de alto nível. Impermeável, durável e de manutenção simplíssima — o piso ideal para projetos que exigem o melhor em qualidade e estética.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Lyon.jpeg",
    name: "Ecomex Eco Premium Lyon",
    slug: "ecomex-eco-premium-lyon",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O Ecomex Eco Premium Lyon eleva o padrão do seu espaço com veios amadeirados quentes de textura realista. Nível premium de resistência à água, isolamento termoacústico superior e facilidade de limpeza fazem deste vinílico a solução perfeita para quem exige durabilidade e beleza em qualquer ambiente.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Marselha.jpeg",
    name: "Ecomex Eco Premium Marselha",
    slug: "ecomex-eco-premium-marselha",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Com o Ecomex Eco Premium Marselha, traga a essência mediterrânea para o seu lar. O padrão amadeirado quente é executado com qualidade premium, garantindo aparência sofisticada e resistência excepcional à água e ao tráfego intenso. O isolamento termoacústico diferenciado e a limpeza fácil completam uma escolha de excelência.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Metz.jpeg",
    name: "Ecomex Eco Premium Metz",
    slug: "ecomex-eco-premium-metz",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "O Ecomex Eco Premium Metz é para quem quer o melhor. Com tonalidade amadeirada sofisticada e acabamento de nível premium, este piso vinílico oferece resistência total à água, excelente isolamento termoacústico e superfície que dispensa esforço na limpeza. Ideal para residências e projetos comerciais que primam pela qualidade.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Toulon.jpeg",
    name: "Ecomex Eco Premium Toulon",
    slug: "ecomex-eco-premium-toulon",
    category: "Vinílico",
    tone: "Amadeirados Quentes",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Qualidade premium inspirada no sul da França: o Ecomex Eco Premium Toulon combina beleza amadeirada com a mais alta tecnologia em pisos vinílicos. Resistente à umidade em 100%, com conforto acústico e térmico superiores e facilidade ímpar de limpeza, é a solução definitiva para ambientes que demandam estilo e performance.",
    }),
  },
  {
    sourceFile: "Piso Vinílico ECOMEX Eco Premium Troyes.jpeg",
    name: "Ecomex Eco Premium Troyes",
    slug: "ecomex-eco-premium-troyes",
    category: "Vinílico",
    tone: "Claros",
    techSpecsMisc: JSON.stringify({
      Descrição:
        "Retire o melhor da luz natural com o Ecomex Eco Premium Troyes. Seus tons claros e refinados criam ambientes amplos, frescos e modernos. Com a tecnologia Premium da Ecomex, você tem resistência à água, conforto termoacústico acima da média e uma superfície que se limpa em instantes — o piso premium que o seu projeto merecia.",
    }),
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname);
const SOURCE_DIR = path.join(ROOT, "Produtos_Cadastrar");
const DEST_DIR = path.join(ROOT, "public", "images", "produtos");

function ensureDestDir() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
    console.log(`📁 Created: ${DEST_DIR}`);
  }
}

function copyImage(sourceFile: string, slug: string): string {
  const ext = path.extname(sourceFile).toLowerCase();
  const src = path.join(SOURCE_DIR, sourceFile);
  const destFilename = `${slug}${ext}`;
  const dest = path.join(DEST_DIR, destFilename);

  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Source not found, skipping copy: ${src}`);
    return `/images/produtos/${destFilename}`;
  }

  fs.copyFileSync(src, dest);
  console.log(`🖼️  Copied: ${destFilename}`);
  return `/images/produtos/${destFilename}`;
}

// ─── Main import ────────────────────────────────────────────────────────────────

async function importProducts() {
  ensureDestDir();

  let inserted = 0;
  let updated = 0;

  for (const p of PRODUCTS) {
    const imageUrl = copyImage(p.sourceFile, p.slug);

    const data = {
      name: p.name,
      category: p.category,
      tone: p.tone,
      imageUrl,
      techSpecsMisc: p.techSpecsMisc,
      benefits: null,
      thickness: null,
      resistance: null,
      warranty: null,
    };

    const existing = await prisma.product.findUnique({
      where: { slug: p.slug },
    });

    await prisma.product.upsert({
      where: { slug: p.slug },
      create: { ...data, slug: p.slug },
      update: data,
    });

    if (existing) {
      console.log(`🔄 Updated : ${p.name}`);
      updated++;
    } else {
      console.log(`✅ Inserted: ${p.name}`);
      inserted++;
    }
  }

  console.log(
    `\n🎉 Done! ${inserted} inserted, ${updated} updated (${PRODUCTS.length} total).`
  );
}

// ─── Regenerate seed.ts ─────────────────────────────────────────────────────────

async function regenerateSeed() {
  console.log("\n📝 Regenerating prisma/seed.ts ...");

  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  const dataJson = JSON.stringify(
    allProducts.map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.category,
      tone: p.tone,
      imageUrl: p.imageUrl,
      benefits: p.benefits,
      thickness: p.thickness,
      resistance: p.resistance,
      warranty: p.warranty,
      techSpecsMisc: p.techSpecsMisc,
    })),
    null,
    2
  );

  const seedContent = `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const productsData = ${dataJson}

  for (const product of productsData) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: product,
    })
  }

  console.log(\`✅ Seed complete: \${productsData.length} products upserted.\`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.\$disconnect()
  })
`;

  const seedPath = path.join(ROOT, "prisma", "seed.ts");
  fs.writeFileSync(seedPath, seedContent, "utf-8");
  console.log(
    `✅ prisma/seed.ts regenerated with ${allProducts.length} products.`
  );
}

// ─── Entry ──────────────────────────────────────────────────────────────────────

async function main() {
  try {
    await importProducts();
    await regenerateSeed();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
