/**
 * Zentrale Firmen- und Site-Konfiguration.
 *
 * ── VOR LAUNCH PRÜFEN ────────────────────────────────────────
 * Firmen-, Rechts- und Kontaktdaten sind gesetzt, Domain und E-Mail
 * stehen auf ecobau-hannover.com. Noch offen: die Social-Profile
 * (unten `social` — zeigen weiter auf die alten nordbau-Handles und
 * gehen als `sameAs` ins JSON-LD) und die Kennzahlen in
 * PRODUCT.md-nahen Seiten (Über uns / Startseite).
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Markenname, erscheint in Logo, Titeln, Copy */
  name: 'Eco Bau',
  /** Juristischer Name für JSON-LD / Impressum */
  legalName: 'Eco Bau GmbH',
  /** Produktions-Domain (Apex ist primär; www leitet per 301 hierher um). Muss mit astro.config.mjs `site` + robots.txt übereinstimmen. */
  url: 'https://ecobau-hannover.com',
  /** Claim, erscheint u. a. im Footer und als OG-Fallback */
  claim: 'Architektur in Serie. Gebaut für Sie.',
  /** Meta-Title-Suffix */
  titleSuffix: 'Eco Bau GmbH – Fertighäuser schlüsselfertig & individuell',

  contact: {
    phone: '+49 155 63046447',
    phoneDisplay: '0155 63046447',
    email: 'info@ecobau-hannover.com',
    street: 'Noldestraße 40',
    zip: '30827',
    city: 'Garbsen',
  },

  /** Rechtliche Pflichtangaben (Impressum, JSON-LD) */
  legal: {
    taxNumber: '27/200/14251',
    vatId: 'DE454914037',
    register: 'HRB 228155',
    court: 'Amtsgericht Hannover',
    /** Vertretungsberechtigte Geschäftsführung (Impressum-Pflichtangabe) */
    managingDirector: 'Armin Hot',
  },

  /**
   * Kontaktformular läuft über Netlify Forms (Formularname „beratung“, siehe
   * kontakt.astro). Anfragen werden in Netlify erfasst; die E-Mail-Weiterleitung
   * an die Adresse unten wird EINMALIG im Netlify-Dashboard eingerichtet:
   * Site → Forms → Form notifications → „Email notification“.
   */
  formRecipient: 'info@ecobau-hannover.com',

  social: {
    instagram: 'https://www.instagram.com/nordbau',
    youtube: 'https://www.youtube.com/@nordbau',
    pinterest: 'https://www.pinterest.de/nordbau',
  },

  /**
   * Gründungsjahr für "seit"-Angaben und JSON-LD.
   * Eco Bau nennt in den Unterlagen kein exaktes Jahr, sondern „über ein
   * Jahrzehnt Erfahrung“ – daher 2013 als belegbare Untergrenze gesetzt.
   * Falls das genaue Jahr bekannt ist, hier eintragen.
   */
  foundingYear: 2013,
} as const;

export type Site = typeof SITE;
