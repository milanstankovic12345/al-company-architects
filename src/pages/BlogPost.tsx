import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { buildArticleJsonLd, formatPostDate, getPost } from "@/lib/blog";

/** Blog article — /saveti/:slug */
const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <NotFound />;

  return (
    <main>
      <Helmet>
        <title>{post.title} | AL Company</title>
        <meta name="description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(buildArticleJsonLd(post))}</script>
      </Helmet>
      <Navbar />
      <article className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-3xl">
          <Link to="/saveti" className="text-accent text-sm font-body hover:underline">
            ← Svi saveti
          </Link>
          <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mt-6 mb-4">{post.category}</p>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">{post.title}</h1>
          <p className="font-body text-xs text-muted-foreground mb-10">
            {formatPostDate(post.date)} · {post.readMinutes} min čitanja
          </p>
          <div className="prose prose-neutral max-w-none font-body prose-headings:font-heading prose-a:text-accent">
            <ReactMarkdown
              components={{
                a: ({ href = "", children }) =>
                  href.startsWith("/") ? (
                    <Link to={href}>{children}</Link>
                  ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
          <div className="border border-border bg-card p-6 mt-12">
            <h2 className="text-lg font-heading font-bold text-foreground mb-2">Treba vam stručan savet?</h2>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Javite nam se – rado ćemo vam pomoći pri izboru i izradi ponude.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-body">
              <Link to="/ponuda" className="text-accent hover:underline">Zatražite ponudu</Link>
              <Link to="/kontakt" className="text-accent hover:underline">Kontakt</Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default BlogPost;
