import { useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container } from "../components/Section";
import { PageLoader } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { newsApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function NewsDetail() {
  const { slug } = useParams();
  const articleFetcher = useCallback(() => newsApi.getBySlug(slug), [slug]);
  const allFetcher = useCallback(() => newsApi.list(), []);
  const { data: article, loading, error } = useFetch(articleFetcher, [slug]);
  const { data: allNews } = useFetch(allFetcher, []);

  const related = useMemo(
    () => (allNews || []).filter((n) => n.slug !== slug).slice(0, 2),
    [allNews, slug],
  );

  if (loading) return <PageLoader label="Loading article…" />;

  if (error || !article) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-3xl font-semibold text-forest">Article not found</h1>
        <Link to="/news" className="mt-6 inline-block text-emerald">
          Back to awards
        </Link>
      </Container>
    );
  }

  return (
    <article>
      <div className="bg-forest text-cream">
        <Container className="py-20">
          <Link to="/news" className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-8">
            <ArrowLeft size={16} /> All awards
          </Link>
          <time className="text-[11px] uppercase tracking-[0.25em] text-gold">{formatDate(article.date)}</time>
          <h1 className="text-3xl md:text-5xl font-semibold mt-4 max-w-3xl tracking-tight text-balance">
            {article.title}
          </h1>
        </Container>
      </div>

      <Container className="py-16">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden ring-1 ring-black/5 mb-12">
          <img src={resolveImageUrl(article.image)} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-2xl mx-auto space-y-5 text-forest/80 text-lg leading-relaxed">
          <p className="text-xl text-forest font-medium">{article.excerpt}</p>
          <p>{article.body}</p>
          <p>For media enquiries, please contact our communications team at press@kaysensgroup.com.</p>
        </div>
      </Container>

      {!!related.length && (
        <section className="py-20 bg-muted/40 border-t border-forest/5">
          <Container>
            <h2 className="text-2xl font-semibold text-forest mb-8">Related Awards</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((n) => (
                <Link key={n.slug} to={`/news/${n.slug}`} className="group">
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-black/5 mb-4">
                    <img
                      src={resolveImageUrl(n.image)}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <time className="text-xs text-forest/40 uppercase tracking-wider">{formatDate(n.date)}</time>
                  <h3 className="text-lg font-semibold text-forest mt-1 group-hover:text-emerald">{n.title}</h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
