// Central internal-linking graph.
//
// Everything that links the four live tools to the archived reference content
// (and the tools to each other) reads from src/data/toolGraph.json. Keeping the
// relations in one file means a new guide only has to be added in one place and
// it automatically shows up in the contextual CTAs, the rails, and the
// discovery audit.
//
// The JSON file is also imported by src/lib/rehype-tool-cta.mjs, which injects
// the mid-article CTA while Astro renders the markdown. Do not rename it.

import graph from "../data/toolGraph.json";

export type ToolSlug = keyof typeof graph.tools;

export interface ToolMeta {
  name: string;
  url: string;
  icon: string;
  short: string;
  label: string;
}

export interface NextStep {
  tool: ToolSlug;
  line: string;
}

export interface GuideRef {
  slug: string;
  collection: "guides" | "fdm";
}

export interface CtaDefinition {
  tool: ToolSlug;
  heading: string;
  body: string;
}

export const TOOLS = graph.tools as Record<ToolSlug, ToolMeta>;

export const TOOL_SLUGS = Object.keys(TOOLS) as ToolSlug[];

export const NEXT_STEPS = graph.nextSteps as Record<ToolSlug, NextStep[]>;

export const TOOL_GUIDES = graph.toolGuides as Record<ToolSlug, GuideRef[]>;

const GUIDE_CTAS = graph.guideCtas as Record<string, CtaDefinition[]>;
const FDM_CTAS = graph.fdmCtas as Record<string, CtaDefinition[]>;
const CALC_CTAS = graph.calcCtas as Record<string, CtaDefinition[]>;

/** Contextual tool CTAs for a piece of content, keyed by its collection. */
export function ctasFor(
  collection: "guides" | "fdm" | "3d-math",
  slug: string
): CtaDefinition[] {
  if (collection === "guides") return GUIDE_CTAS[slug] ?? [];
  if (collection === "fdm") return FDM_CTAS[slug] ?? [];
  return CALC_CTAS[slug] ?? [];
}

/** Absolute path of an archived guide, honouring the /archive/ migration. */
export function guidePath(ref: GuideRef): string {
  return ref.collection === "fdm"
    ? `/archive/fdm/${ref.slug}/`
    : `/archive/guides/${ref.slug}/`;
}

/** Every tool except the current one, in curated next-step order. */
export function nextStepsFor(tool: ToolSlug): NextStep[] {
  return NEXT_STEPS[tool] ?? [];
}

/** A tool's metadata plus its path, for card rendering. */
export function toolMeta(slug: ToolSlug): ToolMeta & { slug: ToolSlug } {
  return { slug, ...TOOLS[slug] };
}
