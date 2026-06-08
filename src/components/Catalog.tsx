"use client";

import { useMemo, useState, useEffect } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

type CatKey = "todos" | "feminino" | "masculino" | "jaquetas";

const CATS: { key: CatKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "feminino", label: "Feminino" },
  { key: "jaquetas", label: "Jaquetas" },
  { key: "masculino", label: "Masculino" },
];

function parsePrice(p: string | null): number {
  if (!p) return 0;
  return parseFloat(p.replace(/\./g, "").replace(",", "."));
}

const WHATSAPP = "5511000000000"; // placeholder — trocar pelo número real da Alianza

export default function Catalog({ products }: { products: Product[] }) {
  const [cat, setCat] = useState<CatKey>("todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"relevancia" | "menor" | "maior">("relevancia");
  const [active, setActive] = useState<Product | null>(null);

  const priceRange = useMemo(() => {
    const all = products.map((p) => parsePrice(p.price)).filter(Boolean);
    return { min: Math.min(...all), max: Math.max(...all) };
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (cat !== "todos" && p.category !== cat) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.ref || "").toLowerCase().includes(q) ||
        (p.color || "").toLowerCase().includes(q)
      );
    });
    if (sort === "menor")
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === "maior")
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    return list;
  }, [products, cat, query, sort]);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden bg-ink text-sand">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,#c8643c,transparent_55%),radial-gradient(circle_at_80%_70%,#3a4a63,transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.45em] text-accent">
            Alianza · Jeans
          </p>
          <h1 className="reveal mt-3 font-display text-[2.7rem] leading-[0.95] sm:text-7xl">
            Catálogo
            <br />
            <span className="text-sand/60">Coleção Completa</span>
          </h1>
          <p className="reveal mt-5 max-w-md text-sm leading-relaxed text-sand/70">
            {products.length} peças em jeans — jaquetas, calças, shorts e saias.
            Toque em qualquer item para ver detalhes e pedir.
          </p>
          <div className="reveal mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-widest text-sand/50">
            <span>
              <strong className="text-sand">{products.filter((p) => p.category === "feminino").length}</strong>{" "}
              Feminino
            </span>
            <span>
              <strong className="text-sand">{products.filter((p) => p.category === "jaquetas").length}</strong>{" "}
              Jaquetas
            </span>
            <span>
              <strong className="text-sand">{products.filter((p) => p.category === "masculino").length}</strong>{" "}
              Masculino
            </span>
          </div>
        </div>
      </header>

      {/* ===== STICKY CONTROLS ===== */}
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-sand/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 py-3">
          {/* search */}
          <div className="relative mb-3">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputMode="search"
              placeholder="Buscar por nome, REF ou cor…"
              className="w-full rounded-full border border-ink/15 bg-white/70 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-accent focus:bg-white"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
              >
                ✕
              </button>
            )}
          </div>
          {/* category chips + sort */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  cat === c.key
                    ? "bg-ink text-sand"
                    : "bg-white/60 text-ink/60 hover:bg-white"
                }`}
              >
                {c.label}
              </button>
            ))}
            <span className="mx-1 h-5 w-px shrink-0 bg-ink/15" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="shrink-0 rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70 outline-none"
            >
              <option value="relevancia">Ordenar</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===== GRID ===== */}
      <section className="mx-auto max-w-6xl px-5 py-6 sm:py-8">
        <p className="mb-4 text-xs uppercase tracking-widest text-ink/40">
          {filtered.length} {filtered.length === 1 ? "peça" : "peças"}
          {query && ` · "${query}"`}
        </p>
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-ink/50">
            <p className="font-display text-2xl">Nada encontrado</p>
            <p className="mt-2 text-sm">Tente outra busca ou categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onOpen={setActive} />
            ))}
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-8 border-t border-ink/10 bg-ink text-sand">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="font-display text-3xl">Alianza Jeans</p>
          <p className="mt-2 max-w-sm text-sm text-sand/60">
            Catálogo de moda jeans. Preços e referências sujeitos a alteração.
            Consulte disponibilidade.
          </p>
          <p className="mt-6 text-xs uppercase tracking-widest text-sand/40">
            © Alianza Jeans · Catálogo digital
          </p>
        </div>
      </footer>

      {active && (
        <ProductModal
          product={active}
          whatsapp={WHATSAPP}
          onClose={() => setActive(null)}
        />
      )}
    </main>
  );
}
