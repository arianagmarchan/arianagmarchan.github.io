"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";
import { interests, profile, projects } from "@/lib/content";

// A folder shows its last four files, frontmost last, so the order below is back to front.
const projectFiles: FolderFile[] = projects.slice(0, 4).reverse().map((p) => ({
  name: p.title,
  meta: p.dates.split(" – ")[0],
  ...(p.cover ? { image: p.cover } : { art: p.art }),
  href: `/projects/${p.slug}`,
}));

const interestFiles: FolderFile[] = [
  ...interests
    .filter((i) => ["sushi", "music", "volunteering"].includes(i.slug))
    .map((i) => ({ name: i.name, meta: i.tag, href: `/interests/${i.slug}` })),
  { name: "All of them, on a sushi belt", meta: `${interests.length} plates`, art: "ember" as const, href: "/interests" },
];

const resumeFiles: FolderFile[] = [
  { name: "Skills", meta: "Software · shop", href: "/resume#skills" },
  { name: "Leadership", meta: "3 roles", href: "/resume#leadership" },
  { name: "Engineering experience", meta: "3 roles", href: "/resume#engineering" },
  { name: "Full resume", meta: "Web · printable", href: "/resume" },
];

export function HomeFolders() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 items-end justify-items-center gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      <GlassFolder
        label="Projects"
        meta={`${projects.length} projects`}
        art="aurora"
        seed={3}
        files={projectFiles}
        action="more"
        menu={[{ label: "See all projects", onSelect: () => router.push("/projects") }]}
        width={320}
        appearDelay={0}
      />
      <GlassFolder
        label="Interests"
        meta={`${interests.length} interests`}
        tone="dark"
        art="ember"
        seed={11}
        files={interestFiles}
        action="more"
        labelPlacement="top-left"
        menu={[{ label: "Open the sushi belt", onSelect: () => router.push("/interests") }]}
        width={320}
        appearDelay={140}
      />
      <GlassFolder
        label="Resume"
        meta="Updated Nov 2026"
        art="glacier"
        seed={7}
        files={resumeFiles}
        action="more"
        labelPlacement="top-right"
        menu={[
          { label: "View full resume", onSelect: () => router.push("/resume") },
          { label: "Email me", onSelect: () => { window.location.href = `mailto:${profile.email}`; } },
        ]}
        width={320}
        appearDelay={280}
      />
    </div>
  );
}
