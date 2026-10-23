// Resolves a tool's curated "related reading" list (stored as slug refs in
// toolGraph.json) into real titles and descriptions from the content
// collections. Used by the tool pages so each tool links back into the archive.
import { getCollection } from "astro:content";
import { TOOL_GUIDES, guidePath, type ToolSlug } from "./toolGraph";

export interface RelatedItem {
  title: string;
  url: string;
  description: string;
  meta: string;
}

export async function relatedGuidesFor(tool: ToolSlug): Promise<RelatedItem[]> {
  const [guides, fdm] = await Promise.all([
    getCollection("guides"),
    getCollection("fdm"),
  ]);

  return TOOL_GUIDES[tool]
    .map((ref) => {
      const entries = ref.collection === "fdm" ? fdm : guides;
      const entry = entries.find((item) => item.id === ref.slug);
      if (!entry) return null;
      return {
        title: entry.data.title,
        url: guidePath(ref),
        description: entry.data.description,
        meta: entry.data.tags.slice(0, 2).join(" · "),
      };
    })
    .filter((item): item is RelatedItem => item !== null);
}
