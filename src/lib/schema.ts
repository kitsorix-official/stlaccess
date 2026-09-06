// src/lib/schema.ts
// Builders for schema.org JSON-LD nodes shared across the site.

export const SITE_URL = "https://stlaccess.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const AUTHOR_URL = "https://github.com/kitsorix-official";
export const LOGO_URL = `${SITE_URL}/pwa-512x512.png`;
export const IMAGE_URL = `${SITE_URL}/pwa-512x512.png`;

export function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "STLACCESS",
    url: SITE_URL,
    description:
      "STL scale converter for 3D printed miniatures. Exact slicer percentages for every tabletop scale, from 6mm epic to 32mm heroic and beyond — tested on a Bambu Lab A1 Mini.",
    logo: LOGO_URL,
    image: IMAGE_URL,
    founder: { "@id": PERSON_ID },
  };
}

export function person() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "kitsorix",
    url: AUTHOR_URL,
    sameAs: [AUTHOR_URL],
    jobTitle: "3D Printing Hobbyist",
  };
}

export function webSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "STLACCESS",
    url: SITE_URL,
    description:
      "STL scale converter for 3D printed miniatures. Exact slicer percentages for every tabletop scale, from 6mm epic to 32mm heroic and beyond — tested on a Bambu Lab A1 Mini.",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/reference?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumb(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface SoftwareAppOptions {
  name: string;
  description: string;
  url: string;
}

export function softwareApplication({ name, description, url }: SoftwareAppOptions) {
  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  url?: string;
}

export function faqPage(items: FaqItem[], pageUrl?: string) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item, i) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      answerCount: 1,
      datePublished: new Date().toISOString().split("T")[0],
      ...(item.url || pageUrl ? { url: item.url || `${SITE_URL}${pageUrl}#qa-${i}` } : {}),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
        datePublished: new Date().toISOString().split("T")[0],
        upvoteCount: 0,
        author: {
          "@type": "Person",
          name: "kitsorix",
          url: AUTHOR_URL,
        },
        url: item.url || (pageUrl ? `${SITE_URL}${pageUrl}#qa-${i}` : undefined),
      },
    })),
  };
}

export interface ArticleOptions {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  keywords?: string[];
}

export function article({ title, description, url, datePublished, dateModified, image, keywords }: ArticleOptions) {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified,
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
    image: image || IMAGE_URL,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE_URL}${url}`,
  };
}

export interface ItemListEntry {
  type: string;
  name: string;
  url: string;
  description?: string;
  datePublished?: string;
}

export function itemList(entries: ItemListEntry[]) {
  return {
    "@type": "ItemList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": entry.type,
        name: entry.name,
        url: `${SITE_URL}${entry.url}`,
        ...(entry.description ? { description: entry.description } : {}),
        ...(entry.datePublished ? { datePublished: entry.datePublished } : {}),
      },
    })),
  };
}

export interface WebPageOptions {
  type?: string;
  name: string;
  description: string;
  url: string;
  mainEntity?: string;
}

export function webPage({ type = "WebPage", name, description, url, mainEntity }: WebPageOptions) {
  return {
    "@type": type,
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: { "@id": SITE_URL },
    ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function single(node: Record<string, unknown>) {
  return {
    "@context": "https://schema.org",
    ...node,
  };
}
