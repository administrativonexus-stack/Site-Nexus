/**
 * Capítulo 24: hidden until focused, jumps keyboard/screen-reader users
 * straight to `#main-content` (set on the `<main>` in every route-group
 * layout) past the Navbar/Sidebar chrome.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only z-50 rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus-visible:ring-3 focus-visible:outline-none"
    >
      Pular para o conteúdo principal
    </a>
  );
}
