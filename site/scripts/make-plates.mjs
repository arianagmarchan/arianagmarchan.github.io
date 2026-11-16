// Draws the top-down plate pictures for the interests belt.
// Run from site/:  node scripts/make-plates.mjs
// Output: public/interests/<slug>.svg (square, transparent around the plate, as the belt expects).
import { writeFileSync, mkdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HandHeart, Telescope, Clapperboard } from "lucide-react";

mkdirSync("public/interests", { recursive: true });

const plate = (fill, rim, well, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="188" fill="${fill}"/>
  <circle cx="200" cy="200" r="186" fill="none" stroke="${rim}" stroke-width="3"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="${rim}" stroke-opacity=".5" stroke-width="1"/>
  <circle cx="200" cy="200" r="132" fill="${well}"/>
  <circle cx="200" cy="200" r="132" fill="none" stroke="${rim}" stroke-width="2"/>
  ${inner}
</svg>
`;

const icon = (Icon, color) =>
  renderToStaticMarkup(createElement(Icon, { size: 120, color, strokeWidth: 1.6, x: 140, y: 140, width: 120, height: 120 }));

// Plates with a lucide icon served on them, in the site's palette.
const iconPlates = [
  { slug: "volunteering", Icon: HandHeart, fill: "#f6efe6", rim: "#e0d2bf", well: "#fdf9f3", ink: "#e5486e" },
  { slug: "astronomy", Icon: Telescope, fill: "#1a2540", rim: "#34466e", well: "#223052", ink: "#7fd3ff" },
  { slug: "broadcast", Icon: Clapperboard, fill: "#f3e3c4", rim: "#dcc394", well: "#fbf1dd", ink: "#1b2033" },
];
for (const p of iconPlates) {
  writeFileSync(`public/interests/${p.slug}.svg`, plate(p.fill, p.rim, p.well, icon(p.Icon, p.ink)));
  console.log("wrote", p.slug);
}

// Tennis: a ball on a court-green plate.
writeFileSync(
  "public/interests/tennis.svg",
  plate(
    "#1f6b4f",
    "#2f8a68",
    "#247a5a",
    `<circle cx="200" cy="200" r="78" fill="#dcf25a"/>
  <circle cx="200" cy="200" r="78" fill="none" stroke="#c4dc3c" stroke-width="3"/>
  <path d="M138 152c34 18 34 78 0 96" fill="none" stroke="#fffbe8" stroke-width="7" stroke-linecap="round"/>
  <path d="M262 152c-34 18-34 78 0 96" fill="none" stroke="#fffbe8" stroke-width="7" stroke-linecap="round"/>`,
  ),
);
console.log("wrote tennis");

// Music: a vinyl record with a Spotify-green label. The belt spins this one while the song plays.
const grooves = Array.from({ length: 14 }, (_, i) => {
  const r = 84 + i * 7.4;
  return `<circle cx="200" cy="200" r="${r.toFixed(1)}" fill="none" stroke="#2a2d36" stroke-width="${i % 4 === 3 ? 2.2 : 1}"/>`;
}).join("\n  ");
writeFileSync(
  "public/interests/music.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="188" fill="#0d0f14"/>
  <circle cx="200" cy="200" r="187" fill="none" stroke="#3a3e4a" stroke-width="2"/>
  ${grooves}
  <path d="M90 120a140 140 0 0 1 70-52" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="10" stroke-linecap="round"/>
  <path d="M310 280a140 140 0 0 1-70 52" fill="none" stroke="#ffffff" stroke-opacity=".1" stroke-width="10" stroke-linecap="round"/>
  <circle cx="200" cy="200" r="70" fill="#1db954"/>
  <path d="M158 182c28-8 60-6 86 8" fill="none" stroke="#0d0f14" stroke-width="9" stroke-linecap="round"/>
  <path d="M163 202c23-6 49-4 70 7" fill="none" stroke="#0d0f14" stroke-width="7.5" stroke-linecap="round"/>
  <path d="M168 220c18-4 37-3 54 5" fill="none" stroke="#0d0f14" stroke-width="6" stroke-linecap="round"/>
  <circle cx="200" cy="200" r="4" fill="#0d0f14"/>
</svg>
`,
);
console.log("wrote music");
