/**
 * Everything the site says lives in this one file.
 *
 * To add a photo to a project or an interest, put the image in `public/images/`
 * and add it to that entry's `photos` list, e.g.
 *   photos: [{ src: "/images/landing-gear-test.jpg", alt: "Landing gear on the load rig", caption: "Test 3 of 5" }]
 * To give a folder file a real picture instead of generated art, set `cover` the same way.
 */

export type Photo = { src: string; alt: string; caption?: string };

export const profile = {
  name: "Ariana Marchan",
  firstName: "Ariana",
  email: "arianagmarchan@gmail.com",
  linkedin: "https://www.linkedin.com/in/ariana-g-marchan/",
  linkedinLabel: "linkedin.com/in/ariana-g-marchan",
  location: "Los Angeles, CA",
  school: "University of Southern California",
  degree: "B.S. Aerospace and Mechanical Engineering",
  graduation: "May 2029",
  photo: { src: "/images/ariana.jpg", alt: "Ariana Marchan at the SWE National Conference in Boston" } as Photo,
  about: [
    "I study aerospace and mechanical engineering at USC Viterbi. Most of my time goes into building things: landing gear for our AeroDesign competition aircraft, hydrofoils for a small autonomous boat, and lately a lunar rover concept with NASA's L'SPACE program.",
    "I like the part of engineering where a design meets the real world. Laying up carbon fiber, loading a part until it breaks, figuring out why, and changing the geometry so it doesn't break the same way next time.",
    "Outside of class I help run professional events for USC Women in Engineering, work as an RA, and operate cameras for graduate engineering courses, which means I get to sit in on lectures I'm not taking yet.",
  ],
  now: [
    { what: "Sizing wheels and power for a lunar rover concept", where: "NASA L'SPACE Mission Concept Academy" },
    { what: "Building and testing competition-aircraft landing gear", where: "USC AeroDesign" },
    { what: "Designing an animatronic pumpkin that dodges people reaching for candy", where: "Makers at USC" },
    { what: "Back from the SWE National Conference in Boston", where: "November 2026" },
  ],
  lookingFor: "Looking for a Summer 2027 internship in aerospace or mechanical engineering.",
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  org: string;
  dates: string;
  summary: string;
  points: string[];
  tools: string[];
  /** Generated art on the folder file until there's a real picture. */
  art: "aurora" | "ember" | "dusk" | "glacier" | "verdant";
  cover?: string;
  photos: Photo[];
};

export const projects: Project[] = [
  {
    slug: "aerodesign-landing-gear",
    title: "Competition aircraft landing gear",
    role: "Composites & Hardware Engineer",
    org: "USC AeroDesign Team",
    dates: "Jan 2026 – present",
    summary:
      "I own the landing gear for our AIAA Aero Design competition aircraft, from the Siemens NX model through fabrication, inspection and load testing.",
    points: [
      "Designed the gear in Siemens NX, balancing strength, mass, manufacturability and AIAA Aero Design rules.",
      "Built carbon-fiber and fiberglass parts by hand layup and vacuum bagging, then trimmed and inspected them against the design.",
      "Load-tested 5 gear configurations, found where each one failed, and changed the geometry and layup to fix it.",
      "Work on final integration before flight and on Solite covering for the airframe.",
    ],
    tools: ["Siemens NX", "Carbon fiber layup", "Vacuum bagging", "Load testing"],
    art: "glacier",
    photos: [],
  },
  {
    slug: "curve-hydrofoils",
    title: "Hydrofoils for an autonomous marine vehicle",
    role: "CURVE Undergraduate Research Fellow",
    org: "USC Fluid-Structure Interactions Lab",
    dates: "Sep 2025 – May 2026",
    summary:
      "Research on how hydrofoil shape affects propulsion and stability for a small autonomous boat.",
    points: [
      "Designed and compared 20+ hydrofoil geometries in Siemens NX using quantitative trade studies.",
      "3D-printed prototypes, ran instrumented experiments and analyzed the data.",
      "Presented the findings at the USC Viterbi Undergraduate Research Symposium.",
    ],
    tools: ["Siemens NX", "MATLAB", "3D printing", "Experimental testing"],
    art: "aurora",
    photos: [],
  },
  {
    slug: "lunar-rover",
    title: "Lunar rover mission concept",
    role: "Mechanical Engineer",
    org: "NASA L'SPACE Mission Concept Academy",
    dates: "Sep 2026 – present",
    summary:
      "Part of an interdisciplinary team taking a lunar rover mission from concept through preliminary design review, following the NASA mission life cycle.",
    points: [
      "Modeling the rover in Siemens NX and running MATLAB terramechanics analyses to size the wheels and estimate the power needed to drive on the lunar surface.",
      "Turning mission objectives into system requirements and comparing design options through trade studies.",
      "Contributing to mission traceability, ConOps, CAD, schedule, budget and risk deliverables.",
    ],
    tools: ["Siemens NX", "MATLAB", "Trade studies", "Requirements"],
    art: "dusk",
    photos: [],
  },
  {
    slug: "parametric-uav",
    title: "Parametric long-endurance UAV",
    role: "Independent project",
    org: "Personal",
    dates: "May 2026 – present",
    summary:
      "One master model in Onshape that generates four mission-driven UAV configurations, with MATLAB tools for the trade studies behind them.",
    points: [
      "Built a fully parametric UAV assembly in Onshape that produces 4 configurations from a single master model.",
      "Wrote MATLAB tools for drag, propulsion, weight and stability trade studies.",
    ],
    tools: ["Onshape", "MATLAB"],
    art: "verdant",
    photos: [],
  },
  {
    slug: "animatronic-pumpkin",
    title: "Trick-or-treat animatronic",
    role: "Mechanical Design Engineer",
    org: "Makers at USC",
    dates: "Sep 2026 – present",
    summary:
      "An animatronic pumpkin head that talks to trick-or-treaters and moves the candy out of reach.",
    points: [
      "Designing and 3D-printing the Onshape-modeled head, with servo-driven lid and jaw mechanisms and mounts for eye-tracking, speech and electronics.",
      "Building and testing the mechanical assembly with computer and electrical engineers who are adding computer vision and AI-based conversation.",
    ],
    tools: ["Onshape", "3D printing", "Servo mechanisms"],
    art: "ember",
    photos: [],
  },
  {
    slug: "boeing-design-challenge",
    title: "Conceptual aircraft design",
    role: "Team member",
    org: "Boeing Freshman Design Challenge",
    dates: "Feb 2026",
    summary:
      "Designed and analyzed a conceptual aircraft with a team, weighing efficiency against stability and overall system design.",
    points: [
      "Evaluated design trade-offs as a team and presented final recommendations.",
    ],
    tools: ["Aircraft sizing", "Trade studies"],
    art: "aurora",
    photos: [],
  },
];

export type Interest = {
  slug: string;
  name: string;
  /** Shown on the plate's chip and next to the name, like a price on a sushi belt. */
  tag: string;
  /** Plate ring colour, 1–5. */
  tier: 1 | 2 | 3 | 4 | 5;
  /** Top-down plate picture on a transparent square canvas. */
  plate: string;
  blurb: string;
  details: string[];
  body: string[];
  photos: Photo[];
  /** Marks text you still need to write. */
  draft?: boolean;
};

export const interests: Interest[] = [
  {
    slug: "volunteering",
    name: "Volunteering",
    tag: "Since 2021",
    tier: 3,
    plate: "/interests/volunteering.svg",
    blurb: "From Rotary service projects in Trinidad to a hospital radio studio in Orlando.",
    details: ["Interact Club president", "Seacrest Studios", "YWCA youth board"],
    body: [
      "I led the Interact Club at St. Joseph's Convent, Rotary's youth service club, first as vice president and then as president. The club had 50+ active members, won a District Citation Award for 2022–2023, contributed to Polio Plus every year, and showed up for the International Coastal Cleanup, Hike and Plant, and the Rotary Youth Leadership Awards.",
      "In the summer of 2025 I volunteered at Seacrest Studios, a broadcast studio inside Arnold Palmer Hospital for Children in Orlando. I helped run 5+ hospital events, edited 6 video segments, appeared on the morning show every other week, and co-hosted a talent show for 15+ patients.",
      "Before that I sat on the YWCA youth board, bringing a young person's view into board discussions and helping with events and outreach.",
    ],
    photos: [],
  },
  {
    slug: "music",
    name: "Music",
    tag: "Always on",
    tier: 2,
    plate: "/interests/music.svg",
    blurb: "Placeholder: what you play, listen to, or make.",
    details: ["Placeholder", "Placeholder"],
    body: [
      "Placeholder. Write a few sentences about music here: what you play or listen to, how long you've been at it, and what it means to you. Edit this entry in site/lib/content.ts.",
    ],
    photos: [],
    draft: true,
  },
  {
    slug: "sushi",
    name: "Sushi",
    tag: "Weekly",
    tier: 5,
    plate: "/sushi/salmon-nigiri.webp",
    blurb: "Placeholder: your go-to order and your favorite spot.",
    details: ["Placeholder", "Placeholder"],
    body: [
      "Placeholder. This whole page runs on a sushi belt for a reason. Say what you always order, where you go, and anything you've learned to make yourself. Edit this entry in site/lib/content.ts.",
    ],
    photos: [],
    draft: true,
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    tag: "Since 2021",
    tier: 4,
    plate: "/interests/astronomy.svg",
    blurb: "I ran my school's astronomy club for three years.",
    details: ["Club president", "50+ members", "T&T Astronomy Quiz"],
    body: [
      "From 2021 to 2024 I was president of the Astronomy Club at St. Joseph's Convent. We met every week, ran workshops and discussions on whatever was happening in the sky, and entered the Trinidad and Tobago Astronomy Quiz every year.",
    ],
    photos: [],
  },
  {
    slug: "broadcast",
    name: "Broadcast & video",
    tag: "On air",
    tier: 1,
    plate: "/interests/broadcast.svg",
    blurb: "Live production, from a hospital studio to graduate lecture halls.",
    details: ["Camera & network ops", "Video editing", "Live shows"],
    body: [
      "At Seacrest Studios I edited and produced video segments, wrote show notes and appeared on the morning broadcast. At USC I operate cameras and networked AV systems for graduate engineering courses, which keeps me calm when something breaks live and lets me listen in on coursework a few years ahead of mine.",
    ],
    photos: [],
  },
];

export const resume = {
  education: {
    school: "University of Southern California, Viterbi School of Engineering",
    degree: "Bachelor of Science in Aerospace and Mechanical Engineering",
    gpa: "3.93 / 4.00",
    graduation: "Expected May 2029",
    location: "Los Angeles, CA",
    honors: "Thematic Option Honors Program; W.V.T. Rusch Undergraduate Engineering Honors Program",
  },
  sections: [
    {
      id: "engineering",
      title: "Engineering experience",
      entries: [
        {
          org: "USC AeroDesign Team",
          role: "Composites & Hardware Engineer",
          dates: "Jan 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Own the Siemens NX design, fabrication, inspection, and testing of competition-aircraft landing gear, balancing strength, mass, manufacturability, and AIAA Aero Design requirements.",
            "Manufacture carbon-fiber and fiberglass structures through hand layup and vacuum bagging; trim, inspect, and validate parts for design conformance and flight readiness.",
            "Load-tested 5 landing-gear configurations, identified structural failure modes, and revised geometry and manufacturing methods based on test results.",
          ],
        },
        {
          org: "USC Fluid-Structure Interactions Lab",
          role: "CURVE Undergraduate Research Fellow",
          dates: "Sep 2025 – May 2026",
          place: "Los Angeles, CA",
          points: [
            "Designed and evaluated 20+ hydrofoil geometries in Siemens NX, using quantitative trade studies to compare propulsion performance and stability for an autonomous marine vehicle.",
            "Produced 3D-printed prototypes, ran instrumented experiments, analyzed data, and presented findings at the USC Viterbi Undergraduate Research Symposium.",
          ],
        },
        {
          org: "NASA L'SPACE Mission Concept Academy",
          role: "Mechanical Engineer",
          dates: "Sep 2026 – present",
          place: "Remote",
          points: [
            "Conceptualize a lunar rover in Siemens NX and run MATLAB terramechanics analyses to size wheels and estimate power required for lunar-surface traversal.",
            "Translate mission objectives into system requirements and evaluate design alternatives through trade studies for Mission Concept, System Requirements, Mission Definition, and Preliminary Design Reviews.",
            "Collaborate on an interdisciplinary team to develop mission traceability, ConOps, vehicle CAD, schedule, budget, and risk deliverables following the NASA mission life cycle.",
          ],
        },
      ],
    },
    {
      id: "projects",
      title: "Selected technical projects",
      entries: [
        {
          org: "Parametric Long-Endurance UAV Platform",
          role: "Independent project",
          dates: "May 2026 – present",
          place: "",
          points: [
            "Built a fully parametric UAV assembly in Onshape that generates 4 mission-driven configurations from one master model; developed MATLAB tools for drag, propulsion, weight, and stability trade studies.",
          ],
        },
        {
          org: "Makers at USC – Trick-or-Treat Animatronic",
          role: "Mechanical Design Engineer",
          dates: "Sep 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Design and 3D-print an Onshape-modeled animatronic pumpkin head with servo-actuated lid and jaw mechanisms plus integrated mounts for eye-tracking, speech, and electronic components.",
            "Build and test the mechanical assembly alongside computer and electrical engineers integrating computer vision and AI-based interaction so the animatronic can converse and evade users reaching for candy.",
          ],
        },
      ],
    },
    {
      id: "leadership",
      title: "Technical operations & leadership",
      entries: [
        {
          org: "USC Women in Engineering",
          role: "Assistant Director of Professional Events",
          dates: "Apr 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Lead 12+ professional-development events annually, managing schedules, budgets, recruiter and alumni outreach, stakeholder coordination, and deliverables across concurrent programs.",
            "Moderated an industry panel for 80+ attendees and help lead the annual Women in Engineering Leadership Conference from planning through execution.",
          ],
        },
        {
          org: "USC Residential Education",
          role: "Resident Assistant",
          dates: "Jun 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Support the safety, well-being, and belonging of 30+ residents by building community, responding to concerns, upholding residential standards, and completing time-sensitive program deliverables.",
            "Coordinate events and resident support with 19 RAs serving 700+ students across the residential community.",
          ],
        },
        {
          org: "USC Viterbi School of Engineering",
          role: "Camera & Network Operations Assistant",
          dates: "Aug 2025 – present",
          place: "Los Angeles, CA",
          points: [
            "Operate and troubleshoot 10+ interconnected audiovisual and networked systems supporting 4 graduate engineering courses each semester, minimizing service downtime.",
          ],
        },
      ],
    },
  ],
  skills: [
    { label: "Engineering software", items: "Siemens NX, SolidWorks, Onshape, MATLAB, Gearsizer" },
    { label: "Manufacturing", items: "Carbon fiber & fiberglass layup, vacuum bagging, CNC machining, 3D printing, mechanical assembly, prototyping" },
    { label: "Engineering methods", items: "Failure analysis, root-cause analysis, load testing, trade studies, requirements development, design validation, quality inspection" },
    { label: "Relevant coursework", items: "Calculus I–III, Intro to Aerospace Engineering, Physics I (Mechanics & Thermodynamics), Intro to MATLAB; Fall 2026: Statics, Physics II (Electricity & Magnetism); Spring 2027: Mechanics of Materials & Structures, Computational Methods in Engineering (Python), Basic Flight Mechanics, Mathematics of Physics & Engineering I" },
  ],
};
