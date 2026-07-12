import * as React from "react";

/** True once the page has scrolled past `threshold` px (Navbar state change, Capítulo 19: ~80px). */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = React.useState(() =>
    typeof window !== "undefined" ? window.scrollY > threshold : false,
  );

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
