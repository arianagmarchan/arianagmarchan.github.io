import type { Photo } from "@/lib/content";

/**
 * Renders the photos listed for a project or interest. Shows nothing until some are added.
 * `heading={false}` drops the "Photos" title, for use inside a card.
 */
export function PhotoGallery({ photos, heading = "Photos", className = "mt-14" }: { photos: Photo[]; heading?: string | false; className?: string }) {
  if (photos.length === 0) return null;
  return (
    <section aria-label={heading || "Photos"} className={className}>
      {heading && <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>}
      <div className={`${heading ? "mt-5" : ""} grid gap-6 sm:grid-cols-2`}>
        {photos.map((photo, i) => (
          <figure key={photo.src} className={photos.length % 2 === 1 && i === 0 ? "sm:col-span-2" : undefined}>
            <img src={photo.src} alt={photo.alt} className="w-full rounded-xl object-cover ring-1 ring-white/10" />
            {photo.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
