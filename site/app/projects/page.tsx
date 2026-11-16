import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-chrome";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      intro="Things I've designed, built, broken and rebuilt, on teams, in the lab and on my own."
      back={{ href: "/", label: "Home" }}
    >
      <ol className="border-t border-border">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-border">
            <Link href={`/projects/${p.slug}`} className="group grid gap-1 py-7 sm:grid-cols-[1fr_auto] sm:gap-8">
              <span>
                <span className="block text-2xl font-semibold tracking-tight group-hover:text-brand">{p.title}</span>
                <span className="mt-1 block text-muted-foreground">{p.role} · {p.org}</span>
                <span className="mt-3 block max-w-[60ch] leading-relaxed">{p.summary}</span>
              </span>
              <span className="order-first text-sm text-muted-foreground sm:order-none sm:pt-2">{p.dates}</span>
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
