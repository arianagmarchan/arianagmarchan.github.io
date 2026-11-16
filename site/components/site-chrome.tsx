import Link from "next/link";
import { profile } from "@/lib/content";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/interests", label: "Interests" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="no-print border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-5 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-6 gap-y-1 text-[15px] text-muted-foreground">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-8">
        <span>© 2026 {profile.name}</span>
        <span className="flex gap-5">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
        </span>
      </div>
    </footer>
  );
}

/** Narrow page wrapper with a title, used by every inner page. */
export function PageShell({ title, intro, back, children }: { title: string; intro?: React.ReactNode; back?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-8 sm:pt-20">
      {back && (
        <Link href={back.href} className="no-print mb-8 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← {back.label}
        </Link>
      )}
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
      {intro && <div className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{intro}</div>}
      <div className="mt-12">{children}</div>
    </div>
  );
}
