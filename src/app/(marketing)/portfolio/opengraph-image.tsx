import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderOgImage } from "@/lib/og-image";
import { PORTFOLIO_PAGE_CONTENT } from "@/features/portfolio";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderOgImage({
    title: PORTFOLIO_PAGE_CONTENT.headline,
    description: PORTFOLIO_PAGE_CONTENT.subheadline,
  });
}
