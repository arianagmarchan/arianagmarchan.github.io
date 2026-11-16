import Link from "next/link";
import { profile } from "@/lib/content";
import { HeaderBar } from "@/components/header-bar";

export function SiteHeader() {
  return <HeaderBar name={profile.name} />;
}

export function SiteFooter() {
  return (
    <footer className="no-print relative">
      <div className="rail" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:px-8">
        <span>© 2026 {profile.name} · Los Angeles</span>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={`mailto:${profile.email}`} className="hover:text-brand">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky">LinkedIn</a>
          <a href="https://www.guglielmogiannattasio.it" target="_blank" rel="noreferrer" className="hover:text-foreground">
            Hero video by guglielmogiannattasio
          </a>
        </span>
      </div>
    </footer>
  );
}

/** Wrapper for every inner page: back link, a lit title, an intro line. */
export function PageShell({
  title,
  intro,
  back,
  tint = "warm",
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  back?: { href: string; label: string };
  tint?: "warm" | "cool";
  children: React.ReactNode;
}) {
  return (
    <div className="city-glow">
      <div className="mx-auto max-w-3xl px-4 pb-28 pt-32 sm:px-8 sm:pt-36">
        {back && (
          <Link href={back.href} className="no-print mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sky">
            ← {back.label}
          </Link>
        )}
        <h1 className={`text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl ${tint === "warm" ? "text-neon" : "text-neon-cool"}`}>{title}</h1>
        {intro && <div className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{intro}</div>}
        <div className="mt-14">{children}</div>
      </div>
    </div>
  );
}
