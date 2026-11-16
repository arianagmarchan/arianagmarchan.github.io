import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-chrome";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

// Each project takes the colour of its folder artwork.
const projectColor = {
  glacier: { text: "group-hover:text-sky", dot: "bg-sky shadow-[0_0_12px_var(--sky)]" },
  aurora: { text: "group-hover:text-rose", dot: "bg-rose shadow-[0_0_12px_var(--rose)]" },
  dusk: { text: "group-hover:text-brand", dot: "bg-brand shadow-[0_0_12px_var(--brand)]" },
  verdant: { text: "group-hover:text-[#5fe3b0]", dot: "bg-[#5fe3b0] shadow-[0_0_12px_#5fe3b0]" },
  ember: { text: "group-hover:text-[#ff8f4d]", dot: "bg-[#ff8f4d] shadow-[0_0_12px_#ff8f4d]" },
} as const;

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      tint="cool"
      intro="Things I've designed, built and rebuilt, on teams, in the lab and on my own."
      back={{ href: "/", label: "Home" }}
    >
      <ol className="relative space-y-3">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}/`} className="group glow-card grid gap-2 p-6 transition-colors hover:border-white/20 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
              <span className="font-mono text-sm text-muted-foreground sm:pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className={`flex items-center gap-3 font-display text-2xl font-bold tracking-tight transition-colors ${projectColor[p.art].text}`}>
                  <span className={`size-2.5 shrink-0 rounded-full ${projectColor[p.art].dot}`} />
                  {p.title}
                </span>
                <span className="mt-1 block text-muted-foreground">{p.role} · {p.org}</span>
                <span className="mt-3 block max-w-[60ch] leading-relaxed text-white/80">{p.summary}</span>
              </span>
              <span className="order-first text-sm text-muted-foreground sm:order-none sm:pt-2">{p.dates}</span>
            </Link>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
