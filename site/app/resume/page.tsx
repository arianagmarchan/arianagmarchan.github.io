import type { Metadata } from "next";
import { PageShell } from "@/components/site-chrome";
import { PrintButton } from "@/components/print-button";
import { profile, resume } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  const { education: ed } = resume;
  return (
    <PageShell
      title="Resume"
      intro={
        <>
          {profile.location} · <a href={`mailto:${profile.email}`} className="underline underline-offset-4 hover:text-foreground">{profile.email}</a> ·{" "}
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">{profile.linkedinLabel}</a>
        </>
      }
      back={{ href: "/", label: "Home" }}
    >
      <PrintButton />

      <section id="education" className="mt-12 scroll-mt-24">
        <h2 className="border-b border-white/15 pb-3 font-display text-2xl font-bold tracking-tight text-neon-cool">Education</h2>
        <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
          <div>
            <p className="font-medium text-white">{ed.school}</p>
            <p className="text-muted-foreground">{ed.degree} · GPA {ed.gpa}</p>
            <p className="mt-1 text-muted-foreground">{ed.honors}</p>
          </div>
          <p className="order-first shrink-0 text-sm text-muted-foreground sm:order-none">{ed.graduation}</p>
        </div>
      </section>

      {resume.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-14 scroll-mt-24">
          <h2 className="border-b border-white/15 pb-3 font-display text-2xl font-bold tracking-tight text-neon-cool">{section.title}</h2>
          <div className="divide-y divide-border">
            {section.entries.map((entry) => (
              <article key={entry.org + entry.role} className="py-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{entry.org}</h3>
                    <p className="text-muted-foreground">{entry.role}{entry.place ? ` · ${entry.place}` : ""}</p>
                  </div>
                  <p className="order-first shrink-0 text-sm text-brand sm:order-none">{entry.dates}</p>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-white/85 marker:text-rose">
                  {entry.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section id="skills" className="mt-14 scroll-mt-24">
        <h2 className="border-b border-white/15 pb-3 font-display text-2xl font-bold tracking-tight text-neon-cool">Skills</h2>
        <dl className="mt-5 space-y-4">
          {resume.skills.map((s) => (
            <div key={s.label} className="grid gap-1 sm:grid-cols-[200px_1fr] sm:gap-6">
              <dt className="font-medium text-sky">{s.label}</dt>
              <dd className="leading-relaxed text-muted-foreground">{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
