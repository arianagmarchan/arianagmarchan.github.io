import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site-chrome";
import { PhotoGallery } from "@/components/photo-gallery";
import { RecordPlayer } from "@/components/record-player";
import { interests } from "@/lib/content";

export function generateStaticParams() {
  return interests.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/interests/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: interests.find((i) => i.slug === slug)?.name ?? "Interest" };
}

const chip = {
  brand: "border-brand/40 text-brand bg-brand/10",
  sky: "border-sky/40 text-sky bg-sky/10",
  rose: "border-rose/40 text-rose bg-rose/10",
  mint: "border-[#5fe3b0]/40 text-[#5fe3b0] bg-[#5fe3b0]/10",
};

export default async function InterestPage(props: PageProps<"/interests/[slug]">) {
  const { slug } = await props.params;
  const index = interests.findIndex((i) => i.slug === slug);
  if (index < 0) notFound();
  const interest = interests[index];
  const next = interests[(index + 1) % interests.length];

  return (
    <PageShell
      title={interest.name}
      intro={interest.blurb}
      back={{ href: "/interests/", label: "Back to the belt" }}
      tint={interest.color === "sky" || interest.color === "mint" ? "cool" : "warm"}
    >
      {interest.track ? (
        <RecordPlayer track={interest.track} record={interest.plate} />
      ) : null}

      <div className={`grid gap-10 ${interest.track ? "mt-12" : "sm:grid-cols-[1fr_190px]"}`}>
        <div className="space-y-5 text-lg leading-relaxed text-white/85">
          {interest.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        {!interest.track && (
          <img src={interest.plate} alt="" className="order-first w-40 drop-shadow-[0_20px_40px_rgb(0_0_0/0.6)] sm:order-none sm:w-full" />
        )}
      </div>

      <ul className="mt-10 flex flex-wrap gap-2">
        {interest.details.map((d, i) => (
          <li key={d + i} className={`rounded-full border px-3 py-1 text-sm ${chip[interest.color]}`}>{d}</li>
        ))}
      </ul>

      <PhotoGallery photos={interest.photos} />

      <div className="mt-16">
        <div className="rail" />
        <Link href={`/interests/${next.slug}/`} className="group mt-6 flex items-center gap-4">
          <img src={next.plate} alt="" className="size-14 rounded-full transition-transform duration-500 group-hover:rotate-45" />
          <span>
            <span className="block text-sm text-muted-foreground">Next plate</span>
            <span className="block font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-brand">{next.name} →</span>
          </span>
        </Link>
      </div>
    </PageShell>
  );
}
