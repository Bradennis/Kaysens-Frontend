import { useCallback } from "react";
import { Link } from "react-router-dom";
import { PageHero, Container } from "../components/Section";
import { PageLoader, PageError, EmptyState } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { newsApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function NewsIndex() {
  const fetcher = useCallback(() => newsApi.list(), []);
  const { data: news, loading, error, reload } = useFetch(fetcher, []);

  if (loading) return <PageLoader label="Loading awards & media…" />;
  if (error) return <PageError message="We couldn't load this page." onRetry={reload} />;

  return (
    <>
      <PageHero
        eyebrow="Awards & Media"
        title="Recognitions from across the Group."
        description="Announcements, milestones and stories from Kaysens Group and its operating subsidiaries."
      />
      <section className="py-20">
        <Container>
          {!news?.length ? (
            <EmptyState message="No articles have been published yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((n) => (
                <Link key={n.slug} to={`/news/${n.slug}`} className="group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 ring-1 ring-black/5">
                    <img
                      src={resolveImageUrl(n.image)}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <time className="text-xs text-forest/40 font-medium uppercase tracking-wider">
                    {formatDate(n.date)}
                  </time>
                  <h3 className="text-lg font-semibold text-forest mt-2 group-hover:text-emerald">{n.title}</h3>
                  <p className="text-sm text-forest/60 mt-2 leading-relaxed">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
