import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tldr: z.string().optional(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { guides };
