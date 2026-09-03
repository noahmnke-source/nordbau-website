/**
 * Leichtgewichtige i18n-Schicht (DE = Standard auf der Wurzel, EN unter /en/).
 * Sprache wird aus dem Pfad abgeleitet – kein Prop-Durchreichen nötig.
 *
 * Übersetzt sind nur die Hauptseiten. Rechtliches (Impressum, Datenschutz) und
 * die Ratgeber-Artikel bleiben bewusst deutsch.
 */
export const DEFAULT_LANG = 'de';
export const LANGS = ['de', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** Sprache aus dem Pfad: /en oder /en/... => 'en', sonst 'de'. */
export function getLang(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

/** Den zugrunde liegenden DE-Pfad (ohne /en-Präfix) ermitteln. */
export function toDePath(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

/** Einen DE-Pfad in die Zielsprache umschreiben (für interne Links). */
export function localize(path: string, lang: Lang): string {
  if (lang === 'de') return path;
  if (path === '/') return '/en/';
  return '/en' + path;
}

/** Gegenstück-Pfad in der jeweils anderen Sprache (Sprachumschalter, hreflang). */
export function altPath(pathname: string, target: Lang): string {
  return localize(toDePath(pathname), target);
}

/**
 * Seiten, die zweisprachig existieren (als DE-Pfad geprüft). Nur diese bekommen
 * hreflang-Alternates und den Sprachumschalter; alles andere bleibt einsprachig.
 */
export function isBilingual(pathname: string): boolean {
  const de = toDePath(pathname);
  if (de === '/' || de === '/404/') return true;
  return ['/haustypen/', '/ablauf/', '/ueber-uns/', '/referenzen/', '/kontakt/'].some((p) =>
    de.startsWith(p)
  );
}

/** UI-Strings für die gemeinsam genutzten Bausteine (Header, Footer, Layout). */
export const ui = {
  de: {
    'nav.home': 'Startseite',
    'nav.haustypen': 'Haustypen',
    'nav.bauleistungen': 'Bauleistungen',
    'nav.referenzen': 'Referenzen',
    'nav.ablauf': 'Ablauf',
    'nav.ueberuns': 'Über uns',
    'nav.ratgeber': 'Ratgeber',
    'nav.kontakt': 'Kontakt',
    'nav.main': 'Hauptnavigation',
    'nav.mobile': 'Mobile Navigation',
    'nav.footer': 'Footer Navigation',
    cta: 'Beratung vereinbaren',
    'menu.open': 'Menü öffnen',
    'menu.close': 'Menü schließen',
    'logo.aria': 'Startseite',
    'lang.switch': 'English',
    'lang.switchAria': 'Switch to English',
    skip: 'Zum Inhalt springen',
    'footer.claim':
      'Schlüsselfertige und individuell geplante Fertighäuser – werkseitig präzise vorgefertigt, bundesweit gebaut.',
    'footer.nav': 'Navigation',
    'footer.contact': 'Kontakt',
    'footer.callDirect': 'oder direkt anrufen:',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.cookies': 'Cookie-Einstellungen',
    'footer.ctaHeadline':
      'Sprechen wir über Ihr Grundstück, Ihr Budget und den Weg zu Ihrem Haus.',
  },
  en: {
    'nav.home': 'Home',
    'nav.haustypen': 'House types',
    'nav.bauleistungen': 'Construction services',
    'nav.referenzen': 'Projects',
    'nav.ablauf': 'Process',
    'nav.ueberuns': 'About us',
    'nav.ratgeber': 'Guide',
    'nav.kontakt': 'Contact',
    'nav.main': 'Main navigation',
    'nav.mobile': 'Mobile navigation',
    'nav.footer': 'Footer navigation',
    cta: 'Book a consultation',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'logo.aria': 'Home',
    'lang.switch': 'Deutsch',
    'lang.switchAria': 'Zu Deutsch wechseln',
    skip: 'Skip to content',
    'footer.claim':
      'Turnkey, individually planned prefab homes – precision-built in the factory, assembled nationwide.',
    'footer.nav': 'Navigation',
    'footer.contact': 'Contact',
    'footer.callDirect': 'or call us directly:',
    'footer.rights': 'All rights reserved.',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookie settings',
    'footer.ctaHeadline': "Let's talk about your plot, your budget and the path to your home.",
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];

/** Übersetzer-Helfer für eine Sprache. */
export function useT(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[DEFAULT_LANG][key];
}
