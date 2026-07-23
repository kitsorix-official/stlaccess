"""
STLACCESS Static Site Generator
Reads JSON data, renders Jinja2 templates, outputs static HTML to site/
"""
import json
import os
import shutil
from datetime import datetime
from jinja2 import Environment, FileSystemLoader

DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(DIR, "data")
TEMPLATE_DIR = os.path.join(DIR, "templates")
OUTPUT_DIR = os.path.join(DIR, "site")

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR), autoescape=True)
env.globals["current_year"] = datetime.now().year


def load_json(filename):
    with open(os.path.join(DATA_DIR, filename)) as f:
        return json.load(f)


def slugify(text):
    return text.lower().replace(" ", "-").replace("/", "-").replace("&", "and").replace("'", "")


def render_page(path, template_name, **kwargs):
    full_path = os.path.join(OUTPUT_DIR, path.strip("/"), "index.html")
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    template = env.get_template(template_name)
    html = template.render(**kwargs)
    with open(full_path, "w") as f:
        f.write(html)
    return full_path


# --- Derived data helpers ---

def get_scale_info(scale_key, scales):
    return scales.get(scale_key, {})


def get_conversion_label(scale_key, scales):
    info = scales.get(scale_key, {})
    short = info.get("shortName", scale_key)
    first_game = info.get("games", [""])[0]
    return f"{short} ({first_game})" if first_game else short


def get_related_conversions(game, conversions, scales):
    game_scale = game["scale"]
    return [
        c for c in conversions
        if c["sourceScale"] == game_scale or c["targetScale"] == game_scale
    ]


def get_same_scale_games(game, games):
    return [g for g in games if g["scale"] == game["scale"] and g["slug"] != game["slug"]]


def get_faq_for_page(faq_data, page):
    return [f for f in faq_data if page in f.get("showOn", [])]


def derive_conversion_meta(conv, scales):
    source = scales.get(conv["sourceScale"], {})
    target = scales.get(conv["targetScale"], {})
    source_short = source.get("shortName", conv["sourceScale"])
    target_short = target.get("shortName", conv["targetScale"])
    source_first = source.get("games", [conv["sourceScale"]])[0]
    target_first = target.get("games", [conv["targetScale"]])[0]

    title = conv.get("customTitle") or f'{conv["sourceScale"]} to {conv["targetScale"]} Scale Conversion — {conv["percentage"]}% STL Scale Guide'
    description = conv.get("customDescription") or f'How to convert {conv["sourceScale"]} scale miniatures to {conv["targetScale"]}. Use {conv["percentage"]}% scaling for 3D printed STLs.'
    math_str = f'{target.get("eyeLevelMm", "?")}mm / {source.get("eyeLevelMm", "?")}mm'
    source_label = f"{source_short} ({source_first})"
    target_label = f"{target_short} ({target_first})"
    source_value = f'{source.get("eyeLevelMm", "?")}mm Eye'
    target_value = f'{target.get("eyeLevelMm", "?")}mm Eye'

    return {
        "title": title,
        "description": description,
        "math": math_str,
        "h1Part1": source_short,
        "h1Part2": target_short,
        "sourceLabel": source_label,
        "targetLabel": target_label,
        "sourceValue": source_value,
        "targetValue": target_value,
    }


def get_reverse_conversion(conv, conversions):
    for c in conversions:
        if c["sourceScale"] == conv["targetScale"] and c["targetScale"] == conv["sourceScale"]:
            return c
    return None


def get_reference_previews(conversions):
    return [c for c in conversions if c.get("popular")]


def get_select_options(scales):
    ratio = []
    gaming = []
    for key, s in scales.items():
        if s["type"] == "ratio":
            ratio.append({"key": key, "label": f'{s["shortName"]} ({s["ratioEquivalent"]})'})
        else:
            gaming.append({"key": key, "label": f'{s["shortName"]} — {s["games"][0]}'})
    return {"ratio": ratio, "gaming": gaming}


def generate_sitemap():
    urls = ["  <url><loc>https://stlaccess.com</loc></url>"]
    for root, dirs, files in os.walk(OUTPUT_DIR):
        if "index.html" in files:
            path = root.replace(OUTPUT_DIR, "")
            if path and path != "/index" and path != "/404":
                urls.append(f"  <url><loc>https://stlaccess.com{path}</loc></url>")
    sitemap = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{chr(10).join(urls)}\n</urlset>'
    with open(os.path.join(OUTPUT_DIR, "sitemap.xml"), "w") as f:
        f.write(sitemap)
    return len(urls)


def generate_rss(posts, site_config):
    items = []
    for post in posts[:10]:
        items.append(f"""  <item>
    <title>{post['title']}</title>
    <link>{site_config['url']}/guides/{post['slug']}/</link>
    <description>{post['description']}</description>
    <pubDate>{post['pubDate']}</pubDate>
    <guid>{site_config['url']}/guides/{post['slug']}/</guid>
  </item>""")
    rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>{site_config['rssChannelTitle']}</title>
  <link>{site_config['url']}</link>
  <description>{site_config['rssChannelDescription']}</description>
  <atom:link href="{site_config['url']}/rss.xml" rel="self" type="application/rss+xml"/>
{chr(10).join(items)}
</channel>
</rss>"""
    with open(os.path.join(OUTPUT_DIR, "rss.xml"), "w") as f:
        f.write(rss)


def build_site():
    shutil.rmtree(OUTPUT_DIR, ignore_errors=True)
    os.makedirs(OUTPUT_DIR)

    shutil.copytree(os.path.join(DIR, "static"), OUTPUT_DIR, dirs_exist_ok=True)

    site = load_json("site.json")
    scales = load_json("scales.json")
    conversions = load_json("conversions.json")
    games = load_json("games.json")
    faq = load_json("faq.json")
    tools = load_json("tools.json")
    tool_categories = load_json("toolCategories.json")
    guides = load_json("guides.json")
    bases = load_json("bases.json")

    base_ctx = {
        "site": site,
        "scales": scales,
        "conversions": conversions,
        "games": games,
        "faq": faq,
        "tools": tools,
        "tool_categories": tool_categories,
        "guides": sorted(guides, key=lambda p: p["pubDate"], reverse=True),
        "bases": bases,
    }

    select_options = get_select_options(scales)
    reference_previews = get_reference_previews(conversions)
    homepage_faq = get_faq_for_page(faq, "homepage")
    reference_faq = get_faq_for_page(faq, "reference")
    all_faq = faq

    # Homepage
    render_page("/", "index.html",
                **base_ctx,
                select_options=select_options,
                reference_previews=reference_previews,
                homepage_faq=homepage_faq,
                current_path="/")
    print("  /")

    # Static pages
    for slug in ["about", "faq", "contact", "legal", "privacy", "terms"]:
        page_faq = all_faq if slug == "faq" else []
        render_page(f"/{slug}/", f"{slug}.html",
                    **base_ctx,
                    all_faq=page_faq,
                    current_path=f"/{slug}/")
        print(f"  /{slug}/")

    # Reference index
    render_page("/reference/", "reference/index.html",
                **base_ctx,
                reference_faq=reference_faq,
                current_path="/reference/")
    print("  /reference/")

    # Conversion detail pages
    for conv in conversions:
        meta = derive_conversion_meta(conv, scales)
        reverse = get_reverse_conversion(conv, conversions)
        render_page(f"/reference/{conv['slug']}/", "reference/conversion.html",
                    **base_ctx,
                    conversion=conv,
                    conv_meta=meta,
                    reverse_conv=reverse,
                    current_path="/reference/")
        print(f"  /reference/{conv['slug']}/")

    # Games index
    all_games = sorted(games, key=lambda g: g["name"])
    render_page("/games/", "games/index.html",
                **base_ctx,
                all_games=all_games,
                current_path="/games/")
    print("  /games/")

    # Game detail pages
    for game in games:
        related = get_related_conversions(game, conversions, scales)
        same_scale = get_same_scale_games(game, games)
        render_page(f"/games/{game['slug']}/", "games/game.html",
                    **base_ctx,
                    game=game,
                    related_conversions=related,
                    same_scale_games=same_scale,
                    current_path="/games/")
        print(f"  /games/{game['slug']}/")

    # Guides index
    render_page("/guides/", "guides/index.html",
                **base_ctx,
                current_path="/guides/")
    print("  /guides/")

    # Guide post pages
    for post in guides:
        render_page(f"/guides/{post['slug']}/", "guides/post.html",
                    **base_ctx,
                    post=post,
                    current_path="/guides/")
        print(f"  /guides/{post['slug']}/")

    # Tools index
    render_page("/tools/", "tools/index.html",
                **base_ctx,
                current_path="/tools/")
    print("  /tools/")

    # Tool detail pages
    tool_templates = {
        "stlscale-engine": "tools/stlscale-engine.html",
        "slicer-percentage-calculator": "tools/slicer-calculator.html",
        "filament-cost-calculator": "tools/filament-cost.html",
    }
    for tool in tools:
        tpl = tool_templates.get(tool["slug"], "tools/tool.html")
        extra = {}
        if tool["slug"] == "stlscale-engine":
            extra = {"select_options": select_options, "reference_previews": reference_previews}
        render_page(f"/tools/{tool['slug']}/", tpl,
                    **base_ctx,
                    tool=tool,
                    current_path="/tools/",
                    **extra)
        print(f"  /tools/{tool['slug']}/")

    # 404
    render_page("/404", "404.html", **base_ctx)
    print("  /404.html")

    # Sitemap + RSS
    url_count = generate_sitemap()
    generate_rss(base_ctx["guides"], site)
    print(f"  sitemap.xml ({url_count} URLs)")
    print(f"  rss.xml")

    # _redirects (blog → guides 301s)
    redirect_lines = []
    for post in guides:
        redirect_lines.append(f"/blog/{post['slug']}/ /guides/{post['slug']}/ 301")
        redirect_lines.append(f"/blog/{post['slug']} /guides/{post['slug']}/ 301")
    redirect_lines.append("/blog/ /guides/ 301")
    redirect_lines.append("/blog /guides/ 301")
    redirect_lines.append("/library/ /reference/ 301")
    redirect_lines.append("/library /reference/ 301")

    # Old game reference pages → game pages (from GSC data)
    old_game_refs = {
        "star-wars-legion-scale": "star-wars-legion",
        "bolt-action-scale": "bolt-action",
        "dnd-scale": "dungeons-and-dragons",
        "malifaux-scale": "malifaux",
        "warhammer-40k-scale": "warhammer-40000",
    }
    for old_slug, new_slug in old_game_refs.items():
        redirect_lines.append(f"/reference/{old_slug}/ /games/{new_slug}/ 301")
        redirect_lines.append(f"/reference/{old_slug} /games/{new_slug}/ 301")

    # Old tool URL
    redirect_lines.append("/tools/stlscaler/ /tools/stlscale-engine/ 301")
    redirect_lines.append("/tools/stlscaler /tools/stlscale-engine/ 301")

    # Cookies page → privacy
    redirect_lines.append("/cookies/ /privacy/ 301")
    redirect_lines.append("/cookies /privacy/ 301")

    # Embed page → homepage
    redirect_lines.append("/embed/ / 301")
    redirect_lines.append("/embed / 301")

    # .html extension URLs (from GSC data)
    html_ext_redirects = [
        "28mm-to-40mm",
        "1-48-to-32mm",
    ]
    for slug in html_ext_redirects:
        redirect_lines.append(f"/reference/{slug}.html /reference/{slug}/ 301")

    with open(os.path.join(OUTPUT_DIR, "_redirects"), "w") as f:
        f.write("\n".join(redirect_lines) + "\n")

    html_count = sum(
        1 for root, _, files in os.walk(OUTPUT_DIR) for f in files if f == "index.html"
    )
    print(f"\nDone. {html_count} HTML pages in {OUTPUT_DIR}/")


if __name__ == "__main__":
    build_site()
