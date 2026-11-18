/**
 * Text for the unlisted /honeywell/ page. Nothing on the site links to it;
 * it's shared by URL only and asks search engines not to index it.
 */

export type HoneywellCard = {
  /** Matches a project's `slug` in lib/content.ts; the label line and "Full project" link come from it. */
  slug: string;
  title: string;
  /** Overrides the project's `org` in the label line. */
  org?: string;
  body: string;
  learned: string;
  nextTime?: string;
  /** Image from public/images to show on the card, if the file exists. */
  photo?: string;
};

export const honeywell = {
  metaTitle: "For Honeywell Aerospace",
  title: "Hi, Honeywell Aerospace team",
  intro:
    "I'm Ariana Marchan, a sophomore studying aerospace and mechanical engineering at USC. I met your team at the SWE 2026 conference in Boston and put this page together to share the work most relevant to what you do.",
  lookingFor:
    "I'm looking for a Summer 2027 internship in mechanical, test, manufacturing or quality engineering, and I'm also open to wherever your team sees me fitting best!",
  why: {
    heading: "Why Honeywell Aerospace",
    body: [
      "What drew me to Honeywell is the idea of owning the mission end-to-end. Your systems have to work safely and reliably across many different aircraft and spacecraft, so a design can't be separated from how it's built, tested and integrated. That's the part of engineering I've enjoyed most so far, and I'd love to learn how experienced engineers do it on systems where safety and reliability are critical.",
      "I've also learned that Honeywell interns can choose to view the product they're working on and learn more about what engineers across the company do.",
      "I'm a very curious person, and I love learning about different career paths. That's what I enjoyed most about the Honeywell Networking Brunch I attended, where I got to hear about the projects engineers in different fields were working on.",
    ],
  },
  workHeading: "Where design meets testing",
  cards: [
    {
      slug: "aerodesign-landing-gear",
      title: "Composite landing gear",
      body: "I own the landing gear for our competition aircraft, from its geometry through carbon-fiber layup, finishing, wheel integration and load testing. We built and tested five configurations under a gradually applied 30 lb static load. Some were too stiff, others bent too much, and one twisted. We revised the geometry each time, for example by widening the base where the loads were highest.",
      learned: "The best landing gear isn't the stiffest one. It deforms in a controlled, predictable way without twisting or permanent set.",
      nextTime: "A fixed test fixture, dial-indicator deflection readings at each load step, and pass/fail criteria set before testing.",
      photo: "/images/landing-gear.jpg",
    },
    {
      slug: "curve-hydrofoils",
      title: "Bio-inspired propulsion research",
      body: "I designed 20+ bristled-wing geometries in Siemens NX, 3D-printed the prototypes, and compared them on a small autonomous marine vehicle, changing one variable at a time (bristle spacing, wing length, bristle diameter) and measuring average speed from video. When the vehicle kept veering off course and contaminating the data, I researched the problem and proposed adding a keel, which made the runs much more consistent. I presented the work at USC's Undergraduate Research Symposium.",
      learned: "Sometimes the test setup, not the part being tested, is what's corrupting the measurement.",
      photo: "/images/marine-vehicle.jpg",
    },
    {
      slug: "parametric-uav",
      title: "Parametric long-endurance UAV",
      org: "Independent project",
      body: "I built a top-down parametric Onshape model of a high-wing, twin-boom UAV that generates four mission-driven variants from one master model: Scout, Cargo, Long-Endurance and Fast Response. Changing a mission-level parameter such as wingspan or payload-bay size updates the related geometry without remodeling. A MATLAB toolkit for weight, drag, power, endurance and stability is in progress, and I'll check it against hand calculations and published aircraft data.",
      learned: "A parametric model only works if it rebuilds reliably across its whole design range, not just at the baseline.",
      // photo: "/images/uav-variants.png",  // add once the screenshot is in public/images
    },
    {
      slug: "lunar-rover",
      title: "Lunar mission concept",
      org: "NASA L'SPACE",
      body: "I'm on an interdisciplinary team developing a lunar mission through staged NASA-style reviews. I've worked on the drill trade study and helped the team rework the concept after a budget cut, separating mission-critical capabilities from the nice-to-haves.",
      learned: "Cutting cost isn't about picking the cheapest parts. Every change has to trace back to the mission's goals.",
    },
  ] as HoneywellCard[],
  howIWork: {
    heading: "How I work",
    points: [
      "I ask questions early, communicate openly, and am clear about both what I don't know yet and what I'm capable of accomplishing.",
      "I understand testing procedures: I change one variable at a time and write down every change. My Honeywell interview showed me how important documentation is in industry, a lesson NASA L'SPACE has taught me too!",
      "If I'm unsure about a part's quality, I don't pass it. I flag it. It's so important never to turn a blind eye to a potential mishap. As an intern, I'd have teammates taking a second look at my work, but I already have a sharp eye for noticing when something looks peculiar and speaking up about it.",
    ],
  },
  contact: {
    heading: "Let's stay in touch",
    line: "I'd love to hear about roles on your team as they open. The more I learn about becoming an engineer at Honeywell Aerospace, the more excited I am about the opportunity to work there. That's why I built this page just for you!",
  },
};
