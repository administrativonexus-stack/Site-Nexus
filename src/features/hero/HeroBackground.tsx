import DotGrid from "@/components/backgrounds/DotGrid";

const NOISE_DATA_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

/**
 * Hero background stack (Capítulo 11): Dot Field (React Bits, reacts to
 * cursor, low opacity) → Radial Gradient (center lighter) → Noise (avoids
 * flat surfaces). Layered behind Hero content, never intercepts clicks.
 */
export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-25">
        <DotGrid
          dotSize={3}
          gap={28}
          baseColor="#27272a"
          activeColor="#e6f101"
          proximity={120}
          shockRadius={200}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(230,241,1,0.10), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_DATA_URI}")` }}
      />
    </div>
  );
}
