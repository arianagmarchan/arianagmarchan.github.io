import type { Metadata } from "next";
import Link from "next/link";
import { InterestsBelt } from "@/components/interests-belt";
import { interests } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

export default function InterestsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-8 sm:pt-20">
        <Link href="/" className="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Interests</h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
          Sushi is one of them, so the rest come around on a belt.
        </p>
      </div>

      <InterestsBelt />

      {/* The same list without the belt, for keyboard, screen reader and no-JavaScript visitors. */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-8">
        <h2 className="text-xl font-semibold tracking-tight">Everything on the belt</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {interests.map((i) => (
            <li key={i.slug}>
              <Link href={`/interests/${i.slug}`} className="group flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="font-medium group-hover:text-brand">{i.name}</span>
                <span className="text-muted-foreground">{i.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
