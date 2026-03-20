# 📦 MANUAL DE CADASTRO DE NOVOS PRODUTOS (E INSERÇÃO VIA IA)

Este manual estabelece o **Processo Operacional Padrão (POP)** para solicitar à Inteligência Artificial (IA) a inserção de novos produtos em lote no site da MCL Soluções. Nosso objetivo com este processo é automatizar o trabalho braçal, garantindo agilidade, 100% de precisão no banco de dados (Prisma) e zero retrabalho.

---

## Passo 1. Padronização Mestra dos Arquivos (Pré-requisito)

Para minimizar margens de erro e evitar que a inteligência artificial faça deduções incorretas sobre os produtos (como colocar um piso escuro na categoria de pisos claros), **renomeie os arquivos de imagem** usando a estrutura semântica abaixo antes de acionar a IA:

**A Estrutura de Nomes (Obrigatória):**
`[Categoria] - [Tonalidade] - [Nome Comercial Completo].[extensão]`

*   **Categorias Aceitas:** `Laminado` ou `Vinilico`
*   **Tonalidades Aceitas:** `Claros`, `Escuros` ou `Amadeirados Quentes`
*   **Extensões Recomendadas:** `.jpeg`, `.jpg`, `.png`, `.webp`

**✅ Exemplos Corretos:**
1. `Laminado - Claros - Durafloor New Way Nórdica.jpeg`
2. `Vinilico - Amadeirados Quentes - Finottato Personalitte Lorena.jpg`
3. `Laminado - Escuros - Eucafloor New Evidence Moka.png`

*(Nota: Evite usar traços `-` dentro do "Nome Comercial Completo" para evitar erros na separação. Se o fornecedor enviar tudo confuso, vale a pena tirar 2 minutos para renomear os arquivos dessa forma).*

**Onde salvar os arquivos:**
Você deve criar uma pasta temporária na raiz do seu projeto (ex: uma pasta chamada `novos_produtos`) e colocar todas essas fotos lá dentro.

---

## Passo 2. O "Prompt Imbatível" (Comando para a IA)

Quando os arquivos estiverem todos na pasta devidamente nomeados, copie o prompt abaixo e cole no chat para o Antigravity. Substitua `[NOME_DA_PASTA]` pelo nome real do diretório (Ex: `novos_produtos`).

---
### 📋 COPIE E COLE ESTA MENSAGEM:

> **Início do Prompt**
> 
> "Olá! Temos uma nova remessa de produtos para cadastrar no site.
> Todas as imagens já estão organizadas e padronizadas dentro da pasta `[NOME_DA_PASTA]`.
> 
> Quero que você aja como um Desenvolvedor Fullstack e Especialista em Dados do nosso projeto (Next.js + Prisma) e implemente o processo em lote de maneira rigorosa a seguir:
> 
> **1. Parseamento Semântico:** Leia a pasta especificada. Você vai perceber que os nomes dos arquivos estão divididos por traço: `Categoria - Tonalidade - NomeDoProduto.extensão`. Separe essas 3 informações com precisão.
> **2. Sanitização de Nomes:** Remova os hifens de separação do Título do Produto, coloque a primeira letra de cada palavra em maiúsculo (Capitalize) e gere o `slug` no formato URL-friendly para o banco.
> **3. Gestão de Assets:** Copie os arquivos de imagem desta pasta raiz e jogue-os dentro de `public/images/produtos/`, salvando os arquivos destino unicamente usando o `slug` gerado e a extensão.
> **4. Geração Dinâmica de Descrição:** O nosso schema.prisma permite um campo JSON `techSpecsMisc`. Gere um JSON no formato `{"Descrição": "..."}`. A descrição deve ser um copy de vendas convidativo focado no conforto termoacústico, modernidade e facilidade de limpeza adequados para pisos da categoria extraída.
> **5. Execução Escalável:** Crie (ou sobrescreva se já existir) o arquivo script robusto `import_products.ts` manipulando o Prisma via `upsert` (baseado no slug) para garantir que possamos re-rodar sem duplicações.
> **6. Atualização de Semente (Sync Produção):** Após a importação, gere automaticamente (ou atualize) o arquivo `prisma/seed.ts` de forma **auto-contida** (com os dados hardcoded no arquivo) para que possamos sincronizar com o Coolify.
> **7. Roteiro Fim a Fim:** Rode o script utilizando `npx tsx import_products.ts` de forma autônoma (via ferramenta de shell).
> 
> Assim que a inclusão for finalizada e o banco de dados populado, por favor me avise para que eu faça a validação final."
> 
> **Fim do Prompt**
---

## Passo 3. Revisão e Validação Local

Uma vez que a IA responda *"Os produtos foram inseridos..."*, faça o checklist:

1. **Abra o localhost:3000**
2. Acesse as páginas de `/laminados` e `/vinilicos`.
3. Verifique se os produtos estão aparecendo.
4. **Acione o Filtro de Tonalidade** para garantir que os que você escreveu `Claros` caíram no filtro correto.
5. Clique em **"Ver Padrão"** (Modal) e avalie se a descrição automática de vendas que a IA gerou faz sentido para a qualidade requerida.
6. A pasta temporária (ex: `novos_produtos`) já pode ser deletada do seu computador logo em seguida para organizar o ambiente.

---

## Passo 4. Sincronização com Produção (Coolify)

Como o banco de dados do seu computador é separado do banco de dados da internet (Produção), você precisa "avisar" ao servidor que novos produtos chegaram.

**1. Envie as alterações para o GitHub:**
Após a IA terminar o Passo 2, ela terá gerado/atualizado o arquivo `prisma/seed.ts`. Você deve fazer o commit e push dessa alteração para o seu repositório.

**2. No Painel do Coolify:**
Aguarde o deploy automático terminar. Depois, você deve rodar o comando de "semeadura" no terminal do container ou garantir que sua Build inclua este comando:

**Comando manual via Terminal (Console do Container no Coolify):**
```bash
npx prisma db seed
```

Este comando vai ler os dados que a IA deixou prontos no arquivo `prisma/seed.ts` e inseri-los no banco de dados da MCL Soluções na nuvem.

