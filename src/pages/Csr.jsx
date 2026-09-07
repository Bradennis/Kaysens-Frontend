import { useCallback } from "react";
import { PageHero, Container, SectionHeading } from "../components/Section";
import { PageLoader, PageError, EmptyState } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { csrApi, statsApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function Csr() {
  const csrFetcher = useCallback(() => csrApi.list(), []);
  const statsFetcher = useCallback(() => statsApi.listByGroup("csr"), []);
  const { data: programs, loading, error, reload } = useFetch(csrFetcher, []);
  const { data: impact } = useFetch(statsFetcher, []);

  if (loading) return <PageLoader label="Loading CSR programmes…" />;
  if (error) return <PageError message="We couldn't load this page." onRetry={reload} />;

  return (
    <>
      <PageHero
        eyebrow="Corporate Social Responsibility"
        title="Investing in the communities we operate in."
        description="Our CSR work focuses on the areas where we believe Kaysens Group can make a meaningful, lasting difference."
      />

      <section className="py-20">
        <Container>
          {!programs?.length ? (
            <EmptyState message="No CSR programmes have been published yet." />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <article key={p._id} className="bg-cream rounded-3xl ring-1 ring-black/5 overflow-hidden">
                  <img
                    src={resolveImageUrl(p.image)}
                    alt={p.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-7">
                    <h3 className="text-xl font-semibold text-forest">{p.title}</h3>
                    <p className="text-sm text-forest/60 mt-3 leading-relaxed">{p.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      {!!impact?.length && (
        <section className="py-20 bg-forest text-cream">
          <Container>
            <SectionHeading eyebrow="Impact" title="Measurable outcomes" />
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {impact.map((i) => (
                <div key={i._id} className="p-6 bg-cream/5 rounded-2xl ring-1 ring-cream/10">
                  <div className="text-3xl font-semibold text-gold">{i.value}</div>
                  <div className="text-sm text-cream/60 mt-1">{i.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {!!programs?.length && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Gallery" title="Moments from the field" />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
              {programs.concat(programs).map((p, i) => (
                <div key={`${p._id}-${i}`} className="aspect-square rounded-2xl overflow-hidden ring-1 ring-black/5">
                  <img src={resolveImageUrl(p.image)} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
