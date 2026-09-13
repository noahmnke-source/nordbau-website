/**
 * Responsive Bildquellen fuer die eigenen Aufnahmen.
 *
 * Alle Bilder liegen lokal unter /projekte/, /haeuser/, /bau/ und /werk/.
 * Konvention: `<name>-<breite>.webp`, referenziert wird immer die 1600er-Datei.
 *
 * Welche Breiten es tatsaechlich gibt, haengt an der Quelle: Ein Rendering mit
 * 1920 Pixeln bekommt keine 2560er-Variante, weil Hochrechnen keine Schaerfe
 * erzeugt. Deshalb wird das srcset zur Bauzeit aus dem Dateibestand gelesen
 * statt aus einer festen Liste – sonst verspricht die Seite Aufloesungen, die
 * es nicht gibt, oder verschweigt vorhandene.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Ordner, deren Bilder in mehreren Breiten vorliegen. */
const BREITEN_ORDNER = ['/projekte/', '/haeuser/', '/bau/', '/werk/'];

const PUBLIC_DIR = fileURLToPath(new URL('../../public/', import.meta.url));

/** Verzeichnisinhalte einmal je Ordner lesen – Figure wird oft aufgerufen. */
const ordnerCache = new Map<string, string[]>();

function dateienIn(ordner: string): string[] {
  let eintraege = ordnerCache.get(ordner);
  if (!eintraege) {
    try {
      eintraege = fs.readdirSync(path.join(PUBLIC_DIR, ordner));
    } catch {
      eintraege = [];
    }
    ordnerCache.set(ordner, eintraege);
  }
  return eintraege;
}

export function isProjektBild(src: string): boolean {
  return BREITEN_ORDNER.some((p) => src.startsWith(p)) && /-\d+\.webp$/.test(src);
}

/**
 * Liefert das srcset zu einer Bildreferenz oder undefined, wenn es nur eine
 * einzige Breite gibt (dann genuegt der nackte src).
 */
export function projektSrcset(src: string): string | undefined {
  const treffer = src.match(/^(.*)\/([^/]+)-(\d+)\.webp$/);
  if (!treffer) return undefined;
  const [, ordner, basis] = treffer;
  if (!ordner || !basis) return undefined;

  const muster = new RegExp(`^${basis.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)\\.webp$`);
  const breiten = dateienIn(ordner)
    .map((f) => muster.exec(f)?.[1])
    .filter((b): b is string => Boolean(b))
    .map(Number)
    .sort((a, b) => a - b);

  if (breiten.length < 2) return undefined;
  return breiten.map((w) => `${ordner}/${basis}-${w}.webp ${w}w`).join(', ');
}
