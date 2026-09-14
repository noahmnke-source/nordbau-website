import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Bildreferenz. Alle Fotos und Visualisierungen stammen aus dem eigenen Werk. */
const imageRef = z.object({
  src: z.string(),
  alt: z.string(),
  /** Bildunterschrift im Katalograster – beschreibt, was zu sehen ist. */
  caption: z.string().optional(),
  /** Filtergruppe im Katalog, z. B. "Satteldach". Erst ab zwei verschiedenen
   *  Gruppen erscheint die Filterleiste. */
  gruppe: z.string().optional(),
  /** Leistungstiefe des Projekts, z. B. "Rohbau" oder "Schlüsselfertig".
   *  Erscheint als Marke über der Bildunterschrift. */
  stufe: z.string().optional(),
});

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

/**
 * Gemeinsames Schema für Häuser (privat) und Wohn-/Gewerbebau. Beide Gruppen
 * unterscheiden sich nur in den Kennwerten, deshalb ist `daten` eine freie
 * Liste aus Bezeichnung und Wert statt eines festen Objekts.
 */
const objektSchema = z.object({
  name: z.string(),
  /** Kurzer Untertitel unter der Überschrift */
  tagline: z.string(),
  /** Reihenfolge im Menü und in den Querverweisen */
  order: z.number(),
  hero: imageRef,
  /** Katalograster: eine Karte je Entwurf */
  katalog: z.array(imageRef).default([]),
  /** Optionale Innenaufnahmen als eigener Abschnitt */
  innen: z.array(imageRef).default([]),
  daten: z.array(z.object({ label: z.string(), wert: z.string() })).default([]),
  /** Drei bis vier Merkmale, die den Typ ausmachen */
  merkmale: z
    .array(z.object({ titel: z.string(), text: z.string() }))
    .default([]),
  /** Ausgefuehrte Projekte als Tabelle – fuer Referenzen ohne eigenes Foto. */
  projekte: z
    .array(
      z.object({
        name: z.string(),
        ort: z.string(),
        zeitraum: z.string(),
        leistung: z.string(),
        kennzahl: z.string(),
      })
    )
    .default([]),
  seoTitle: z.string(),
  seoDescription: z.string(),
  faq: z.array(faqItem).default([]),
});

const haeuser = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/haeuser' }),
  schema: objektSchema,
});

const haeuserEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/haeuser-en' }),
  schema: objektSchema,
});

const bauten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bauten' }),
  schema: objektSchema,
});

const bautenEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bauten-en' }),
  schema: objektSchema,
});

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    hero: imageRef,
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

export const collections = { haeuser, haeuserEn, bauten, bautenEn, ratgeber };
