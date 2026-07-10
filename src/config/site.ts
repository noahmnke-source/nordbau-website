/**
 * Zentrale Firmen- und Site-Konfiguration.
 *
 * ── VOR LAUNCH PRÜFEN ────────────────────────────────────────
 * Domain, Kontaktdaten, Formular-Endpoint und Social-Profile sind
 * Platzhalter. Alle Templates, Meta-Daten und JSON-LD lesen aus
 * dieser Datei; Domain zusätzlich in astro.config.mjs + robots.txt.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Markenname, erscheint in Logo, Titeln, Copy */
  name: 'Hochpuls',
  /** Juristischer Name für JSON-LD / Impressum */
  legalName: 'Hochpuls GmbH',
  /** Produktions-Domain — muss mit astro.config.mjs `site` übereinstimmen */
  url: 'https://www.hochpuls.de',
  /** Claim, erscheint u. a. im Footer und als OG-Fallback */
  claim: 'Architektur in Serie. Gebaut für Sie.',
  /** Meta-Title-Suffix */
  titleSuffix: 'Hochpuls – Fertighäuser schlüsselfertig & individuell',

  contact: {
    phone: '+49 800 0000000',
    phoneDisplay: '0800 000 00 00',
    email: 'beratung@hochpuls.de',
    street: 'Musterallee 12',
    zip: '60311',
    city: 'Frankfurt am Main',
  },

  /**
   * Formular-Endpoint (Platzhalter). Vor Launch durch echten Endpoint
   * ersetzen, z. B. Formspree, Netlify Forms oder eigene API-Route.
   */
  formEndpoint: 'https://formspree.io/f/PLATZHALTER',

  social: {
    instagram: 'https://www.instagram.com/hochpuls',
    youtube: 'https://www.youtube.com/@hochpuls',
    pinterest: 'https://www.pinterest.de/hochpuls',
  },

  /** Gründungsjahr für "seit"-Angaben und JSON-LD */
  foundingYear: 1998,
} as const;

export type Site = typeof SITE;
