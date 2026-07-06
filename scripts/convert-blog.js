import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: true });
const blogDir = path.resolve("src/content/blog");
const outputPath = path.resolve("src/data/blogPosts.json");
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

const posts = files
  .map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!frontmatterMatch) return null;

    const rawFront = frontmatterMatch[1];
    const body = frontmatterMatch[2].trim();
    const frontmatter = {};
    for (const line of rawFront.split("\n")) {
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) continue;
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      value = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^"(.*)"$/, "$1"));
      }
      frontmatter[key] = value;
    }

    const slug = file.replace(/\.md$/, "");
    const html = md.render(body);

    return {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || "",
      pubDate: frontmatter.pubDate || "2026-01-01",
      tags: frontmatter.tags || [],
      html,
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2) + "\n");
console.log(`Converted ${posts.length} posts to ${outputPath}`);
