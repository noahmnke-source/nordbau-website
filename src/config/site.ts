/**
 * Zentrale Firmen- und Site-Konfiguration.
 *
 * ── VOR LAUNCH PRÜFEN ────────────────────────────────────────
 * Firmen-, Rechts- und Kontaktdaten sind gesetzt, Domain und E-Mail
 * stehen auf ecobau-hannover.com. Noch offen: die Kennzahlen in
 * PRODUCT.md-nahen Seiten (Über uns / Startseite).
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  /** Markenname, erscheint in Logo, Titeln, Copy */
  name: 'EcoBau',
  /** Juristischer Name für JSON-LD / Impressum */
  legalName: 'EcoBau GmbH',
  /** Produktions-Domain (Apex ist primär; www leitet per 301 hierher um). Muss mit astro.config.mjs `site` + robots.txt übereinstimmen. */
  url: 'https://ecobau-hannover.com',
  /** Slogan fuer das Schema im Seitenkopf. Im Fussbereich steht der
   *  uebersetzbare Text aus der i18n-Schicht, damit er auch auf den
   *  englischen Seiten in der richtigen Sprache erscheint. */
  claim: 'Individuell geplant. Im eigenen Werk gebaut.',
  /** Meta-Title-Suffix */
  titleSuffix: 'EcoBau GmbH – Fertighäuser schlüsselfertig & individuell',

  contact: {
    /** Waehlbare Form fuer tel:-Verweise und das Schema im Seitenkopf */
    phone: '+4951159293900',
    /** Schreibweise fuer die Anzeige */
    phoneDisplay: '0511 59293900',
    email: 'info@ecobau-hannover.com',
    street: 'An der Kirche 6',
    zip: '30457',
    city: 'Hannover',
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

  /** Gründungsjahr für "seit"-Angaben und JSON-LD. */
  foundingYear: 1994,
} as const;

/**
 * Jahre Erfahrung, zur Build-Zeit aus `foundingYear` berechnet. Bewusst nicht
 * fest verdrahtet: So stimmt die Zahl nach jedem Deploy weiter, statt zum
 * Jahreswechsel still zu veralten.
 */
export const YEARS_EXPERIENCE = new Date().getFullYear() - SITE.foundingYear;

export type Site = typeof SITE;
