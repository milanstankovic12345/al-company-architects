import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatPostDate, getPosts } from "@/lib/blog";

/** Blog list — /saveti */
const Blog = () => {
  const posts = getPosts();
  return (
    <main>
      <Helmet>
        <title>Saveti | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta
          name="description"
          content="Saveti za izbor PVC i aluminijumske stolarije, energetsku efikasnost i subvencije – AL Company Valjevo."
        />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Blog</p>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Saveti</h1>
          <p className="font-body text-muted-foreground max-w-xl mb-10">
            Praktični saveti za izbor stolarije, uštedu energije i subvencije.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/saveti/${post.slug}`}
                className="group border border-border bg-card p-6 flex flex-col hover:border-accent transition-colors"
              >
                <p className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-3">{post.category}</p>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="font-body text-sm text-muted-foreground mb-4 flex-1">{post.description}</p>
                <p className="font-body text-xs text-muted-foreground">
                  {formatPostDate(post.date)} · {post.readMinutes} min čitanja
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
