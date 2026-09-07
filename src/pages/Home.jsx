import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { businessesApi, leadersApi, newsApi, csrApi, statsApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";
import { PageLoader, PageError } from "../components/Feedback";

export default function Home() {
  const businessesFetcher = useCallback(() => businessesApi.list(), []);
  const leadersFetcher = useCallback(() => leadersApi.list(), []);
  const newsFetcher = useCallback(() => newsApi.list(), []);
  const csrFetcher = useCallback(() => csrApi.list(), []);
  const statsFetcher = useCallback(() => statsApi.listByGroup("home"), []);

  const { data: businesses, loading: bLoading, error: bError } = useFetch(businessesFetcher, []);
  const { data: leaders } = useFetch(leadersFetcher, []);
  const { data: news } = useFetch(newsFetcher, []);
  const { data: csrPrograms } = useFetch(csrFetcher, []);
  const { data: stats } = useFetch(statsFetcher, []);

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = useMemo(() => (businesses || []).slice(0, 5), [businesses]);

  useEffect(() => {
    if (!slides.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (bLoading) return <PageLoader label="Loading Kaysens Group…" />;
  if (bError || !slides.length) return <PageError message="We couldn't load the homepage content. Is the API running?" />;

  const currentSlide = slides[activeSlide % slides.length];
  const palettes = [
    "bg-cream border border-forest/10 text-forest",
    "bg-emerald/10 border border-emerald/20 text-emerald",
    "bg-cream border border-forest/10 text-forest",
    "bg-gold/15 border border-gold/30 text-[#9a7a3d]",
  ];

  return (
    <>
      {/* HERO — business carousel */}
      <section className="pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-b-[2rem] min-h-[360px] lg:min-h-[440px] ring-1 ring-black/5">
            <div
              key={currentSlide.slug}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(10, 42, 34, 0.94) 0%, rgba(10, 42, 34, 0.78) 40%, rgba(10, 42, 34, 0.35) 100%), url(${resolveImageUrl(currentSlide.image)})`,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(238,221,163,0.2),_transparent_55%)]" />

            <div className="relative z-10 flex h-full min-h-[360px] lg:min-h-[440px] flex-col justify-between p-8 lg:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-cream/20 bg-cream/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  {currentSlide.name}
                </span>
                <h1 className="mt-4 text-3xl lg:text-5xl font-semibold text-cream leading-[1.05] tracking-tight text-balance">
                  {currentSlide.tagline}
                </h1>
                <p className="mt-4 max-w-xl text-base lg:text-lg text-cream/80 leading-relaxed">
                  {currentSlide.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/businesses"
                    className="bg-gold text-forest px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gold/90 transition"
                  >
                    Explore Our Businesses <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-cream/25 text-cream px-6 py-3 rounded-full text-sm font-semibold hover:bg-cream/10 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.slug}
                      type="button"
                      aria-label={`Show ${slide.name} slide`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeSlide ? "w-8 bg-gold" : "w-2.5 bg-cream/45 hover:bg-cream/70"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSlide((c) => (c - 1 + slides.length) % slides.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition hover:bg-cream/20"
                    aria-label="Show previous business"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((c) => (c + 1) % slides.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition hover:bg-cream/20"
                    aria-label="Show next business"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!!stats?.length && (
          <div className="max-w-7xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {stats.map((s, i) => (
              <div key={s._id} className={`lg:col-span-3 p-3 rounded-3xl ring-1 ring-black/5 ${palettes[i % palettes.length]}`}>
                <div className="text-2xl lg:text-3xl font-semibold">{s.value}</div>
                <div className="text-sm text-forest/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 bg-forest">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            About Kaysens Group
          </span>
          <p className="mt-6 max-w-3xl text-2xl lg:text-3xl text-cream font-medium leading-snug text-pretty">
            We operate at the intersection of logistics, energy and hospitality — facilitating the
            movement of essential goods and services across the West African sub-region with a focus
            on sustainable, long-term growth.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-10 text-gold font-medium hover:gap-3 transition-all">
            Learn more about our story <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* BUSINESS PILLARS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Our Pillars</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-forest mt-3 tracking-tight">
                {businesses.length} businesses. One disciplined Group.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-forest/60">
              Strategic investments in Ghana's most critical sectors, driven by operational discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[520px]">
            {businesses[0] && (
              <Link
                to={`/businesses/${businesses[0].slug}`}
                className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl ring-1 ring-black/5 min-h-[300px]"
              >
                <img
                  src={resolveImageUrl(businesses[0].image)}
                  alt={businesses[0].name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-semibold text-cream mb-2">{businesses[0].name}</h3>
                  <p className="text-cream/80 text-sm max-w-[36ch] mb-4">{businesses[0].tagline}</p>
                  <span className="text-xs font-semibold text-gold flex items-center gap-1 uppercase tracking-wider">
                    View Details <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            )}

            {businesses.slice(1, 5).map((b) => (
              <Link
                key={b.slug}
                to={`/businesses/${b.slug}`}
                className="relative group overflow-hidden rounded-3xl ring-1 ring-black/5 min-h-[140px]"
              >
                <img
                  src={resolveImageUrl(b.image)}
                  alt={b.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/60 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-lg font-semibold text-cream mb-1">{b.name}</h3>
                  <p className="text-xs text-cream/80 max-w-[28ch]">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      {!!leaders?.length && (
        <section className="py-24 bg-muted/40 border-y border-forest/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Leadership</span>
              <h2 className="text-3xl font-semibold text-forest mt-3 tracking-tight">Guided by experience</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {leaders.map((p) => (
                <div key={p.slug} className="rounded-3xl ring-1 ring-black/5 bg-cream p-6 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-emerald/15 flex items-center justify-center text-emerald font-semibold">
                      {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-forest">{p.name}</p>
                      <p className="text-sm text-forest/60">{p.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-forest/70 leading-relaxed">{p.bio}</p>
                    {p.linkedin && (
                      <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald text-sm font-medium">
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              <div className="sm:col-span-2 lg:col-span-3 flex justify-center">
                <Link to="/about#leadership" className="inline-flex items-center gap-2 text-emerald font-medium hover:gap-3 transition-all">
                  View leadership team <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CSR */}
      {!!csrPrograms?.length && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-forest p-10 rounded-3xl text-cream ring-1 ring-black/5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Corporate Social Responsibility
            </span>
            <h2 className="text-3xl font-semibold mt-3 mb-4 tracking-tight">Investing where we operate</h2>
            <p className="text-cream/70 text-sm mb-8 leading-relaxed">
              Blood donation, education and community support programmes across the Greater Accra and Ashanti regions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {csrPrograms.map((p) => (
                <div key={p._id} className="aspect-square rounded-2xl overflow-hidden ring-1 ring-cream/10">
                  <img src={resolveImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <Link to="/csr" className="inline-flex items-center gap-2 mt-8 text-gold font-medium hover:gap-3 transition-all">
              Read more <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* NEWS */}
      {!!news?.length && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Latest Awards</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-forest mt-3 tracking-tight">From the Group</h2>
              </div>
              <Link to="/news" className="text-sm font-medium text-forest/70 hover:text-emerald inline-flex items-center gap-2">
                View all awards <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.slice(0, 3).map((n) => (
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
                    {new Date(n.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                  </time>
                  <h3 className="text-lg font-semibold text-forest mt-2 group-hover:text-emerald transition-colors">
                    {n.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
