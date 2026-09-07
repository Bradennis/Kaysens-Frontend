import { useCallback } from "react";
import { PageHero, Container } from "../components/Section";
import { PageLoader, PageError, EmptyState } from "../components/Feedback";
import { useFetch } from "../hooks/useFetch";
import { galleryApi } from "../api/resources";
import { resolveImageUrl } from "../api/client";

export default function ResourcesGallery() {
  const fetcher = useCallback(() => galleryApi.list(), []);
  const { data: images, loading, error, reload } = useFetch(fetcher, []);

  if (loading) return <PageLoader label="Loading gallery…" />;
  if (error) return <PageError message="We couldn't load this page." onRetry={reload} />;

  return (
    <>
      <PageHero eyebrow="Resources · Image Gallery" title="A visual record of the Group." />
      <section className="py-20">
        <Container>
          {!images?.length ? (
            <EmptyState message="No images have been published yet." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
              {images.map((img) => (
                <div key={img._id} className={`overflow-hidden rounded-2xl ring-1 ring-black/5 ${img.span || ""}`}>
                  <img
                    src={resolveImageUrl(img.image)}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
