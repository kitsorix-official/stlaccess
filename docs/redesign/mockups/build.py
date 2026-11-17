#!/usr/bin/env python3
"""Generate the Phase 2 comparison mockup.

One self-contained HTML file:
  - three directions (A brand / B calm minimal / C bold product)
  - six screens (home, inspector, viewer, converter, checker, guide)
  - desktop and phone
  - the same real data in every panel

Run:  python3 docs/redesign/mockups/build.py
Out:  docs/redesign/mockups/index.html
"""

from pathlib import Path

OUT = Path(__file__).with_name("index.html")

D = {
    "pair": "28mm → 32mm",
    "pct": "114.3%",
    "formula": "32.0 ÷ 28.0 × 100",
    "rev_pair": "32mm → 28mm",
    "rev_pct": "87.5%",
    "file": "knight_28mm.stl",
    "fmt": "Binary STL",
    "tris": "1,842",
    "size": "90 KB",
    "dims": "41.2 × 28.6 × 28.0 mm",
    "inches": "1.62 × 1.13 × 1.10 in",
    "target": "32.0 mm",
    "scaled": "47.1 × 32.7 × 32.0 mm",
    "volume": "8.4 cm³",
    "area": "62.1 cm²",
    "shells": "1",
    "open": "0",
    "nonmanifold": "0",
    "degenerate": "0",
    "winding": "Consistent",
    "obj": "312 KB",
    "tol": "0.001 mm",
    "url": "stlaccess.com/stl-scale-inspector/?source=28mm&target=32mm&logic=eye",
    "table": [
        ("28mm → 32mm", "114.3%"),
        ("32mm → 28mm", "87.5%"),
        ("1:35 → 32mm", "64.0%"),
        ("1:48 → 28mm", "76.8%"),
        ("1:56 → 28mm", "89.6%"),
        ("32mm → 75mm", "234.4%"),
    ],
}

DIRS = [
    {
        "id": "a",
        "name": "A — Brand, lightly trimmed",
        "tag": "The STLACCESS you already have, with the noise removed.",
        "best": "Continuity, recognition, lowest risk.",
        "note": "Keeps the orange/black palette, mono labels, glass cards and the A1 Mini trust line. Cuts duplicate sections and gives every screen one primary action.",
    },
    {
        "id": "b",
        "name": "B — Calm minimal",
        "tag": "Warm paper, serif headings, hairline rules, one accent.",
        "best": "Calm reading, trust, one-handed phone use.",
        "note": "No glows, no gradients, no card-in-card. The answer becomes a summary strip; the detail is on demand.",
    },
    {
        "id": "c",
        "name": "C — Bold product",
        "tag": "Oversized numbers, solid orange slabs, chunky controls.",
        "best": "Speed, confidence, a tool that feels like an instrument.",
        "note": "The result is the hero. Controls are secondary. The phone gets a sticky action bar.",
    },
]

ICONS = {
    "cube": '<path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>',
    "ruler": '<path d="M3 17 17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    "swap": '<path d="M7 7h11l-3-3M17 17H6l3 3"/>',
    "check": '<path d="M4 12l5 5L20 6"/>',
    "download": '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    "copy": '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    "folder": '<path d="M3 7h7l2 2h9v10H3z"/>',
    "play": '<path d="M8 5l11 7-11 7z"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "home": '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    "shield": '<path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z"/><path d="M8 12l3 3 5-6"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "spark": '<path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>',
    "warning": '<path d="M12 3l10 18H2z"/><path d="M12 9v5M12 17h.01"/>',
    "info": '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    "link": '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    "close": '<path d="M6 6l12 12M18 6 6 18"/>',
    "chevron": '<path d="M6 9l6 6 6-6"/>',
    "file": '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/>',
    "layers": '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
}


def ico(name, cls=""):
    return (
        f'<svg class="ico {cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        f'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        f'{ICONS[name]}</svg>'
    )


def verb(name):
    return {
        "Viewer": "VIEW",
        "Scale Inspector": "SCALE",
        "Converter": "CONVERT",
        "Printability Checker": "CHECK",
    }[name]


def topbar(active, phone_title=""):
    links = [
        ("Viewer", "viewer"),
        ("Scale", "inspector"),
        ("Converter", "converter"),
        ("Printability", "checker"),
    ]
    nav = "".join(
        f'<a class="{"on" if key == active else ""}" href="#">{label}</a>'
        for label, key in links
    )
    return f"""
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="logo" href="#">STL<span>ACCESS</span></a>
    <nav class="nav">{nav}</nav>
    <div class="top-actions">
      <a class="support-link" href="#">Support</a>
      <button class="menu-btn" aria-label="Menu">{ico("menu")}</button>
    </div>
  </div>
</header>"""


def bottomnav(active):
    items = [
        ("Home", "home", "home"),
        ("View", "viewer", "cube"),
        ("Scale", "inspector", "ruler"),
        ("Convert", "converter", "swap"),
        ("Check", "checker", "check"),
    ]
    parts = []
    for label, key, icon in items:
        parts.append(
            f'<a class="{"on" if key == active else ""}" data-nav="{key}" href="#">{ico(icon)}<span>{label}</span></a>'
        )
    return f'<nav class="bottomnav">{"".join(parts)}</nav>'


def nudge():
    return f"""
<aside class="nudge" data-nudge>
  <div class="nudge-row">
    <span class="nudge-icon">{ico("spark")}</span>
    <div>
      <b>Keep the tools free</b>
      <p>No ads. No sponsors. Bitcoin only.</p>
    </div>
    <button class="nudge-close" aria-label="Dismiss">{ico("close")}</button>
  </div>
  <button class="btn btn-primary small">Support the tools</button>
</aside>"""


def home(d):
    tools = [
        ("01", "cube", "Viewer", "See it in 3D. Read the real bounding box.", "Open the viewer"),
        ("02", "ruler", "Scale Inspector", "Check the scale. Copy the exact slicer percentage.", "Check the scale"),
        ("03", "swap", "Converter", "STL to OBJ, PLY, binary or ASCII. Locally.", "Convert a file"),
        ("04", "check", "Printability Checker", "Find holes before you waste a print.", "Check the mesh"),
    ]
    if d == "b":
        tool_html = "".join(
            f"""
      <a class="tool" href="#">
        <span class="tool-num">{n}</span>
        <span class="tool-body"><b>{name}</b><span>{line}</span></span>
        <span class="tool-arrow">{ico("arrow")}</span>
      </a>"""
            for n, _i, name, line, _cta in tools
        )
        hero = f"""
    <section class="hero hero-b">
      <p class="eyebrow">STLACCESS</p>
      <h1>What do you need to do?</h1>
      <p class="lede">Four quiet tools that never upload your file. Pick a job.</p>
    </section>
    <section class="surface tools-surface">
      <div class="tools">{tool_html}</div>
    </section>
    <div class="library-line"><span class="muted">Need a guide?</span> <a href="#">Browse the library {ico("arrow")}</a></div>"""
    elif d == "c":
        tool_html = "".join(
            f"""
      <a class="tool tool-c" href="#">
        <span class="tool-icon">{ico(i)}</span>
        <span class="tool-verb">{verb(name)}</span>
        <span class="tool-line">{line}</span>
        <span class="tool-cta">{cta} {ico("arrow")}</span>
      </a>"""
            for n, i, name, line, cta in tools
        )
        hero = f"""
    <section class="hero hero-c">
      <p class="eyebrow">NO UPLOAD / NO ACCOUNT / NO COOKIES</p>
      <h1>KNOW THE SIZE.</h1>
      <p class="lede">Four tools. One rule: your file stays on your machine.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#">Open the Scale Inspector {ico("arrow")}</a>
        <a class="btn btn-ghost" href="#">Browse the library</a>
      </div>
    </section>
    <section class="tools tools-c">{tool_html}</section>"""
    else:
        tool_html = "".join(
            f"""
      <a class="tool" href="#">
        <span class="tool-icon">{ico(i)}</span>
        <span class="tool-body">
          <b>{name}{' <em class="chip">Start here</em>' if name == 'Scale Inspector' else ''}</b>
          <span>{line}</span>
        </span>
        <span class="tool-cta">{cta} {ico("arrow")}</span>
      </a>"""
            for n, i, name, line, cta in tools
        )
        hero = f"""
    <section class="hero">
      <p class="eyebrow">PRIVACY-FIRST STL TOOLS</p>
      <h1>Open the file.<br><span class="accent">Know the size.</span> Print it right.</h1>
      <p class="lede">Four tools. No uploads, no accounts, no cookies. Everything runs in this tab.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#">Start with the Scale Inspector {ico("arrow")}</a>
        <a class="btn btn-ghost" href="#">Browse the library</a>
      </div>
    </section>
    <section class="surface">
      <div class="surface-head"><span class="eyebrow">THE FOUR JOBS</span><span class="muted small">Same rule for all four</span></div>
      <div class="tools">{tool_html}</div>
    </section>"""
    return f"""
<section class="screen" data-screen="home">
  {topbar("home")}
  <main class="wrap">
    {hero}
    <div class="trustline">{ico("shield")}<span>No uploads</span><span>No accounts</span><span>No cookies</span><span>Bitcoin-only support</span></div>
    <div class="library-line"><span class="muted">Looking for the old scale chart?</span> <a href="#">The library is still here {ico("arrow")}</a></div>
  </main>
</section>"""


def inspector(d):
    mode = """
      <div class="mode">
        <span class="on">I know the scale</span>
        <span>I have a file</span>
      </div>"""
    form = f"""
      <div class="form">
        {mode}
        <div class="field">
          <label>Current STL scale</label>
          <button class="select">28mm — True scale <span>{ico("chevron")}</span></button>
        </div>
        <div class="field">
          <label>Scale you want</label>
          <button class="select">32mm — Heroic <span>{ico("chevron")}</span></button>
        </div>
        <div class="field">
          <label>Measurement</label>
          <div class="seg"><span class="on">Eye level</span><span>Top of head</span></div>
        </div>
        <div class="field row-between">
          <div><label>Material compensation</label><span class="hint">For PLA / PETG cooling</span></div>
          <span class="switch"></span>
        </div>
        <a class="file-link" href="#">{ico("file")} Have a file? Measure it instead</a>
      </div>"""
    result = f"""
      <div class="result">
        <p class="result-label">Type this into your slicer</p>
        <p class="result-pct">{D['pct']}</p>
        <p class="result-pair">{D['pair']} · Eye level</p>
        <p class="result-formula">{D['formula']}</p>
        <div class="result-actions">
          <button class="btn btn-primary">{ico("copy")} Copy 114.3%</button>
          <button class="btn btn-ghost">{ico("swap")} Swap</button>
        </div>
        <p class="result-foot">{ico("shield")} Tested on a Bambu Lab A1 Mini · <a href="#">Method</a></p>
      </div>"""
    if d == "b":
        result = f"""
      <div class="result result-strip">
        <div class="strip-main">
          <p class="result-label">Type this into your slicer</p>
          <p class="result-pct">{D['pct']}</p>
          <p class="result-pair">{D['pair']} · Eye level · {D['formula']}</p>
        </div>
        <div class="strip-actions">
          <button class="btn btn-primary">{ico("copy")} Copy</button>
          <button class="btn btn-quiet">Share link</button>
        </div>
      </div>"""
        form = form.replace('<span class="switch"></span>', '<span class="switch"></span>')
    if d == "c":
        result = f"""
      <div class="result result-c">
        <p class="result-label">TYPE THIS INTO YOUR SLICER</p>
        <p class="result-pct">{D['pct']}</p>
        <p class="result-pair">{D['pair']} / EYE LEVEL</p>
        <div class="result-actions">
          <button class="btn btn-primary">{ico("copy")} COPY 114.3%</button>
          <button class="btn btn-ghost">{ico("swap")} SWAP</button>
        </div>
      </div>"""
    hero = ""
    if d == "a":
        hero = f"""
    <section class="hero">
      <p class="eyebrow">SCALE INSPECTOR</p>
      <h1>Know the exact size <span class="accent">before you print.</span></h1>
      <p class="lede">Pick the scale the file was modeled in and the scale you need. Get the exact percentage for your slicer.</p>
    </section>"""
    elif d == "b":
        hero = """
    <section class="hero hero-b">
      <p class="eyebrow">SCALE INSPECTOR</p>
      <h1>Scale, without the guesswork.</h1>
    </section>"""
    else:
        hero = """
    <section class="hero hero-c">
      <p class="eyebrow">SCALE INSPECTOR / 28MM → 32MM</p>
    </section>"""
    return f"""
<section class="screen" data-screen="inspector">
  {topbar("inspector")}
  <main class="wrap">
    {hero}
    <section class="surface tool-layout">
      {result}
      {form}
    </section>
    <div class="url-note">{ico("link")} <span class="mono">{D['url']}</span><span class="muted">State lives in the URL. Back, refresh and share all land here.</span></div>
    <section class="next-rail">
      <p class="eyebrow">NEXT, IF YOU NEED IT</p>
      <div class="rail-grid">
        <a href="#">{ico("cube")} <b>Viewer</b><span>Confirm the scaled shape in 3D.</span></a>
        <a href="#">{ico("check")} <b>Printability</b><span>Watertight before you slice.</span></a>
        <a href="#">{ico("swap")} <b>Converter</b><span>Send it out as OBJ or PLY.</span></a>
      </div>
    </section>
  </main>
</section>"""


def viewer(d):
    svg = f"""
      <svg class="wire" viewBox="0 0 420 420" aria-label="Wireframe miniature">
        <g fill="none" stroke="currentColor" stroke-width="1.1" opacity=".92">
          <polygon points="210,46 242,64 242,104 210,122 178,104 178,64"/>
          <polygon points="178,104 242,104 258,168 210,190 162,168"/>
          <polygon points="162,168 210,190 204,276 172,286"/>
          <polygon points="258,168 210,190 216,276 248,286"/>
          <polygon points="172,286 204,276 198,364 166,374"/>
          <polygon points="248,286 216,276 222,364 254,374"/>
          <polygon points="166,374 198,364 192,402 158,406"/>
          <polygon points="254,374 222,364 228,402 262,406"/>
          <line x1="258" y1="168" x2="322" y2="96"/>
          <line x1="322" y1="96" x2="342" y2="112"/>
          <line x1="342" y1="112" x2="300" y2="156"/>
        </g>
        <ellipse cx="210" cy="406" rx="94" ry="12" fill="none" stroke="currentColor" stroke-width="1" opacity=".35"/>
      </svg>"""
    stats = f"""
      <div class="stats">
        <div><span>File</span><b>{D['file']}</b></div>
        <div><span>Format</span><b>{D['fmt']}</b></div>
        <div><span>Triangles</span><b>{D['tris']}</b></div>
        <div><span>Size</span><b>{D['size']}</b></div>
        <div><span>Bounding box</span><b>{D['dims']}</b></div>
      </div>"""
    if d == "a":
        hero = """
    <section class="hero">
      <p class="eyebrow">STL VIEWER</p>
      <h1>Open any STL. <span class="accent">Nothing uploaded.</span></h1>
      <p class="lede">Orbit, pan and zoom a local model. Read the real bounding box before you slice.</p>
    </section>"""
    elif d == "b":
        hero = """
    <section class="hero hero-b">
      <p class="eyebrow">STL VIEWER</p>
      <h1>Look before you slice.</h1>
    </section>"""
    else:
        hero = """
    <section class="hero hero-c">
      <p class="eyebrow">STL VIEWER / LOCAL ONLY</p>
    </section>"""
    return f"""
<section class="screen" data-screen="viewer">
  {topbar("viewer")}
  <main class="wrap">
    {hero}
    <section class="surface viewer-surface">
      <div class="viewer-toolbar">
        <button class="btn btn-primary small">{ico("folder")} Choose STL</button>
        <button class="btn btn-ghost small">{ico("play")} Demo cube</button>
        <span class="toolbar-spacer"></span>
        <button class="btn btn-quiet small">{ico("swap")} Reset</button>
        <button class="btn btn-quiet small">{ico("layers")} Wireframe</button>
      </div>
      <div class="viewer-stage">
        {svg}
        <span class="hud hud-tl">{D['tris']} tris</span>
        <span class="hud hud-tr">{D['dims']}</span>
        <span class="hud hud-b">Drag to orbit · Scroll to zoom · Double-click to reset</span>
      </div>
      {stats}
    </section>
  </main>
</section>"""


def converter(d):
    formats = [
        ("OBJ", "Best for Blender, ZBrush, CAD"),
        ("PLY", "ASCII mesh for scans and research"),
        ("BIN STL", "Smallest, slicer-friendly"),
        ("ASCII STL", "Readable, larger, for debugging"),
    ]
    if d == "a":
        fmt = f"""
        <div class="field"><label>Output format</label>
          <button class="select">OBJ (.obj) — best for sculpting and CAD <span>{ico("chevron")}</span></button>
        </div>"""
        layout = f"""
        <div class="split">
          {fmt}
          <div class="field"><label>Vertex merge tolerance (mm)</label><button class="select">0.001 <span class="mono muted">mm</span></button></div>
        </div>"""
    else:
        fmt = "".join(
            f"""
          <div class="fmt {'on' if i == 0 else ''}">
            <span class="fmt-name">{name}</span><span class="fmt-note">{note}</span>
          </div>"""
            for i, (name, note) in enumerate(formats)
        )
        layout = f"""
        <div class="format-grid">{fmt}</div>
        <div class="field"><label>Vertex merge tolerance</label><span class="inline-field">{D['tol']} <span class="muted">· used for OBJ and PLY only</span></span></div>"""
    hero = ""
    if d == "a":
        hero = """
    <section class="hero">
      <p class="eyebrow">STL CONVERTER</p>
      <h1>Change the format. <span class="accent">Not the file's home.</span></h1>
      <p class="lede">STL in, OBJ / PLY / binary STL / ASCII STL out. Converted in this tab, saved by your browser.</p>
    </section>"""
    elif d == "b":
        hero = """
    <section class="hero hero-b">
      <p class="eyebrow">STL CONVERTER</p>
      <h1>From STL to whatever comes next.</h1>
    </section>"""
    else:
        hero = """
    <section class="hero hero-c">
      <p class="eyebrow">STL CONVERTER / STL IN ONLY</p>
    </section>"""
    return f"""
<section class="screen" data-screen="converter">
  {topbar("converter")}
  <main class="wrap">
    {hero}
    <section class="surface">
      <div class="dropzone">
        <span class="drop-icon">{ico("download")}</span>
        <b>Drop an STL here</b>
        <p>Binary or ASCII. The file is read locally and never leaves this tab.</p>
        <div class="drop-actions">
          <button class="btn btn-primary small">{ico("folder")} Choose STL</button>
          <button class="btn btn-ghost small">{ico("play")} Demo cube</button>
        </div>
        <span class="drop-note">STL input only · no OBJ → STL · no server limit</span>
      </div>
      <div class="file-summary">
        <div><span>Source</span><b>{D['file']}</b></div>
        <div><span>Format</span><b>{D['fmt']}</b></div>
        <div><span>Triangles</span><b>{D['tris']}</b></div>
        <div><span>Bounding box</span><b>{D['dims']}</b></div>
      </div>
      {layout}
      <button class="btn btn-primary wide">{ico("download")} Convert &amp; download OBJ <span class="btn-note">312 KB</span></button>
      <p class="status">{ico("check")} Saved knight_28mm.obj (312 KB) to your downloads folder.</p>
    </section>
  </main>
</section>"""


def checker(d):
    checks = [
        ("Open edges", D["open"], "ok"),
        ("Non-manifold", D["nonmanifold"], "ok"),
        ("Degenerate", D["degenerate"], "ok"),
        ("Winding", D["winding"], "ok"),
        ("Shells", D["shells"], "ok"),
    ]
    if d == "b":
        check_html = "".join(
            f'<div class="check-row"><span>{name}</span><b class="{cls}">{val}</b></div>'
            for name, val, cls in checks
        )
        verdict = f"""
      <div class="result result-strip verdict-strip">
        <div class="strip-main">
          <p class="result-label">Verdict</p>
          <p class="verdict-title">Watertight.</p>
          <p class="result-pair">0 open edges · 0 non-manifold · 1 shell</p>
        </div>
        <div class="strip-actions"><button class="btn btn-primary">Open in Viewer</button></div>
      </div>"""
        details = f"""
      <details class="details" open>
        <summary>Checks and measurements</summary>
        <div class="check-list">{check_html}</div>
        <div class="measure-grid">
          <span>Triangles <b>{D['tris']}</b></span><span>Height <b>{D['dims'].split(' × ')[-1]}</b></span>
          <span>Volume <b>{D['volume']}</b></span><span>Surface <b>{D['area']}</b></span>
        </div>
      </details>"""
    elif d == "c":
        check_html = "".join(
            f'<div class="check-cell"><span>{name}</span><b class="{cls}">{val}</b></div>'
            for name, val, cls in checks
        )
        verdict = f"""
      <div class="verdict-c">
        <div class="verdict-big">PASS</div>
        <div class="verdict-copy"><b>Watertight.</b><span>0 open edges · 0 non-manifold · 1 shell</span></div>
      </div>"""
        details = f'<div class="check-grid">{check_html}</div>'
    else:
        check_html = "".join(
            f'<div class="check-cell"><span>{name}</span><b class="{cls}">{val}</b></div>'
            for name, val, cls in checks
        )
        verdict = f"""
      <div class="verdict">
        <span class="verdict-icon">{ico("check")}</span>
        <div><p class="eyebrow">ANALYSIS COMPLETE</p><h2>Watertight. No holes found.</h2><p>Every edge is shared by two triangles. No holes, no non-manifold edges, one shell.</p></div>
        <button class="btn btn-primary small">Open in Viewer {ico("arrow")}</button>
      </div>"""
        details = f'<div class="check-grid">{check_html}</div>'
    hero = ""
    if d == "a":
        hero = """
    <section class="hero">
      <p class="eyebrow">PRINTABILITY CHECKER</p>
      <h1>Catch bad files <span class="accent">before the print.</span></h1>
      <p class="lede">Open edges, non-manifold edges, winding, shells. Local analysis, no upload.</p>
    </section>"""
    elif d == "b":
        hero = """
    <section class="hero hero-b">
      <p class="eyebrow">PRINTABILITY CHECKER</p>
      <h1>Will it print?</h1>
    </section>"""
    else:
        hero = """
    <section class="hero hero-c">
      <p class="eyebrow">PRINTABILITY CHECKER / TOLERANCE 0.001MM</p>
    </section>"""
    return f"""
<section class="screen" data-screen="checker">
  {topbar("checker")}
  <main class="wrap">
    {hero}
    <section class="surface">
      <div class="file-summary">
        <div><span>File</span><b>{D['file']}</b></div>
        <div><span>Format</span><b>{D['fmt']}</b></div>
        <div><span>Triangles</span><b>{D['tris']}</b></div>
        <div><span>Size</span><b>{D['size']}</b></div>
      </div>
      {verdict}
      {details}
      <div class="checker-actions">
        <button class="btn btn-ghost small">{ico("swap")} Re-check</button>
        <span class="mono muted">Tolerance 0.001 mm · changed 12s ago</span>
      </div>
    </section>
  </main>
</section>"""


def guide(d):
    if d == "b":
        answer = f"""
      <div class="answer answer-b">
        <p class="eyebrow">THE ANSWER</p>
        <p class="answer-pct">{D['pct']}</p>
        <p>Set X, Y and Z to <b>114.3%</b> with uniform scaling locked. That is 32.0mm ÷ 28.0mm × 100.</p>
        <button class="btn btn-primary">{ico("ruler")} Open the inspector with these scales</button>
      </div>"""
        cta = f'<a class="inline-cta" href="#">Open the Scale Inspector with 28mm → 32mm {ico("arrow")}</a>'
    elif d == "c":
        answer = f"""
      <div class="answer answer-c">
        <p class="eyebrow">SET ALL THREE AXES</p>
        <p class="answer-pct">{D['pct']}</p>
        <p>28mm → 32mm. Lock uniform scaling. Type 114.3.</p>
        <button class="btn btn-primary">{ico("copy")} COPY 114.3%</button>
      </div>"""
        cta = f'<a class="inline-cta" href="#">OPEN THE INSPECTOR {ico("arrow")}</a>'
    else:
        answer = f"""
      <div class="answer">
        <p class="eyebrow">THE ANSWER</p>
        <p class="answer-pct">{D['pct']}</p>
        <p>Scale 28mm to 32mm by setting every axis to <b>114.3%</b>. The math is 32.0 ÷ 28.0 × 100.</p>
        <button class="btn btn-primary">{ico("ruler")} Open the Scale Inspector</button>
      </div>"""
        cta = f'<a class="inline-cta" href="#">Open the inspector with 28mm → 32mm {ico("arrow")}</a>'
    rows = "".join(
        f"<tr><td>{a}</td><td class='mono'>{b}</td><td><a href='#'>Open</a></td></tr>"
        for a, b in D["table"]
    )
    return f"""
<section class="screen" data-screen="guide">
  {topbar("inspector")}
  <main class="wrap article">
    <nav class="crumbs"><a href="#">Home</a> / <a href="#">Guides</a> / 28mm to 32mm</nav>
    <header class="article-head">
      <p class="eyebrow">SCALE GUIDE · 6 MIN READ</p>
      <h1>How to scale 28mm to 32mm</h1>
      <p class="lede">The exact slicer percentage, the math behind it, and how to check the result before you print.</p>
      <p class="byline">{ico("shield")} Updated 2026-10-30 · Tested on a Bambu Lab A1 Mini</p>
    </header>
    {answer}
    <h2>Do this in your slicer</h2>
    <ol class="steps">
      <li><b>Open the model.</b> Import the STL and do not move it yet.</li>
      <li><b>Lock uniform scaling.</b> X, Y and Z must change together.</li>
      <li><b>Type 114.3%.</b> Not 115, not 114. The exact value is 32.0 ÷ 28.0 × 100.</li>
      <li><b>Check the height.</b> A 28.0mm figure should now measure 32.0mm.</li>
    </ol>
    <h2>The numbers</h2>
    <table class="num-table"><thead><tr><th>Conversion</th><th>Percentage</th><th></th></tr></thead><tbody>{rows}</tbody></table>
    {cta}
  </main>
</section>"""


SCREENS = {
    "home": home,
    "inspector": inspector,
    "viewer": viewer,
    "converter": converter,
    "checker": checker,
    "guide": guide,
}


def mock(d):
    body = "".join(SCREENS[key](d) for key in SCREENS)
    return f"""
<div class="mock d-{d}" data-dir="{d}">
  <div class="chrome"><i></i><i></i><i></i><span class="url">{D['url']}</span></div>
  {body}
  {nudge()}
  {bottomnav("home")}
</div>"""


CSS = r"""
/* ---------- board shell ---------- */
:root { color-scheme: dark; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  background: #131315;
  color: #e9e9ec;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
.ico { width: 18px; height: 18px; flex: 0 0 auto; display: inline-block; vertical-align: -3px; }

.board-head { max-width: 1700px; margin: 0 auto; padding: 30px 28px 18px; }
.board-head h1 { font-size: 26px; letter-spacing: -.02em; margin: 0 0 6px; font-weight: 800; }
.board-head p { margin: 0; color: #a4a4ad; max-width: 980px; }
.board-head .kicker { color: #ff6b35; font: 700 11px ui-monospace, monospace; letter-spacing: .18em; text-transform: uppercase; margin-bottom: 10px; }
.dir-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 1700px; margin: 18px auto 0; padding: 0 28px; }
.dir-card { border: 1px solid #2c2c31; background: #1a1a1d; border-radius: 10px; padding: 14px 16px; }
.dir-card b { display: block; font-size: 13px; margin-bottom: 3px; }
.dir-card span { color: #a4a4ad; font-size: 12px; display: block; }
.dir-card em { color: #ff6b35; font-style: normal; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; display: block; margin-top: 8px; }
.pick { max-width: 1700px; margin: 12px auto 0; padding: 0 28px; }
.pick .box { border: 1px solid #3a2a22; background: linear-gradient(180deg, #211710, #1a1a1d); border-radius: 10px; padding: 14px 16px; color: #d8d8de; }
.pick b { color: #ff8a5c; }

.toolbar { position: sticky; top: 0; z-index: 100; display: flex; gap: 18px; align-items: center; flex-wrap: wrap; padding: 10px 20px; background: #0f0f11ee; backdrop-filter: blur(12px); border-top: 1px solid #2a2a2f; border-bottom: 1px solid #2a2a2f; }
.toolbar .group { display: flex; gap: 4px; align-items: center; }
.toolbar .label { color: #77777f; font: 700 10px ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; margin-right: 4px; }
.toolbar button { padding: 7px 10px; border-radius: 6px; color: #b7b7c0; font-size: 12px; font-weight: 600; border: 1px solid transparent; }
.toolbar button:hover { color: #fff; background: #1c1c20; }
.toolbar button.on { color: #0a0a0a; background: #ff6b35; border-color: #ff6b35; }
.toolbar .hint { margin-left: auto; color: #77777f; font-size: 11px; }

.board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; padding: 12px; align-items: start; max-width: 1700px; margin: 0 auto; }
.col { background: #1a1a1d; border: 1px solid #2c2c31; border-radius: 10px; overflow: hidden; }
.col-head { padding: 10px 14px; border-bottom: 1px solid #2c2c31; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.col-head b { font-size: 12px; }
.col-head span { color: #85858e; font-size: 10px; }
.stage { height: calc(100vh - 250px); min-height: 520px; overflow: auto; background: #0c0c0e; }
.board.phone .stage { background: #0c0c0e; padding: 14px; display: flex; justify-content: center; align-items: flex-start; overflow: hidden; }
.mock { width: 1080px; zoom: var(--zoom, .42); position: relative; }
.board.phone .mock { width: 390px; height: clamp(480px, calc(100vh - 290px), 680px); zoom: 1; border: 7px solid #000; border-radius: 34px; overflow: hidden; display: flex; flex-direction: column; background: var(--bg); }
.board.phone .mock .screen { flex: 1 1 auto; min-height: 0; overflow-y: auto; }
.board.phone .mock [data-screen="home"] { padding-bottom: 140px; }
.board.phone .chrome { display: none; }

@media (max-width: 1300px) {
  .dir-grid { grid-template-columns: 1fr; }
  .board { grid-template-columns: 1fr; }
  .stage { height: 720px; }
}

/* ---------- direction tokens ---------- */
.d-a {
  --bg: #060607; --bg2: #0d0d0f; --panel: #111114; --panel2: #19191d;
  --line: rgba(255,255,255,.09); --line2: rgba(255,255,255,.16);
  --text: #f4f4f5; --muted: #9b9ba6; --accent: #ff6b35; --accent-soft: rgba(255,107,53,.12);
  --accent-ink: #0a0a0a; --ok: #34d399; --warn: #fbbf24;
  --radius: 24px; --radius-sm: 13px;
  --shadow: 0 24px 70px rgba(0,0,0,.5);
  --font: Inter, ui-sans-serif, system-ui, sans-serif;
  --display: "Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}
.d-b {
  --bg: #f7f3eb; --bg2: #fffdf8; --panel: #fffdf8; --panel2: #f1ece2;
  --line: #e0d8ca; --line2: #cfc5b4;
  --text: #1c1813; --muted: #6f6558; --accent: #c24e1d; --accent-soft: #f3e2d7;
  --accent-ink: #fffdf8; --ok: #2f6b4f; --warn: #946a16;
  --radius: 5px; --radius-sm: 2px;
  --shadow: none;
  --font: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --display: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.d-c {
  --bg: #0a0a0b; --bg2: #111113; --panel: #151517; --panel2: #1c1c20;
  --line: #2b2b31; --line2: #3a3a42;
  --text: #fafaf7; --muted: #a1a1a6; --accent: #ff5a1f; --accent-soft: rgba(255,90,31,.14);
  --accent-ink: #0a0a0b; --ok: #b8ff5a; --warn: #ffd166;
  --radius: 6px; --radius-sm: 4px;
  --shadow: none;
  --font: Inter, ui-sans-serif, system-ui, sans-serif;
  --display: "Archivo", "Arial Black", Inter, ui-sans-serif, system-ui, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* ---------- mock base ---------- */
.mock { background: var(--bg); color: var(--text); font-family: var(--font); font-size: 15px; line-height: 1.5; }
.mock * { box-sizing: border-box; }
.mock .wrap { max-width: 1000px; margin: 0 auto; padding: 0 30px; }
.mock .small { font-size: 12px; }
.mock .muted { color: var(--muted); }
.mock .mono { font-family: var(--mono); }
.mock .accent { color: var(--accent); }
.mock .eyebrow { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); margin: 0 0 10px; }
.mock .lede { color: var(--muted); font-size: 16px; max-width: 620px; margin: 0; line-height: 1.55; }
.mock .screen { padding-bottom: 48px; position: relative; }
.screen[data-screen="home"] { padding-bottom: 160px; }

.chrome { height: 34px; background: #1b1b1e; border-bottom: 1px solid #2c2c31; display: flex; align-items: center; gap: 6px; padding: 0 12px; }
.chrome i { width: 8px; height: 8px; border-radius: 50%; background: #3a3a40; display: block; }
.chrome .url { margin-left: 8px; flex: 1; max-width: 540px; height: 20px; border-radius: 5px; background: #111113; color: #8a8a93; font: 10px/20px var(--mono); display: flex; align-items: center; padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

/* top bar */
.topbar { height: 64px; border-bottom: 1px solid var(--line); background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 20; }
.topbar-in { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.logo { font-family: var(--display); font-weight: 800; font-size: 20px; letter-spacing: -.03em; }
.logo span { color: var(--accent); }
.nav { display: flex; gap: 22px; font-size: 13px; font-weight: 650; color: var(--muted); }
.nav .on { color: var(--text); }
.top-actions { display: flex; align-items: center; gap: 10px; }
.icon-btn, .menu-btn { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--line); border-radius: var(--radius-sm); color: var(--muted); }
.menu-btn { display: none; }
.support-link { font-size: 12px; font-weight: 700; color: var(--muted); border-bottom: 1px solid var(--line2); padding-bottom: 1px; }
.bottomnav { display: none; }

/* floating support card */
.nudge { position: absolute; left: 24px; bottom: 24px; z-index: 25; width: 300px; padding: 12px; border: 1px solid var(--line2); border-radius: var(--radius-sm); background: color-mix(in srgb, var(--panel) 92%, transparent); box-shadow: 0 18px 50px rgba(0,0,0,.32); backdrop-filter: blur(14px); }
.nudge-row { display: flex; align-items: flex-start; gap: 10px; }
.nudge-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: var(--accent); background: var(--accent-soft); flex: 0 0 auto; }
.nudge-icon .ico { width: 17px; height: 17px; }
.nudge b { display: block; font-size: 12px; }
.nudge p { margin: 1px 0 0; color: var(--muted); font-size: 10px; line-height: 1.35; }
.nudge-close { margin-left: auto; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; color: var(--muted); flex: 0 0 auto; }
.nudge-close .ico { width: 13px; height: 13px; }
.nudge > .btn { width: 100%; margin-top: 10px; }

/* hero */
.hero { padding: 52px 0 28px; }
.hero h1 { font-family: var(--display); font-size: 54px; line-height: 1.02; letter-spacing: -.035em; margin: 0 0 16px; max-width: 780px; font-weight: 800; }
.hero-actions { display: flex; gap: 10px; margin-top: 22px; flex-wrap: wrap; }

/* buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 0 18px; border-radius: var(--radius-sm); border: 1px solid transparent; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; }
.btn .ico { width: 16px; height: 16px; }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-ghost { border-color: var(--line2); color: var(--text); background: transparent; }
.btn-quiet { color: var(--muted); background: transparent; border-color: transparent; }
.btn.small { min-height: 38px; padding: 0 13px; font-size: 11px; }
.btn.wide { width: 100%; margin-top: 18px; min-height: 54px; font-size: 13px; }
.btn-note { font-weight: 600; opacity: .65; margin-left: 8px; letter-spacing: 0; text-transform: none; }

/* surfaces */
.surface { background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 26px; box-shadow: var(--shadow); }
.surface-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.tools-surface { padding: 8px 26px; }

/* tool cards */
.tools { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tool { display: grid; grid-template-columns: 44px 1fr auto; gap: 14px; align-items: start; padding: 18px; border: 1px solid var(--line); border-radius: calc(var(--radius) - 6px); background: color-mix(in srgb, var(--panel2) 55%, transparent); }
.tool-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent); }
.tool-icon .ico { width: 22px; height: 22px; }
.tool-body b { display: block; font-family: var(--display); font-size: 18px; letter-spacing: -.02em; margin-bottom: 3px; }
.tool-body span { display: block; color: var(--muted); font-size: 13px; line-height: 1.45; }
.tool-cta { grid-column: 2 / 4; display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; margin-top: 2px; }
.tool-cta .ico { width: 13px; height: 13px; }
.chip { display: inline-block; font: 700 9px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--accent); background: var(--accent-soft); border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); border-radius: 999px; padding: 2px 7px; vertical-align: 2px; margin-left: 6px; }
.trustline { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin: 18px 0 0; color: var(--muted); font: 10px var(--mono); letter-spacing: .1em; text-transform: uppercase; }
.trustline .ico { color: var(--accent); }
.library-line { margin-top: 18px; font-size: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
.library-line a { color: var(--accent); display: inline-flex; align-items: center; gap: 4px; font-weight: 700; }

/* inspector */
.tool-layout { display: grid; grid-template-columns: 1fr .92fr; gap: 22px; align-items: start; }
.mode { display: flex; gap: 16px; border-bottom: 1px solid var(--line); margin-bottom: 18px; }
.mode span { padding: 0 0 10px; font-size: 12px; font-weight: 700; color: var(--muted); }
.mode .on { color: var(--text); border-bottom: 2px solid var(--accent); }
.field { margin-bottom: 16px; }
.field label { display: block; font: 700 10px var(--mono); letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 7px; }
.select { width: 100%; height: 50px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 14px; border: 1px solid var(--line2); border-radius: var(--radius-sm); background: var(--bg2); color: var(--text); font-size: 14px; font-weight: 650; text-align: left; }
.select .ico { width: 15px; height: 15px; color: var(--muted); }
.seg { display: flex; gap: 4px; padding: 4px; background: var(--bg2); border: 1px solid var(--line); border-radius: var(--radius-sm); }
.seg span { flex: 1; text-align: center; padding: 9px 8px; border-radius: calc(var(--radius-sm) - 2px); font-size: 12px; font-weight: 700; color: var(--muted); }
.seg .on { background: var(--panel2); color: var(--text); }
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hint { display: block; color: var(--muted); font-size: 11px; margin-top: 2px; }
.switch { width: 40px; height: 22px; border-radius: 999px; background: var(--panel2); border: 1px solid var(--line2); position: relative; flex: 0 0 auto; }
.switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: var(--muted); }
.file-link { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); font-size: 12px; font-weight: 700; margin-top: 4px; }
.file-link .ico { width: 15px; height: 15px; }
.result { background: var(--accent); color: var(--accent-ink); border-radius: var(--radius); padding: 24px; }
.result-label { margin: 0 0 6px; font: 800 10px var(--mono); letter-spacing: .16em; text-transform: uppercase; opacity: .78; }
.result-pct { margin: 0; font-family: var(--display); font-size: 74px; font-weight: 900; line-height: .92; letter-spacing: -.06em; }
.result-pair { margin: 8px 0 0; font: 800 11px var(--mono); letter-spacing: .1em; text-transform: uppercase; opacity: .78; }
.result-formula { margin: 3px 0 0; font: 600 10px var(--mono); letter-spacing: .08em; text-transform: uppercase; opacity: .55; }
.result-actions { display: flex; gap: 8px; margin-top: 18px; flex-wrap: wrap; }
.result .btn-primary { background: var(--accent-ink); color: var(--accent); }
.result .btn-ghost { border-color: color-mix(in srgb, var(--accent-ink) 28%, transparent); color: var(--accent-ink); }
.result-foot { margin: 16px 0 0; font-size: 10px; opacity: .62; display: flex; align-items: center; gap: 6px; }
.result-foot .ico { width: 13px; height: 13px; }
.url-note { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin: 14px 0 0; padding: 10px 12px; border: 1px dashed var(--line2); border-radius: var(--radius-sm); color: var(--muted); font-size: 11px; }
.url-note .mono { color: var(--text); word-break: break-all; }
.url-note .ico { color: var(--accent); width: 14px; height: 14px; }
.next-rail { margin-top: 28px; }
.rail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.rail-grid a { display: grid; grid-template-columns: 22px 1fr; gap: 2px 8px; padding: 14px; border: 1px solid var(--line); border-radius: var(--radius-sm); font-size: 12px; }
.rail-grid a .ico { grid-row: 1 / 3; color: var(--accent); }
.rail-grid a b { font-size: 12px; }
.rail-grid a span { color: var(--muted); font-size: 11px; }

/* viewer */
.viewer-toolbar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
.toolbar-spacer { flex: 1; }
.viewer-stage { position: relative; height: 420px; border: 1px solid var(--line); border-radius: var(--radius-sm); background: radial-gradient(circle at 50% 42%, #17171b, #050506); overflow: hidden; color: var(--accent); }
.wire { position: absolute; left: 50%; top: 50%; width: 360px; height: 360px; transform: translate(-50%, -50%); }
.hud { position: absolute; font: 10px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--text); background: color-mix(in srgb, var(--bg) 70%, transparent); border: 1px solid var(--line); border-radius: 4px; padding: 4px 7px; }
.hud-tl { top: 12px; left: 12px; }
.hud-tr { top: 12px; right: 12px; color: var(--muted); }
.hud-b { bottom: 12px; left: 50%; transform: translateX(-50%); color: var(--muted); white-space: normal; text-align: center; max-width: calc(100% - 24px); }
.stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; margin-top: 12px; }
.stats div { background: var(--panel2); padding: 10px 12px; }
.stats span { display: block; font: 700 9px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
.stats b { font-size: 12px; }

/* converter */
.dropzone { border: 2px dashed var(--line2); border-radius: var(--radius-sm); padding: 28px; text-align: center; background: color-mix(in srgb, var(--panel2) 45%, transparent); }
.drop-icon { display: inline-flex; width: 48px; height: 48px; align-items: center; justify-content: center; border-radius: 14px; background: var(--accent-soft); color: var(--accent); margin-bottom: 10px; }
.drop-icon .ico { width: 24px; height: 24px; }
.dropzone b { display: block; font-family: var(--display); font-size: 24px; letter-spacing: -.02em; }
.dropzone p { margin: 5px auto 14px; color: var(--muted); font-size: 13px; max-width: 480px; }
.drop-actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.drop-note { display: block; margin-top: 12px; font: 700 9px var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.file-summary { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.4fr; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius-sm); overflow: hidden; margin: 14px 0; }
.file-summary div { background: var(--panel2); padding: 9px 12px; }
.file-summary span { display: block; font: 700 9px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
.file-summary b { font-size: 12px; }
.split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.format-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.fmt { border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 12px 14px; background: var(--bg2); }
.fmt.on { border-color: var(--accent); background: var(--accent-soft); }
.fmt-name { display: block; font: 800 12px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--text); }
.fmt-note { display: block; font-size: 11px; color: var(--muted); margin-top: 2px; }
.inline-field { display: flex; align-items: center; gap: 8px; border-bottom: 1px solid var(--line2); padding: 8px 0; font: 600 14px var(--mono); }
.status { display: flex; align-items: center; gap: 6px; justify-content: center; margin: 12px 0 0; color: var(--ok); font-size: 11px; }
.status .ico { width: 14px; height: 14px; }

/* checker */
.verdict { display: grid; grid-template-columns: 48px 1fr auto; gap: 16px; align-items: center; padding: 20px; border: 1px solid color-mix(in srgb, var(--ok) 30%, var(--line)); border-radius: var(--radius-sm); background: color-mix(in srgb, var(--ok) 7%, transparent); }
.verdict-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--ok) 16%, transparent); color: var(--ok); }
.verdict h2 { margin: 0 0 3px; font-family: var(--display); font-size: 24px; letter-spacing: -.02em; }
.verdict p { margin: 0; color: var(--muted); font-size: 12px; }
.verdict .eyebrow { margin-bottom: 2px; }
.check-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 12px; }
.check-cell { border: 1px solid var(--line); border-radius: var(--radius-sm); padding: 12px; background: var(--panel2); }
.check-cell span { display: block; font: 700 9px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
.check-cell b { font-family: var(--display); font-size: 22px; }
.check-cell b.ok, .check-row b.ok { color: var(--ok); }
.checker-actions { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
.check-list { margin-top: 10px; }
.check-row { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); padding: 9px 0; font-size: 12px; }
.measure-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); }
.measure-grid b { color: var(--text); margin-left: 6px; }

/* guide */
.article { padding-top: 30px; }
.crumbs { font: 700 10px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 22px; }
.crumbs a { color: var(--accent); }
.article-head h1 { font-family: var(--display); font-size: 50px; line-height: 1.03; letter-spacing: -.04em; margin: 0 0 12px; max-width: 760px; }
.byline { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 11px; margin-top: 14px; }
.byline .ico { width: 14px; height: 14px; color: var(--accent); }
.answer { margin: 26px 0; padding: 24px; border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line)); border-radius: var(--radius); background: var(--accent-soft); }
.answer-pct { font-family: var(--display); font-size: 68px; font-weight: 900; line-height: .95; letter-spacing: -.06em; color: var(--accent); margin: 0 0 8px; }
.answer p { max-width: 620px; margin: 0 0 14px; color: var(--text); }
.article h2 { font-family: var(--display); font-size: 28px; letter-spacing: -.02em; margin: 30px 0 12px; }
.steps { margin: 0 0 8px; padding-left: 22px; color: var(--muted); }
.steps li { margin-bottom: 10px; padding-left: 4px; }
.steps b { color: var(--text); }
.num-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px; }
.num-table th { text-align: left; font: 700 9px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--line2); padding: 8px 6px; }
.num-table td { border-bottom: 1px solid var(--line); padding: 10px 6px; }
.num-table td a { color: var(--accent); font-weight: 700; }
.inline-cta { display: inline-flex; align-items: center; gap: 6px; margin-top: 22px; color: var(--accent); font-weight: 800; font-size: 12px; letter-spacing: .04em; }

/* ---------- A overrides ---------- */
.d-a .surface { background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.012)); border-color: rgba(255,255,255,.1); backdrop-filter: blur(18px); }
.d-a .tool:hover { border-color: color-mix(in srgb, var(--accent) 35%, var(--line)); }
.d-a .hero h1 { font-weight: 800; }
.d-a .result { box-shadow: 0 22px 60px rgba(255,107,53,.22); }
.d-a .tool-layout .form { order: -1; }

/* ---------- B overrides ---------- */
.d-b .topbar { background: color-mix(in srgb, var(--bg) 96%, transparent); }
.d-b .nav { gap: 18px; font-weight: 500; }
.d-b .nav .on { color: var(--accent); }
.d-b .hero-b { padding: 66px 0 30px; border-bottom: 1px solid var(--line2); }
.d-b .hero h1 { font-family: var(--display); font-weight: 500; font-size: 56px; letter-spacing: -.03em; }
.d-b .eyebrow { color: var(--muted); }
.d-b .surface { box-shadow: none; border-radius: 0; border: 0; border-top: 1px solid var(--line2); background: transparent; padding: 22px 0 0; }
.d-b .tools-surface { border-top: 0; padding-top: 0; }
.d-b .tools { display: block; }
.d-b .tool { grid-template-columns: 42px 1fr 18px; border: 0; border-top: 1px solid var(--line); border-radius: 0; background: transparent; padding: 16px 0; align-items: center; }
.d-b .tool:hover { background: var(--accent-soft); }
.d-b .tool-num { font-family: var(--display); font-size: 24px; color: var(--accent); }
.d-b .tool-body b { font-family: var(--display); font-size: 22px; font-weight: 500; }
.d-b .tool-body span { font-size: 13px; }
.d-b .tool-arrow { color: var(--accent); }
.d-b .tool-arrow .ico { width: 16px; height: 16px; }
.d-b .trustline { border-top: 1px solid var(--line); padding-top: 12px; }
.d-b .tool-layout { display: block; }
.d-b .tool-layout .result { order: -1; }
.d-b .result-strip { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; background: transparent; color: var(--text); border-top: 2px solid var(--text); border-bottom: 1px solid var(--line2); border-radius: 0; padding: 16px 0; }
.d-b .result-strip .result-label { color: var(--muted); opacity: 1; }
.d-b .result-strip .result-pct { font-family: var(--display); font-weight: 500; font-size: 64px; color: var(--text); }
.d-b .result-strip .result-pair { color: var(--muted); opacity: 1; font-family: var(--font); font-weight: 500; text-transform: none; letter-spacing: 0; }
.d-b .strip-actions { display: flex; gap: 8px; align-items: center; padding-bottom: 4px; }
.d-b .btn { text-transform: none; letter-spacing: 0; font-size: 13px; border-radius: 2px; }
.d-b .btn-primary { background: var(--text); color: var(--bg); }
.d-b .btn-quiet { color: var(--muted); border-bottom: 1px solid var(--line2); border-radius: 0; }
.d-b .select { border: 0; border-bottom: 1px solid var(--line2); border-radius: 0; background: transparent; padding: 0 0 8px; font-family: var(--display); font-size: 22px; font-weight: 500; }
.d-b .seg { border: 0; border-bottom: 1px solid var(--line2); border-radius: 0; padding: 0; background: transparent; gap: 18px; }
.d-b .seg span { padding: 0 0 8px; border-radius: 0; }
.d-b .seg .on { background: transparent; color: var(--text); border-bottom: 2px solid var(--accent); }
.d-b .switch { width: 34px; height: 18px; }
.d-b .switch::after { width: 12px; height: 12px; }
.d-b .result .btn-primary { background: var(--text); color: var(--bg); }
.d-b .rail-grid a { border: 0; border-top: 1px solid var(--line); border-radius: 0; padding: 12px 0; }
.d-b .url-note { border: 0; border-bottom: 1px solid var(--line); border-radius: 0; padding: 10px 0; }
.d-b .viewer-stage { background: #ece7dd; color: var(--accent); border-color: var(--line2); }
.d-b .hud { background: #fffdf8cc; color: var(--text); border-color: var(--line); }
.d-b .stats { border-radius: 0; }
.d-b .stats div { background: transparent; }
.d-b .dropzone { background: transparent; border-color: var(--line2); }
.d-b .file-summary { border-radius: 0; }
.d-b .file-summary div { background: transparent; }
.d-b .format-grid { grid-template-columns: 1fr; gap: 0; }
.d-b .fmt { border: 0; border-top: 1px solid var(--line); border-radius: 0; background: transparent; padding: 11px 0; display: grid; grid-template-columns: 110px 1fr; gap: 10px; }
.d-b .fmt:last-child { border-bottom: 1px solid var(--line); }
.d-b .fmt.on { background: var(--accent-soft); border-color: var(--line); }
.d-b .verdict { border: 0; border-radius: 0; background: transparent; padding: 0 0 14px; border-bottom: 1px solid var(--line); }
.d-b .verdict-strip { border-top: 2px solid var(--ok); border-bottom: 1px solid var(--line); }
.d-b .verdict-title { font-family: var(--display); font-size: 40px; margin: 0; }
.d-b .details { margin-top: 14px; border-top: 1px solid var(--line); padding-top: 12px; }
.d-b .details summary { cursor: pointer; font-weight: 700; font-size: 13px; }
.d-b .check-grid { grid-template-columns: 1fr 1fr; }
.d-b .check-cell { border: 0; border-bottom: 1px solid var(--line); border-radius: 0; background: transparent; }
.d-b .article-head h1 { font-weight: 500; }
.d-b .answer-b { border: 0; border-top: 2px solid var(--text); border-bottom: 1px solid var(--line2); border-radius: 0; background: transparent; padding: 18px 0; }
.d-b .answer-b .answer-pct { font-weight: 500; font-size: 64px; }
.d-b .num-table th { border-bottom-color: var(--line2); }

/* ---------- C overrides ---------- */
.d-c .topbar { border-bottom: 2px solid var(--line); }
.d-c .nav { font-family: var(--display); font-weight: 800; text-transform: uppercase; letter-spacing: .04em; font-size: 12px; }
.d-c .nav .on { color: var(--accent); }
.d-c .hero-c { padding: 40px 0 24px; }
.d-c .hero h1 { font-family: var(--display); font-size: 76px; text-transform: uppercase; letter-spacing: -.045em; font-weight: 900; }
.d-c .hero-c .lede { font-size: 17px; color: var(--text); }
.d-c .btn { border-radius: 4px; text-transform: uppercase; letter-spacing: .08em; font-weight: 900; }
.d-c .surface { border: 2px solid var(--line); border-radius: 6px; }
.d-c .tools-c { margin-top: 14px; }
.d-c .tool-c { display: flex; flex-direction: column; min-height: 172px; padding: 18px; border: 2px solid var(--line); border-radius: 6px; background: var(--panel); }
.d-c .tool-c:hover { border-color: var(--accent); }
.d-c .tool-c .tool-icon { width: 38px; height: 38px; border-radius: 4px; }
.d-c .tool-verb { display: block; margin-top: auto; font-family: var(--display); font-size: 34px; font-weight: 900; text-transform: uppercase; letter-spacing: -.03em; line-height: 1; }
.d-c .tool-line { display: block; color: var(--muted); font-size: 12px; margin-top: 6px; }
.d-c .tool-cta { margin-top: 12px; grid-column: auto; color: var(--accent); }
.d-c .tool-layout { grid-template-columns: 1fr; gap: 14px; }
.d-c .tool-layout .result { order: -1; }
.d-c .result-c { border-radius: 4px; padding: 30px; background: var(--accent); }
.d-c .result-c .result-pct { font-size: 110px; letter-spacing: -.07em; }
.d-c .result-c .result-actions { margin-top: 14px; }
.d-c .result-c .btn-primary { background: #0a0a0b; color: #fff; }
.d-c .result-c .btn-ghost { border-color: #0a0a0b; color: #0a0a0b; }
.d-c .select { border: 2px solid var(--line); border-radius: 4px; font-family: var(--display); text-transform: uppercase; font-weight: 800; letter-spacing: .03em; }
.d-c .seg { border: 2px solid var(--line); border-radius: 4px; }
.d-c .seg .on { background: var(--accent); color: var(--accent-ink); }
.d-c .viewer-stage { border: 2px solid var(--line); border-radius: 4px; background: #050506; }
.d-c .hud { border-radius: 3px; border-color: var(--line2); font-weight: 700; }
.d-c .dropzone { border: 2px dashed var(--line2); border-radius: 4px; }
.d-c .fmt { border: 2px solid var(--line); border-radius: 4px; }
.d-c .fmt.on { border-color: var(--accent); background: var(--accent-soft); }
.d-c .verdict-c { display: grid; grid-template-columns: 220px 1fr; gap: 20px; align-items: center; border: 2px solid var(--ok); border-radius: 4px; padding: 24px; background: color-mix(in srgb, var(--ok) 6%, transparent); }
.d-c .verdict-big { font-family: var(--display); font-size: 84px; font-weight: 900; color: var(--ok); line-height: .9; letter-spacing: -.05em; }
.d-c .verdict-copy b { display: block; font-family: var(--display); font-size: 28px; text-transform: uppercase; }
.d-c .verdict-copy span { color: var(--muted); font-size: 12px; }
.d-c .check-cell { border: 2px solid var(--line); border-radius: 4px; }
.d-c .check-cell b { font-size: 30px; }
.d-c .answer-c { border-radius: 4px; background: var(--accent); color: var(--accent-ink); border: 0; }
.d-c .answer-c .eyebrow { color: var(--accent-ink); opacity: .7; }
.d-c .answer-c .answer-pct { color: var(--accent-ink); font-size: 110px; }
.d-c .answer-c p { color: var(--accent-ink); }
.d-c .answer-c .btn-primary { background: #0a0a0b; color: #fff; }
.d-c .article-head h1 { font-family: var(--display); text-transform: uppercase; font-weight: 900; }
.d-c .inline-cta { font-family: var(--display); text-transform: uppercase; font-weight: 900; }

/* ---------- phone ---------- */
.board.phone .mock .wrap { padding: 0 18px; }
.board.phone .mock .topbar { height: 54px; }
.board.phone .mock .nav, .board.phone .mock .support-link, .board.phone .mock .icon-btn { display: none; }
.board.phone .mock .menu-btn { display: inline-flex; }
.board.phone .mock .hero, .board.phone .mock .hero-b, .board.phone .mock .hero-c { padding: 24px 0 16px; }
.board.phone .mock .hero h1 { font-size: 34px; line-height: 1.05; }
.board.phone .mock .hero-c h1 { font-size: 46px; }
.board.phone .mock .lede { font-size: 14px; }
.board.phone .mock .tools, .board.phone .mock .tool-layout, .board.phone .mock .split, .board.phone .mock .rail-grid { grid-template-columns: 1fr; }
.board.phone .mock .tool-layout .result { order: -1; }
.board.phone .mock .surface { padding: 18px; border-radius: 16px; }
.board.phone .mock .d-b .surface, .board.phone .mock .surface { box-shadow: none; }
.board.phone .mock .result-pct { font-size: 62px; }
.board.phone .mock .result-c .result-pct { font-size: 82px; }
.board.phone .mock .hero-actions .btn { width: 100%; }
.board.phone .mock .tool { grid-template-columns: 38px 1fr; }
.board.phone .mock .tool-cta { grid-column: 2; }
.board.phone .mock .tool-c { grid-template-columns: 1fr; }
.board.phone .mock .viewer-stage { height: 330px; }
.board.phone .mock .wire { width: 280px; height: 280px; }
.board.phone .mock .stats { grid-template-columns: 1fr 1fr; }
.board.phone .mock .file-summary { grid-template-columns: 1fr 1fr; }
.board.phone .mock .check-grid { grid-template-columns: 1fr 1fr; }
.board.phone .mock .verdict { grid-template-columns: 1fr; }
.board.phone .mock .verdict .btn { width: 100%; }
.board.phone .mock .verdict-c { grid-template-columns: 1fr; }
.board.phone .mock .verdict-big { font-size: 64px; }
.board.phone .mock .result-strip { flex-direction: column; align-items: stretch; gap: 10px; }
.board.phone .mock .strip-actions { padding-bottom: 0; flex-wrap: wrap; }
.board.phone .mock .dropzone { padding: 20px 12px; }
.board.phone .mock .dropzone b { font-size: 20px; }
.board.phone .mock .article-head h1 { font-size: 34px; }
.board.phone .mock .answer-pct { font-size: 58px; }
.board.phone .mock .answer-c .answer-pct { font-size: 72px; }
.board.phone .mock .num-table { font-size: 11px; }
.board.phone .mock .num-table th:nth-child(3), .board.phone .mock .num-table td:nth-child(3) { display: none; }
.board.phone .mock .bottomnav { display: grid; grid-template-columns: repeat(5, 1fr); position: static; flex: 0 0 auto; z-index: 30; background: color-mix(in srgb, var(--bg) 96%, transparent); backdrop-filter: blur(14px); border-top: 1px solid var(--line); padding: 6px 4px calc(6px + env(safe-area-inset-bottom)); }
.board.phone .mock .bottomnav a { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 5px 0; color: var(--muted); font-size: 9px; font-weight: 700; }
.board.phone .mock .bottomnav a .ico { width: 18px; height: 18px; }
.board.phone .mock .bottomnav a.on { color: var(--accent); }
.board.phone .mock .nudge { left: 12px; right: 12px; bottom: 71px; padding: 10px 12px; }
.board.phone .mock .nudge p, .board.phone .mock .nudge > .btn { display: none; }
.board.phone .mock .nudge .nudge-row { align-items: center; }
.board.phone .mock .nudge b { font-size: 11px; }
.board.phone .mock .nudge .nudge-icon { width: 28px; height: 28px; }
"""


def main():
    cols = []
    for d in DIRS:
        cols.append(
            f"""
    <section class="col">
      <div class="col-head"><b>{d['name']}</b><span>{d['best']}</span></div>
      <div class="stage">{mock(d['id'])}</div>
    </section>"""
        )
    dir_cards = "".join(
        f"""
    <div class="dir-card"><b>{d['name']}</b><span>{d['tag']}</span><em>{d['best']}</em></div>"""
        for d in DIRS
    )
    html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>STLACCESS — Phase 2 mockups (A / B / C)</title>
<style>{CSS}</style>
</head>
<body>
<header class="board-head">
  <div class="kicker">Phase 2 · three directions · same screens · real data</div>
  <h1>STLACCESS, three ways.</h1>
  <p>Every panel uses the same numbers: 28mm → 32mm = <b>114.3%</b>, 32mm → 28mm = <b>87.5%</b>, demo file 41.2 × 28.6 × 28.0mm. Navigation is deliberately held constant so you compare look, calm and screen structure — not the Phase 3 IA.</p>
</header>
<div class="dir-grid">{dir_cards}</div>
<div class="pick"><div class="box"><b>My pick: A, with two borrowings.</b> The brand is already distinctive; the real problems are state, duplicate flows and mobile friction, not the palette. Keep A's orange/black identity and A1 Mini warmth, borrow B's summary strip (answer first, detail on demand) and C's oversized result. If you want the biggest visual departure, choose B. If you want the tools to feel like an instrument, choose C.</div></div>

<div class="toolbar">
  <div class="group"><span class="label">Screen</span>
    <button data-screen="home" class="on">Home</button>
    <button data-screen="inspector">Inspector</button>
    <button data-screen="viewer">Viewer</button>
    <button data-screen="converter">Converter</button>
    <button data-screen="checker">Checker</button>
    <button data-screen="guide">Guide</button>
  </div>
  <div class="group"><span class="label">Device</span>
    <button data-device="desktop" class="on">Desktop</button>
    <button data-device="phone">Phone</button>
  </div>
  <div class="group"><span class="label">View</span>
    <button data-fit="1" class="on">Fit</button>
    <button data-fit="0">100%</button>
  </div>
  <span class="hint">Scroll inside a column. The phone panel adds Home to the bottom bar and shows the result first.</span>
</div>

<main class="board desktop" id="board">
{''.join(cols)}
</main>

<script>
(function () {{
  var state = {{ screen: 'home', device: 'desktop', fit: true }};
  var board = document.getElementById('board');
  function apply() {{
    document.querySelectorAll('[data-screen]').forEach(function (el) {{
      if (el.classList.contains('screen')) el.hidden = el.getAttribute('data-screen') !== state.screen;
    }});
    board.classList.toggle('phone', state.device === 'phone');
    board.classList.toggle('desktop', state.device === 'desktop');
    var stage = board.querySelector('.stage');
    var fitZoom = stage ? Math.min(0.54, Math.max(0.3, (stage.clientWidth - 10) / 1080)) : 0.42;
    board.style.setProperty('--zoom', state.fit && state.device === 'desktop' ? String(fitZoom) : '1');
    document.querySelectorAll('[data-nudge]').forEach(function (n) {{ n.hidden = state.screen !== 'home'; }});
    var navMap = {{ home: 'home', inspector: 'inspector', viewer: 'viewer', converter: 'converter', checker: 'checker', guide: 'inspector' }};
    document.querySelectorAll('.mock .bottomnav a').forEach(function (a) {{
      a.classList.toggle('on', a.getAttribute('data-nav') === navMap[state.screen]);
    }});
    document.querySelectorAll('.toolbar [data-screen]').forEach(function (b) {{
      b.classList.toggle('on', b.getAttribute('data-screen') === state.screen);
    }});
    document.querySelectorAll('.toolbar [data-device]').forEach(function (b) {{
      b.classList.toggle('on', b.getAttribute('data-device') === state.device);
    }});
    document.querySelectorAll('.toolbar [data-fit]').forEach(function (b) {{
      b.classList.toggle('on', (b.getAttribute('data-fit') === '1') === state.fit);
    }});
  }}
  document.querySelectorAll('.toolbar [data-screen]').forEach(function (b) {{
    b.addEventListener('click', function () {{ state.screen = b.getAttribute('data-screen'); apply(); }});
  }});
  document.querySelectorAll('.toolbar [data-device]').forEach(function (b) {{
    b.addEventListener('click', function () {{ state.device = b.getAttribute('data-device'); apply(); }});
  }});
  document.querySelectorAll('.toolbar [data-fit]').forEach(function (b) {{
    b.addEventListener('click', function () {{ state.fit = b.getAttribute('data-fit') === '1'; apply(); }});
  }});
  apply();
}})();
</script>
</body>
</html>"""
    OUT.write_text(html, encoding="utf-8")
    print(f"wrote {OUT} ({len(html)} bytes)")


if __name__ == "__main__":
    main()
