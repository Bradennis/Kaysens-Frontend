import { useCallback } from "react";
import { Play } from "lucide-react";
import { PageHero, Container } from "../components/Section";
import { PageLoader, PageError, EmptyState } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { videosApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function ResourcesVideos() {
  const fetcher = useCallback(() => videosApi.list(), []);
  const { data: videos, loading, error, reload } = useFetch(fetcher, []);

  if (loading) return <PageLoader label="Loading videos…" />;
  if (error) return <PageError message="We couldn't load this page." onRetry={reload} />;

  return (
    <>
      <PageHero eyebrow="Resources · Videos" title="Watch Kaysens Group in motion." />
      <section className="py-20">
        <Container>
          {!videos?.length ? (
            <EmptyState message="No videos have been published yet." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <a
                  key={v._id}
                  href={v.url || "#"}
                  target={v.url ? "_blank" : undefined}
                  rel={v.url ? "noopener noreferrer" : undefined}
                  className="text-left group block"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-black/5 relative">
                    <img
                      src={resolveImageUrl(v.poster)}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-forest/30 group-hover:bg-forest/20 transition-colors flex items-center justify-center">
                      <div className="size-14 rounded-full bg-cream/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-forest ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {v.duration && (
                      <span className="absolute bottom-3 right-3 bg-forest/80 text-cream text-xs font-medium px-2 py-1 rounded">
                        {v.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold text-forest group-hover:text-emerald">{v.title}</h3>
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
