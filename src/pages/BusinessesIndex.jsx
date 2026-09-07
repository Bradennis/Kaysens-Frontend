import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Container } from "../components/Section";
import { PageLoader, PageError, EmptyState } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { businessesApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function BusinessesIndex() {
  const fetcher = useCallback(() => businessesApi.list(), []);
  const { data: businesses, loading, error, reload } = useFetch(fetcher, []);

  if (loading) return <PageLoader label="Loading our businesses…" />;
  if (error) return <PageError message="We couldn't load our businesses." onRetry={reload} />;

  return (
    <>
      <PageHero
        eyebrow="Our Businesses"
        title="Multiple pillars. One disciplined Group."
        description="Kaysens Group operates across the sectors that move the Ghanaian economy forward. Each business is led by a dedicated team with deep sector expertise."
      />
      <section className="py-20">
        <Container>
          {!businesses?.length ? (
            <EmptyState message="No businesses have been published yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses.map((b) => (
                <Link
                  key={b.slug}
                  to={`/businesses/${b.slug}`}
                  className="group relative overflow-hidden rounded-3xl ring-1 ring-black/5 bg-forest min-h-[360px] block"
                >
                  <img
                    src={resolveImageUrl(b.image)}
                    alt={b.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-semibold text-cream">{b.name}</h3>
                    <p className="text-cream/80 mt-2 max-w-md">{b.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider">
                      View details <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
