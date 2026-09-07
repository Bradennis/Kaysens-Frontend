import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero, Container, SectionHeading } from "../components/Section";
import { PageLoader, PageError } from "../components/Feedback";
import { Icon } from "../components/IconRegistry";
import { useFetch } from "../hooks/useFetch";
import { businessesApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function BusinessDetail() {
  const { slug } = useParams();
  const fetcher = useCallback(() => businessesApi.getBySlug(slug), [slug]);
  const { data: biz, loading, error } = useFetch(fetcher, [slug]);

  if (loading) return <PageLoader label="Loading business…" />;
  if (error || !biz) {
    return (
      <Container className="py-32 text-center">
        <h1 className="text-3xl font-semibold text-forest">Business not found</h1>
        <Link to="/businesses" className="mt-6 inline-block text-emerald">
          Back to businesses
        </Link>
      </Container>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Kaysens Businesses"
        title={biz.name}
        description={biz.tagline}
        image={resolveImageUrl(biz.image)}
      />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Overview" title={`About ${biz.short}`} />
            </div>
            <div className="lg:col-span-7 space-y-5 text-forest/70 leading-relaxed">
              <p className="text-lg">{biz.description}</p>
              <p>
                We invest in people, systems and partnerships that scale responsibly,
                consistently delivering on the promises we make to customers, partners and the
                communities we operate in.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {biz.category === "distribution" && <DistributionSections biz={biz} />}
      {biz.category === "hotel" && <HotelSections biz={biz} />}
      {biz.category === "energy" && <EnergySections biz={biz} />}
      {biz.category === "ventures" && <VenturesSections biz={biz} />}

      <section className="py-20 bg-forest text-cream">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-semibold max-w-xl">
              Interested in partnering with us?
            </h3>
            <Link
              to="/contact"
              className="self-start bg-gold text-forest px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 hover:bg-gold/90"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function DistributionSections({ biz }) {
  const brands = biz.brands?.length ? biz.brands : [];
  const features = biz.features?.length ? biz.features : [];

  return (
    <>
      {!!brands.length && (
        <section className="py-20 bg-muted/40 border-y border-forest/5">
          <Container>
            <SectionHeading eyebrow="Brands" title="Brands we distribute" />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {brands.map((b) => (
                <div
                  key={b}
                  className="aspect-[3/1] bg-cream rounded-2xl ring-1 ring-black/5 flex items-center justify-center text-forest font-semibold tracking-tight"
                >
                  {b}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {!!features.length && (
        <section className="py-20">
          <Container>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="p-7 bg-cream rounded-3xl ring-1 ring-black/5">
                  <div className="size-11 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center">
                    <Icon name={f.icon} size={20} />
                  </div>
                  <h3 className="mt-5 font-semibold text-forest">{f.title}</h3>
                  <p className="text-sm text-forest/60 mt-2 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 bg-muted/40 border-y border-forest/5">
        <Container>
          <SectionHeading eyebrow="Coverage" title="Coverage across Ghana" />
          <div className="mt-10 aspect-[16/8] rounded-3xl bg-forest/5 ring-1 ring-black/5 flex items-center justify-center text-forest/40">
            Interactive coverage map (placeholder)
          </div>
        </Container>
      </section>
    </>
  );
}

function HotelSections({ biz }) {
  const rooms = biz.rooms?.length ? biz.rooms : [];
  const amenities = biz.amenities?.length ? biz.amenities : [];

  return (
    <>
      {!!rooms.length && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Rooms & Suites" title="Spaces for every stay" />
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {rooms.map((r) => (
                <div key={r.name} className="bg-cream rounded-3xl ring-1 ring-black/5 overflow-hidden">
                  <img
                    src={resolveImageUrl(r.image)}
                    alt={r.name}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-forest">{r.name}</h3>
                    <p className="text-sm text-forest/60 mt-1">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {!!amenities.length && (
        <section className="py-20 bg-muted/40 border-y border-forest/5">
          <Container>
            <SectionHeading eyebrow="Amenities" title="Every detail considered" />
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenities.map((a) => (
                <div
                  key={a.label}
                  className="p-6 bg-cream rounded-2xl ring-1 ring-black/5 flex items-center gap-3"
                >
                  <div className="size-10 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center">
                    <Icon name={a.icon} size={18} />
                  </div>
                  <span className="font-medium text-forest">{a.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Location" title="Easy to find. Hard to leave." />
          <div className="mt-10 aspect-[16/7] rounded-3xl bg-forest/5 ring-1 ring-black/5 flex items-center justify-center text-forest/40">
            Map placeholder
          </div>
        </Container>
      </section>
    </>
  );
}

function EnergySections({ biz }) {
  const products = biz.products?.length ? biz.products : [];
  const safetyPoints = biz.safetyPoints?.length ? biz.safetyPoints : [];

  return (
    <>
      {!!products.length && (
        <section className="py-20 bg-muted/40 border-y border-forest/5">
          <Container>
            <SectionHeading eyebrow="Products" title="What we sell" />
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.title} className="p-7 bg-cream rounded-3xl ring-1 ring-black/5">
                  <h3 className="text-lg font-semibold text-forest">{p.title}</h3>
                  <p className="text-sm text-forest/60 mt-2">{p.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
      {!!safetyPoints.length && (
        <section className="py-20">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <SectionHeading
                eyebrow="Safety"
                title="Safety standards we take seriously."
                description="Every Kaysens forecourt is built and operated to international safety standards, with regular audits, certified technicians and modern fire-suppression systems."
              />
              <ul className="space-y-4 text-forest/70">
                {safetyPoints.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-gold">●</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function VenturesSections({ biz }) {
  const ventures = biz.ventures?.length ? biz.ventures : [];
  if (!ventures.length) return null;

  return (
    <section className="py-20 bg-muted/40 border-y border-forest/5">
      <Container>
        <SectionHeading eyebrow="Portfolio" title="Where we invest" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {ventures.map((v) => (
            <div key={v.title} className="p-7 bg-cream rounded-3xl ring-1 ring-black/5">
              <h3 className="font-semibold text-forest text-lg">{v.title}</h3>
              <p className="text-sm text-forest/60 mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
