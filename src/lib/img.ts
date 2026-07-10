/**
 * Helfer für responsive Unsplash-Stand-ins.
 * Echte Projektfotos laufen später über astro:assets (siehe ASSETS.md);
 * bis dahin liefern diese Helfer saubere srcsets für die Remote-Bilder.
 */

const DEFAULT_WIDTHS = [480, 768, 1080, 1600, 2000];

/** Setzt den `w`-Parameter einer Unsplash-URL neu */
export function unsplashWidth(url: string, width: number): string {
  const u = new URL(url);
  u.searchParams.set('w', String(width));
  u.searchParams.set('auto', 'format');
  u.searchParams.set('fit', 'crop');
  u.searchParams.set('q', '78');
  return u.toString();
}

export function unsplashSrcset(url: string, widths: number[] = DEFAULT_WIDTHS): string {
  return widths.map((w) => `${unsplashWidth(url, w)} ${w}w`).join(', ');
}
