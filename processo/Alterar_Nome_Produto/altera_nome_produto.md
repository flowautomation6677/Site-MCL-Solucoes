# 🖋️ MANUAL DE ALTERAÇÃO DE NOME DE PRODUTO (POP)

Este manual estabelece o **Procedimento Operacional Padrão (POP)** para localizar e alterar nomes de produtos no banco de dados de forma rápida, segura e com baixo consumo de tokens/créditos.

---

## 🛠️ Ferramentas Disponíveis

Dentro da pasta `/processo`, você tem dois scripts automatizados:

1.  `buscar_produto.ts`: Localiza produtos pelo nome ou parte dele.
2.  `atualizar_nome.ts`: Renomeia o produto selecionado.

---

## 📋 Passo a Passo para Alteração

### 1. Localizar o Produto
Antes de alterar, você precisa ter certeza de que encontrou o item correto.
Diga ao Antigravity:
> "Antigravity, use o script de busca para encontrar o produto que tenha `[NOME_ATUAL]` no nome."

**Comando Técnico (IA):**
```bash
npx tsx processo/buscar_produto.ts "TermoDeBusca"
```

---

### 2. Alterar o Nome no Banco Local
Com o produto identificado, peça a alteração definitiva.
Diga ao Antigravity:
> "Altere o nome do produto que contém `[NOME_ANTIGO]` para o novo nome: `[NOVO_NOME_COMPLETO]`."

**Comando Técnico (IA):**
```bash
npx tsx processo/atualizar_nome.ts "NomeAntigo" "Novo Nome Completo"
```

---

### 3. Sincronizar Tudo (Local + Seed)
Sempre que o nome mudar no banco de dados, precisamos atualizar os arquivos de semente para que o Coolify também receba a mudança. Peça:
> "Sincronize as mudanças gerando o dump e a nova semente."

**Comando Técnico (IA):**
```bash
npx tsx dump_products.ts; npx tsx generate_final_seed.ts
```

---

### 4. Sincronizar com Produção (Coolify)
1. Faça o **Push** das alterações para o GitHub (`prisma/seed.ts` terá o nome novo).
2. No terminal do Coolify, rode:
```bash
npx prisma db seed
```

---

## ✅ Por que usar este processo?
*   **Economia:** A IA não precisa reescrever scripts toda vez, apenas rodar os comandos prontos.
*   **Velocidade:** A execução é instantânea via terminal.
*   **Segurança:** Usamos `contains` e `insensitive` para evitar erros de digitação.
