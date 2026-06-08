import type { Product } from "../types";

export default function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
}) {
  return (
    <button
      onClick={() => onOpen(product)}
      className="group reveal block text-left"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`${product.name}${product.color ? " — " + product.color : ""}`}
          loading={index < 6 ? "eager" : "lazy"}
          className="card-img h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sand backdrop-blur">
          {product.categoryLabel}
        </span>
        {product.color && (
          <span className="absolute right-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-medium text-ink backdrop-blur">
            {product.color}
          </span>
        )}
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Consultar
          </span>
          {product.ref && (
            <span className="text-[10px] uppercase tracking-wider text-ink/40">
              REF {product.ref}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
