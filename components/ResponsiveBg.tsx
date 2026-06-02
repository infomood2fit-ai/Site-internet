/**
 * ResponsiveBg — charge uniquement l'image adaptée à l'écran
 *
 * Remplace ce pattern dans toutes les pages :
 *   <img src="/fonds/fonds_mobil.webp"   className="block md:hidden" />
 *   <img src="/fonds/fonds_tablette.webp" className="hidden md:block lg:hidden" />
 *   <img src="/fonds/fonds.webp"          className="hidden lg:block" />
 *
 * Utilisation :
 *   <ResponsiveBg />
 *
 * Avantages :
 *   - Charge UNE SEULE image selon l'écran (pas les 3)
 *   - Lazy loading automatique sauf si priority=true
 *   - Réduit la bande passante mobile de ~60%
 */

interface ResponsiveBgProps {
  /** Charger en priorité (above the fold) — défaut: false */
  priority?: boolean;
  /** Opacité de l'overlay gradient — défaut: true */
  overlay?: boolean;
}

export default function ResponsiveBg({ priority = false, overlay = true }: ResponsiveBgProps) {
  return (
    <div className="absolute inset-0 z-0">
      {/* ── picture tag : charge UNE SEULE image selon l'écran ── */}
      <picture>
        {/* Desktop (≥ 1024px) */}
        <source
          media="(min-width: 1024px)"
          srcSet="/fonds/fonds.webp"
        />
        {/* Tablette (768px - 1023px) */}
        <source
          media="(min-width: 768px)"
          srcSet="/fonds/fonds_tablette.webp"
        />
        {/* Mobile (< 768px) — fallback img */}
        <img
          src="/fonds/fonds_mobil.webp"
          alt=""
          aria-hidden="true"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover"
          style={{ position: "absolute", inset: 0 }}
        />
      </picture>

      {/* Overlay gradient */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      )}
    </div>
  );
}