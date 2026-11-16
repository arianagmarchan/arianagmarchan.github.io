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

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell title={project.title} intro={project.summary} back={{ href: "/projects", label: "All projects" }}>
      <dl className="grid gap-x-10 gap-y-4 border-y border-border py-6 sm:grid-cols-3">
        <div><dt className="text-sm text-muted-foreground">Role</dt><dd className="mt-1">{project.role}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Where</dt><dd className="mt-1">{project.org}</dd></div>
        <div><dt className="text-sm text-muted-foreground">When</dt><dd className="mt-1">{project.dates}</dd></div>
      </dl>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">What I did</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed marker:text-muted-foreground">
        {project.points.map((point) => <li key={point}>{point}</li>)}
      </ul>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Tools and methods</h2>
      <p className="mt-3 text-muted-foreground">{project.tools.join(" · ")}</p>

      <PhotoGallery photos={project.photos} />

      <div className="mt-16 border-t border-border pt-6">
        <Link href={`/projects/${next.slug}`} className="group inline-block">
          <span className="block text-sm text-muted-foreground">Next project</span>
          <span className="mt-1 block text-xl font-semibold tracking-tight group-hover:text-brand">{next.title} →</span>
        </Link>
      </div>
    </PageShell>
  );
}
