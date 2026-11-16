// Draws the top-down plate pictures for the interests belt, one lucide icon "served" on each plate.
// Run from site/:  node scripts/make-plates.mjs
// Output: public/interests/<slug>.svg (square, transparent around the plate, as the belt expects).
import { writeFileSync, mkdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HandHeart, Music, Telescope, Clapperboard } from "lucide-react";

const plates = [
  // plate colour, rim colour, well colour, icon colour
  { slug: "volunteering", icon: HandHeart, plate: "#f4f1ec", rim: "#d9d3c9", well: "#fbfaf7", ink: "#9b1c1c" },
  { slug: "music", icon: Music, plate: "#1d1d1f", rim: "#3a3a3d", well: "#26262a", ink: "#f2f2f2" },
  { slug: "astronomy", icon: Telescope, plate: "#22314a", rim: "#3d4f6d", well: "#2a3b57", ink: "#f2f2f2" },
  { slug: "broadcast", icon: Clapperboard, plate: "#ece9e4", rim: "#cfc9bf", well: "#f8f6f2", ink: "#1d1d1f" },
];

mkdirSync("public/interests", { recursive: true });

for (const p of plates) {
  const icon = renderToStaticMarkup(
    createElement(p.icon, { size: 120, color: p.ink, strokeWidth: 1.6, x: 140, y: 140, width: 120, height: 120 }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <circle cx="200" cy="200" r="188" fill="${p.plate}"/>
  <circle cx="200" cy="200" r="186" fill="none" stroke="${p.rim}" stroke-width="3"/>
  <circle cx="200" cy="200" r="132" fill="${p.well}"/>
  <circle cx="200" cy="200" r="132" fill="none" stroke="${p.rim}" stroke-width="2"/>
  <circle cx="200" cy="200" r="150" fill="none" stroke="${p.rim}" stroke-opacity=".5" stroke-width="1"/>
  ${icon}
</svg>
`;
  writeFileSync(`public/interests/${p.slug}.svg`, svg);
  console.log("wrote", p.slug);
}
