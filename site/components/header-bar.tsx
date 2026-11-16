"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/projects/", label: "Projects", color: "hover:text-sky" },
  { href: "/interests/", label: "Interests", color: "hover:text-rose" },
  { href: "/resume/", label: "Resume", color: "hover:text-brand" },
  { href: "/#contact", label: "Contact", color: "hover:text-sky" },
];

/** Floats over the hero, then picks up a dark glass backing once the page scrolls. */
export function HeaderBar({ name }: { name: string }) {
  const pathname = usePathname();
  const [solid, setSolid] = React.useState(false);

  React.useEffect(() => {
    const update = () => setSolid(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-b border-white/10 bg-[#070a12]/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
          {name}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
          {nav.map((item) => {
            const active = item.href !== "/#contact" && pathname.startsWith(item.href.replace(/\/$/, ""));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${item.color} ${active ? "text-white" : "text-white/70"}`}
              >
                {item.label}
                {active && <span aria-hidden="true" className="mt-0.5 block h-0.5 rounded-full bg-gradient-to-r from-brand to-rose" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
