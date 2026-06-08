import type { Product } from "../types";

export default function ProductModal({
  product,
  whatsapp,
  onClose,
}: {
  product: Product;
  whatsapp: string;
  onClose: () => void;
}) {
  const msg = encodeURIComponent(
    `Olá! Gostaria de consultar esta peça do catálogo Alianza:\n\n` +
      `${product.name}\n` +
      (product.color ? `Cor: ${product.color}\n` : "") +
      (product.ref ? `REF: ${product.ref}\n` : "") +
      `\nPode me informar medidas, estoque e preço?`
  );
  const waLink = `https://wa.me/${whatsapp}?text=${msg}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="reveal max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-sand sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-[3/4] bg-white sm:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-sand backdrop-blur transition hover:bg-ink sm:hidden"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-sand">
                {product.categoryLabel}
              </span>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="hidden text-ink/40 transition hover:text-ink sm:block"
              >
                ✕
              </button>
            </div>

            <h2 className="mt-4 font-display text-3xl leading-tight text-ink">
              {product.name}
            </h2>

            {product.color && (
              <p className="mt-1 text-sm text-ink/60">Cor: {product.color}</p>
            )}

            <div className="mt-5">
              <span className="font-display text-3xl text-ink">
                Preço sob consulta
              </span>
              <p className="mt-1 text-sm text-ink/60">
                Consulte medidas, estoque e preço pelo WhatsApp.
              </p>
            </div>

            {product.ref && (
              <p className="mt-2 text-xs uppercase tracking-widest text-ink/40">
                Referência {product.ref}
              </p>
            )}

            <div className="mt-auto pt-8">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:brightness-110"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.8 14.08c-.24.68-1.42 1.3-1.95 1.34-.5.05-1.13.27-3.8-.8-3.2-1.29-5.24-4.56-5.4-4.77-.16-.21-1.3-1.73-1.3-3.3s.82-2.34 1.11-2.66c.29-.32.63-.4.84-.4.21 0 .42 0 .6.01.2.01.46-.07.72.55.27.64.91 2.2.99 2.36.08.16.13.34.03.55-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.16-.32.33-.14.64.18.31.81 1.34 1.74 2.17 1.19 1.06 2.2 1.39 2.51 1.55.31.16.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.42-.26.71-.16.29.11 1.84.87 2.16 1.03.31.16.52.24.6.37.08.13.08.76-.16 1.44Z" />
                </svg>
                Consultar disponibilidade
              </a>
              <p className="mt-3 text-center text-[11px] text-ink/40">
                Medidas, estoque e preço sob consulta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
