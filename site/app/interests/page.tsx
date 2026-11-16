import type { Metadata } from "next";
import Link from "next/link";
import { InterestsBelt } from "@/components/interests-belt";
import { interests } from "@/lib/content";

export const metadata: Metadata = { title: "Interests" };

const dot = { brand: "bg-brand", sky: "bg-sky", rose: "bg-rose", mint: "bg-[#5fe3b0]" };
const hover = { brand: "group-hover:text-brand", sky: "group-hover:text-sky", rose: "group-hover:text-rose", mint: "group-hover:text-[#5fe3b0]" };

export default function InterestsPage() {
  return (
    <div className="city-glow">
      <div className="mx-auto max-w-6xl px-4 pt-32 sm:px-8 sm:pt-36">
        <Link href="/" className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-sky">← Home</Link>
        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
          <span className="text-neon">Interests</span>
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
          Sushi is one of them, so the rest come around on a belt. The record plays, too.
        </p>
      </div>

      <InterestsBelt />

      {/* The same list without the belt, for keyboard, screen reader and no-JavaScript visitors. */}
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 sm:px-8">
        <h2 className="text-2xl font-bold tracking-tight">Everything on the belt</h2>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {interests.map((i) => (
            <li key={i.slug} className="border-b border-border">
              <Link href={`/interests/${i.slug}/`} className="group flex items-start gap-4 py-5">
                <img src={i.plate} alt="" className="size-12 shrink-0 rounded-full" />
                <span>
                  <span className={`flex items-center gap-2 font-display text-lg font-bold transition-colors ${hover[i.color]}`}>
                    <span className={`size-2 rounded-full ${dot[i.color]}`} />
                    {i.name}
                  </span>
                  <span className="mt-0.5 block text-muted-foreground">{i.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
