import type { Photo } from "@/lib/content";

/** Renders the photos listed for a project or interest. Shows nothing until some are added. */
export function PhotoGallery({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  return (
    <section aria-label="Photos" className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">Photos</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        {photos.map((photo, i) => (
          <figure key={photo.src} className={photos.length % 2 === 1 && i === 0 ? "sm:col-span-2" : undefined}>
            <img src={photo.src} alt={photo.alt} className="w-full rounded-sm object-cover" />
            {photo.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
