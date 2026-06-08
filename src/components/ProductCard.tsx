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
      <div className="relative aspect-[3/4] overflow-hidden bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`${product.name}${product.color ? " — " + product.color : ""}`}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          width={800}
          height={1067}
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          className="card-img h-full w-full object-cover opacity-0 transition-opacity duration-500"
        />
        <span className="absolute left-0 top-0 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sand">
          {product.categoryLabel}
        </span>
        {product.color && (
          <span className="absolute right-2 top-2 bg-white/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink backdrop-blur">
            {product.color}
          </span>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">
            Consultar
          </span>
          {product.ref && (
            <span className="text-[10px] uppercase tracking-wider text-muted">
              REF {product.ref}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
