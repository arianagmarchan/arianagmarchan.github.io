import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site-chrome";
import { PhotoGallery } from "@/components/photo-gallery";
import { interests } from "@/lib/content";

export function generateStaticParams() {
  return interests.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/interests/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: interests.find((i) => i.slug === slug)?.name ?? "Interest" };
}

export default async function InterestPage(props: PageProps<"/interests/[slug]">) {
  const { slug } = await props.params;
  const index = interests.findIndex((i) => i.slug === slug);
  if (index < 0) notFound();
  const interest = interests[index];
  const next = interests[(index + 1) % interests.length];

  return (
    <PageShell title={interest.name} intro={interest.blurb} back={{ href: "/interests", label: "Back to the belt" }}>
      <div className="grid gap-10 sm:grid-cols-[1fr_180px]">
        <div className="space-y-5 text-lg leading-relaxed">
          {interest.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <img src={interest.plate} alt="" className="order-first w-40 sm:order-none sm:w-full" />
      </div>

      <ul className="mt-10 flex flex-wrap gap-2">
        {interest.details.map((d, i) => (
          <li key={d + i} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">{d}</li>
        ))}
      </ul>

      <PhotoGallery photos={interest.photos} />

      <div className="mt-16 border-t border-border pt-6">
        <Link href={`/interests/${next.slug}`} className="group inline-block">
          <span className="block text-sm text-muted-foreground">Next plate</span>
          <span className="mt-1 block text-xl font-semibold tracking-tight group-hover:text-brand">{next.name} →</span>
        </Link>
      </div>
    </PageShell>
  );
}
