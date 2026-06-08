/**
 * Logo Alianza Jeans — recriação fiel em SVG + tipografia serifada.
 * Símbolo: infinito (∞) de traço uniforme. Texto: ALIANZA / JEANS.
 * `className` controla a cor (currentColor). Padrão herda do contexto.
 */
export default function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 100 56"
        className="h-auto w-[52px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* infinito: dois loops que se cruzam no centro */}
        <path d="M50 28 C50 14, 30 10, 22 18 C12 27, 18 42, 32 40 C44 38, 48 30, 50 28 C52 26, 56 18, 68 16 C82 14, 88 29, 78 38 C70 46, 50 42, 50 28 Z" />
      </svg>
      {showText && (
        <div className="mt-1.5 flex flex-col items-center leading-none">
          <span className="font-brand text-[1.6rem] font-medium tracking-[0.22em] [text-indent:0.22em]">
            ALIANZA
          </span>
          <span className="mt-0.5 font-brand text-[0.72rem] font-medium tracking-[0.55em] [text-indent:0.55em] opacity-90">
            JEANS
          </span>
        </div>
      )}
    </div>
  );
}
