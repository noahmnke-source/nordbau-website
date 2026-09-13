/**
 * Responsive Bildquellen fuer die eigenen Aufnahmen.
 *
 * Alle Bilder liegen lokal unter /projekte/, /haeuser/, /bau/ und /werk/ in den
 * Breiten 640, 1024 und 1600; referenziert wird immer die 1600er-Datei.
 */

/**
 * Eigene Fotos liegen in mehreren Breiten vor. Konvention:
 * `<name>-640.webp`, `-1024.webp`, `-1600.webp`; referenziert wird immer
 * die 1600er-Datei (siehe ASSETS.md).
 */
export const PROJEKT_WIDTHS = [640, 1024, 1600];

/** Ordner, deren Bilder in den drei Breiten vorliegen. */
const BREITEN_ORDNER = ['/projekte/', '/haeuser/', '/bau/', '/werk/'];

export function isProjektBild(src: string): boolean {
  return BREITEN_ORDNER.some((p) => src.startsWith(p)) && /-1600\.webp$/.test(src);
}

export function projektSrcset(src: string): string {
  return PROJEKT_WIDTHS.map((w) => `${src.replace(/-1600\.webp$/, `-${w}.webp`)} ${w}w`).join(', ');
}
