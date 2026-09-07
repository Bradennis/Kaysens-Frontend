import { Link } from "react-router-dom";
import { ArrowUpRight, Play, Image as ImageIcon, Award } from "lucide-react";
import { PageHero, Container } from "../components/Section";

const cards = [
  {
    to: "/resources/videos",
    title: "Videos",
    desc: "Brand films, behind-the-scenes and event recordings.",
    icon: Play,
  },
  {
    to: "/resources/gallery",
    title: "Image Gallery",
    desc: "Photography from across our operations and events.",
    icon: ImageIcon,
  },
  {
    to: "/resources/news",
    title: "News",
    desc: "Latest announcements and stories from across the Group.",
    icon: Award,
  },
];

export default function ResourcesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Media from across the Group."
        description="Videos, photography and news stories that tell the Kaysens Group story."
      />
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group p-8 bg-cream rounded-3xl ring-1 ring-black/5 hover:bg-forest hover:text-cream transition-colors min-h-[260px] flex flex-col justify-between"
              >
                <div className="size-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                  <c.icon size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mt-6">{c.title}</h3>
                  <p className="text-sm mt-2 text-forest/60 group-hover:text-cream/70">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-emerald group-hover:text-gold">
                    Explore <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
