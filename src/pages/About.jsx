import { useCallback } from "react";
import { Link } from "react-router-dom";
import { PageHero, Container, SectionHeading } from "../components/Section";
import { PageLoader, PageError } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { businessesApi, leadersApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function About() {
  const businessesFetcher = useCallback(() => businessesApi.list(), []);
  const leadersFetcher = useCallback(() => leadersApi.list(), []);
  const { data: businesses, loading: bLoading, error: bError } = useFetch(businessesFetcher, []);
  const { data: leaders } = useFetch(leadersFetcher, []);

  if (bLoading) return <PageLoader label="Loading About page…" />;
  if (bError) return <PageError message="We couldn't load this page." />;

  const heroImage = businesses?.[0]?.image ? resolveImageUrl(businesses[0].image) : undefined;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A Ghanaian Group, built for the long term."
        description="From a single distribution office in Tema to a diversified conglomerate, Kaysens Group has been quietly building value across the sectors that move our economy."
        image={heroImage}
      />

      <section id="about-us" className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Our Story" title="Three decades of disciplined growth." />
            </div>
            <div className="lg:col-span-7 space-y-5 text-forest/70 leading-relaxed">
              <p>
                Founded in Accra, Kaysens Group began as a small FMCG trading operation serving
                retailers across the Greater Accra region. With a reputation for reliability and a
                relentless focus on operational discipline, the Group steadily expanded into
                distribution, hospitality, energy and selective strategic investments.
              </p>
              <p>
                Today, Kaysens Group employs more than 500 people, partners with hundreds of global
                and regional brands, and operates across more than twenty sites nationwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="vision" className="py-20 bg-muted/40 border-y border-forest/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream p-10 rounded-3xl ring-1 ring-black/5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Vision</span>
              <p className="mt-5 text-2xl font-semibold text-forest leading-snug text-pretty">
                To be West Africa's most trusted diversified group — known for excellence, integrity
                and the lasting value we create.
              </p>
            </div>
            <div className="bg-forest text-cream p-10 rounded-3xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Mission</span>
              <p className="mt-5 text-2xl font-semibold leading-snug text-pretty">
                Build disciplined, customer-first businesses that improve daily life and invest in
                the communities we serve.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Group Structure" title="One Group. Multiple pillars." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {(businesses || []).map((b) => (
              <Link
                key={b.slug}
                to={`/businesses/${b.slug}`}
                className="group rounded-2xl ring-1 ring-black/5 overflow-hidden bg-cream"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={resolveImageUrl(b.image)}
                    alt={b.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-forest">{b.name}</h3>
                  <p className="text-sm text-forest/60 mt-1">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="leadership" className="py-24 bg-forest">
        <Container>
          <div className="text-cream">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Leadership Team</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3 tracking-tight">The people leading the Group</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(leaders || []).map((p) => (
              <div key={p.slug} className="bg-cream/5 backdrop-blur p-6 rounded-2xl ring-1 ring-cream/10">
                <div className="size-16 rounded-full bg-gold/20 text-gold flex items-center justify-center text-xl font-semibold">
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-cream">{p.name}</h3>
                <p className="text-sm text-gold mt-0.5">{p.role}</p>
                <p className="text-sm text-cream/60 mt-3 leading-relaxed">{p.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
