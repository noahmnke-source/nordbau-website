/**
 * Zentrale Firmen- und Site-Konfiguration.
 *
 * ── PLATZHALTER ──────────────────────────────────────────────
 * "AEDIS Haus" ist ein Platzhalter-Markenname. Vor Launch hier
 * (und in astro.config.mjs → `site`) durch die echte Firma ersetzen.
 * Alle Templates, Meta-Daten und JSON-LD lesen aus dieser Datei.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Markenname, erscheint in Logo, Titeln, Copy */
  name: 'AEDIS Haus',
  /** Juristischer Name für JSON-LD / Impressum */
  legalName: 'AEDIS Haus GmbH',
  /** Produktions-Domain — muss mit astro.config.mjs `site` übereinstimmen */
  url: 'https://www.aedis-haus.de',
  /** Claim, erscheint u. a. im Footer und als OG-Fallback */
  claim: 'Architektur in Serie. Gebaut für Sie.',
  /** Meta-Title-Suffix */
  titleSuffix: 'AEDIS Haus – Fertighäuser schlüsselfertig & individuell',

  contact: {
    phone: '+49 800 0000000',
    phoneDisplay: '0800 000 00 00',
    email: 'beratung@aedis-haus.de',
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
    instagram: 'https://www.instagram.com/aedishaus',
    youtube: 'https://www.youtube.com/@aedishaus',
    pinterest: 'https://www.pinterest.de/aedishaus',
  },

  /** Gründungsjahr für "seit"-Angaben und JSON-LD */
  foundingYear: 1998,
} as const;

export type Site = typeof SITE;
