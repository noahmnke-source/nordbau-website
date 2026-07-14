import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Bildreferenz: Unsplash-Stand-in oder lokales Projektfoto (siehe ASSETS.md) */
const imageRef = z.object({
  src: z.string(),
  alt: z.string(),
  /** true = Stand-in, das später durch ein echtes Projektfoto ersetzt wird */
  standIn: z.boolean().default(false),
});

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const haustypen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/haustypen' }),
  schema: z.object({
    name: z.string(),
    /** Kurzer Untertitel, z. B. "Zwei Vollgeschosse. Klare Kante." */
    tagline: z.string(),
    /** Filtergruppe für den Katalog-Filter der Übersicht */
    kategorie: z.enum(['Eine Ebene', 'Mit Dach', 'Modern & Modular', 'Mehrfamilien']),
    order: z.number(),
    hero: imageRef,
    gallery: z.array(imageRef).default([]),
    facts: z.object({
      wohnflaeche: z.string(),
      geschosse: z.string(),
      dachform: z.string(),
      bauweise: z.string().default('Holztafelbau, werkseitig vorgefertigt'),
      energiestandard: z.string(),
      preisAb: z.string(),
    }),
    seoTitle: z.string(),
    seoDescription: z.string(),
    faq: z.array(faqItem).default([]),
  }),
});

const referenzen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/referenzen' }),
  schema: z.object({
    title: z.string(),
    /** Optional: laufende Projekte ohne Ortsangabe lassen das Feld weg */
    ort: z.string().optional(),
    jahr: z.number(),
    kategorie: z.enum(['Neubau', 'Stadtvilla', 'Bungalow', 'Aufstockung', 'Bauhaus', 'Doppelhaus']),
    order: z.number(),
    hero: imageRef,
    gallery: z.array(imageRef).default([]),
    facts: z
      .object({
        wohnflaeche: z.string().optional(),
        bauzeit: z.string().optional(),
        energiestandard: z.string().optional(),
      })
      .default({}),
    /** Ein Zitat der Baufamilie für die Case Study */
    zitat: z.object({ text: z.string(), von: z.string() }).optional(),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
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

export const collections = { haustypen, referenzen, ratgeber };
