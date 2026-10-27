export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readMinutes: number;
  body: string;
}

const SITE_URL = "https://al-company.vercel.app";

/** Splits `---` frontmatter (flat `key: value` lines) from the markdown body. */
export const parsePost = (slug: string, raw: string): BlogPost => {
  const match = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = match ? match[2] : raw;
  if (match) {
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? "",
    category: meta.category ?? "",
    readMinutes: Number(meta.readMinutes) || 3,
    body: body.trim(),
  };
};

const files = import.meta.glob("/src/content/saveti/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const sortPosts = (posts: BlogPost[]) => [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPosts = (): BlogPost[] =>
  sortPosts(
    Object.entries(files).map(([path, raw]) => parsePost(path.split("/").pop()!.replace(/\.md$/, ""), raw)),
  );

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const buildArticleJsonLd = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  mainEntityOfPage: `${SITE_URL}/saveti/${post.slug}`,
  author: { "@type": "Organization", name: "AL Company" },
  publisher: { "@type": "Organization", name: "AL Company" },
});

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sr-Latn-RS", { day: "numeric", month: "long", year: "numeric" });
