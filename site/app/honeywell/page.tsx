import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site-chrome";
import { PhotoGallery } from "@/components/photo-gallery";
import { CopyEmail } from "@/components/copy-email";
import { profile, projects } from "@/lib/content";
import { honeywell } from "@/lib/honeywell";

// Unlisted: nothing on the site links here, and search engines are asked not to index or follow it.
// It's deliberately left out of robots.txt and any sitemap, which would only advertise the URL.
export const metadata: Metadata = {
  title: honeywell.metaTitle,
  robots: { index: false, follow: false },
};

const dots = ["bg-sky", "bg-brand", "bg-rose", "bg-[#5fe3b0]"];

export default function HoneywellPage() {
  return (
    <PageShell title={honeywell.title} tint="cool" intro={honeywell.intro} back={{ href: "/", label: "Ariana's main site" }}>
      <p className="-mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-brand">
        <span className="size-2 shrink-0 animate-pulse rounded-full bg-brand" />
        {honeywell.lookingFor}
      </p>

      <section aria-labelledby="hw-why" className="mt-14">
        <h2 id="hw-why" className="text-2xl font-bold tracking-tight sm:text-3xl">{honeywell.why.heading}</h2>
        <div className="mt-5 space-y-5 text-lg leading-relaxed text-white/85">
          {honeywell.why.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </section>

      <div className="rail mt-16" />

      <section aria-labelledby="hw-work" className="mt-16">
        <h2 id="hw-work" className="text-2xl font-bold tracking-tight sm:text-3xl">{honeywell.workHeading}</h2>
        <div className="mt-8 space-y-6">
          {honeywell.cards.map((card, i) => {
            const project = projects.find((p) => p.slug === card.slug);
            const photo = card.photo ? project?.photos.find((p) => p.src === card.photo) : undefined;
            return (
              <article key={card.slug} className="glow-card p-6 sm:p-8">
                <h3 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
                  <span className={`size-2.5 shrink-0 rounded-full ${dots[i % dots.length]}`} />
                  {card.title}
                </h3>
                {project && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.org ?? project.org} · {project.dates}
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-white/85">{card.body}</p>

                <ul className="mt-5 space-y-3 leading-relaxed">
                  <li className="flex gap-4">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-sky" />
                    <span><span className="font-medium text-sky">What I learned: </span><span className="text-white/85">{card.learned}</span></span>
                  </li>
                  {card.nextTime && (
                    <li className="flex gap-4">
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand" />
                      <span><span className="font-medium text-brand">Next time: </span><span className="text-white/85">{card.nextTime}</span></span>
                    </li>
                  )}
                </ul>

                {photo && <PhotoGallery photos={[photo]} heading={false} className="mt-6" />}

                <Link href={`/projects/${card.slug}/`} className="mt-6 inline-block font-medium text-sky transition-colors hover:text-white">
                  Full project →
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <div className="rail mt-16" />

      <section aria-labelledby="hw-how" className="mt-16">
        <h2 id="hw-how" className="text-2xl font-bold tracking-tight sm:text-3xl">{honeywell.howIWork.heading}</h2>
        <ul className="mt-6 space-y-4 text-lg leading-relaxed text-white/85">
          {honeywell.howIWork.points.map((point, i) => (
            <li key={point} className="flex gap-4">
              <span className={`mt-3 size-2 shrink-0 rounded-full ${dots[i % dots.length]}`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rail mt-16" />

      <section aria-labelledby="hw-contact" className="mt-16">
        <h2 id="hw-contact" className="text-2xl font-bold tracking-tight sm:text-3xl">{honeywell.contact.heading}</h2>
        <p className="mt-5 text-lg text-muted-foreground">{honeywell.contact.line}</p>
        <a
          href={`mailto:${profile.email}`}
          className="text-neon mt-8 inline-block break-words font-display text-[1.6rem] font-bold tracking-tight transition-opacity hover:opacity-80 sm:text-5xl"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail email={profile.email} />
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-sky/50 px-5 py-2.5 text-sky transition-colors hover:bg-sky/10"
          >
            LinkedIn
          </a>
          <Link
            href="/resume/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-white transition-colors hover:bg-white/10"
          >
            Resume
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
