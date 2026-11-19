// Shared meta-copy guardrails.
//
// Search and answer engines do not require exact character limits, but very
// long titles/descriptions get clipped in SERPs and social cards. These helpers
// keep every page inside a predictable budget without losing the brand suffix.

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;

function trimAtWord(text, limit) {
  if (text.length <= limit) return text;
  let cut = limit;
  for (let index = limit; index >= 0; index -= 1) {
    if (/\s/.test(text[index])) {
      cut = index;
      break;
    }
  }
  return text.slice(0, cut).trim().replace(/[\s,;:.-]+$/, "") + "…";
}

export function metaTitle(title) {
  const match = title.match(/^(.*?)\s+(—|\|)\s+(STLACCESS)\s*$/);
  const suffix = match ? ` ${match[2]} ${match[3]}` : "";
  const core = match ? match[1].trim() : title.trim();
  const coreLimit = TITLE_LIMIT - suffix.length;
  return core.length + suffix.length <= TITLE_LIMIT
    ? core + suffix
    : trimAtWord(core, Math.max(1, coreLimit - 1)) + suffix;
}

export function metaDescription(description) {
  return trimAtWord(description.trim(), DESCRIPTION_LIMIT - 1);
}
