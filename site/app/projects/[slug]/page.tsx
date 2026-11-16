import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site-chrome";
import { PhotoGallery } from "@/components/photo-gallery";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Project" };
}

const chips = [
  "border-sky/40 bg-sky/10 text-sky",
  "border-brand/40 bg-brand/10 text-brand",
  "border-rose/40 bg-rose/10 text-rose",
  "border-[#5fe3b0]/40 bg-[#5fe3b0]/10 text-[#5fe3b0]",
];

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell title={project.title} tint="cool" intro={project.summary} back={{ href: "/projects/", label: "All projects" }}>
      <dl className="glow-card grid gap-x-10 gap-y-5 p-6 sm:grid-cols-3">
        <div><dt className="text-sm text-sky">Role</dt><dd className="mt-1 text-white">{project.role}</dd></div>
        <div><dt className="text-sm text-brand">Where</dt><dd className="mt-1 text-white">{project.org}</dd></div>
        <div><dt className="text-sm text-rose">When</dt><dd className="mt-1 text-white">{project.dates}</dd></div>
      </dl>

      <h2 className="mt-14 text-2xl font-bold tracking-tight">What I did</h2>
      <ul className="mt-5 space-y-4 leading-relaxed text-white/85">
        {project.points.map((point, i) => (
          <li key={point} className="flex gap-4">
            <span className={`mt-2.5 size-2 shrink-0 rounded-full ${["bg-sky", "bg-brand", "bg-rose", "bg-[#5fe3b0]"][i % 4]}`} />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-2xl font-bold tracking-tight">Tools and methods</h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tools.map((tool, i) => (
          <li key={tool} className={`rounded-full border px-3 py-1 text-sm ${chips[i % chips.length]}`}>{tool}</li>
        ))}
      </ul>

      <PhotoGallery photos={project.photos} />

      <div className="mt-16">
        <div className="rail" />
        <Link href={`/projects/${next.slug}/`} className="group mt-6 inline-block">
          <span className="block text-sm text-muted-foreground">Next project</span>
          <span className="mt-1 block font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-sky">{next.title} →</span>
        </Link>
      </div>
    </PageShell>
  );
}
