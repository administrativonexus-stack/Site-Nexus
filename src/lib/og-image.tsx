import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

/**
 * Shared 1200x630 Open Graph image renderer (Capítulo 22). Each route that
 * needs its own image (Home, /portfolio, /portfolio/[slug]) has a thin
 * opengraph-image.tsx that just calls this with different copy — the
 * convention doesn't cascade like a layout, so each segment needs its own file.
 */
export function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0e0e10",
        backgroundImage: "radial-gradient(circle at 30% 30%, #2c2c2e, #0e0e10)",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 500, color: "#a1a1aa" }}>
        {eyebrow ? `${siteConfig.name} · ${eyebrow}` : siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          fontSize: 60,
          fontWeight: 600,
          color: "#ffffff",
          maxWidth: 950,
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 850,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      )}
    </div>,
    { ...OG_IMAGE_SIZE },
  );
}
