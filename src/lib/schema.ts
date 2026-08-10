// src/lib/schema.ts
// Builders for schema.org JSON-LD nodes shared across the site.

export const SITE_URL = "https://stlaccess.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const AUTHOR_URL = "https://github.com/kitsorix-official";
export const LOGO_URL = `${SITE_URL}/favicon.svg`;
export const IMAGE_URL = `${SITE_URL}/og-image.svg`;

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
}

export function faqPage(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: stripHtml(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.answer),
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
}

export function article({ title, description, url, datePublished, dateModified, image }: ArticleOptions) {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified,
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
}

export function webPage({ type = "WebPage", name, description, url }: WebPageOptions) {
  return {
    "@type": type,
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: { "@id": SITE_URL },
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
