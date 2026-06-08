# Catálogo Alianza Jeans

Catálogo digital mobile-first da Alianza Jeans — 52 peças (feminino, jaquetas femininas e masculino) extraídas dos catálogos oficiais em PDF.

## Stack
- **Next.js 14** (App Router, static export)
- **Tailwind CSS**
- Dados estruturados em `src/products.json`
- Fotos reais dos produtos em `public/products/`

## Recursos
- Grid responsivo (2 col mobile → 4 col desktop)
- Busca por nome, REF ou cor
- Filtro por categoria + ordenação por preço
- Modal de detalhe com CTA "Pedir no WhatsApp"

## Desenvolvimento
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera /out (static export)
```

## Dados
Extraídos via `extract.py` (PyMuPDF) dos 3 catálogos oficiais.
Para atualizar: rodar `python extract.py` e copiar `data/products.json` → `src/products.json`.

## Configuração do WhatsApp
O número fica em `src/components/Catalog.tsx` (const `WHATSAPP`). Formato: `55` + DDD + número.
