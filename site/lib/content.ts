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
    "I study aerospace and mechanical engineering at the University of Southern California Viterbi School of Engineering. Most of my hands-on time goes into USC AeroDesign, where I build the landing gear for our competition aircraft: carbon fiber and fiberglass layups, load tests, and the last checks before it flies. This semester I also joined NASA's L'SPACE program as a mechanical engineer on a lunar rover concept.",
    "What pulls me toward aerospace is making space exploration more sustainable. It's why I'm drawn to research and long-duration mission design, and it shapes the projects I pick.",
    "Outside of engineering I'm a pretty creative person. I play steelpan and piano, I'm happiest on a tennis court, and I'll never turn down all-you-can-eat sushi.",
  ],
  /** "What I'm up to", drawn as stops on a transit line. `color` picks the stop's light. */
  now: [
    { what: "Sizing wheels and power for a lunar rover concept", where: "NASA L'SPACE Mission Concept Academy", color: "sky" },
    { what: "Building and testing competition-aircraft landing gear", where: "USC AeroDesign", color: "brand" },
    { what: "Building an animatronic pumpkin that dodges people reaching for candy, and presenting it at the Fall Showcase", where: "USC Makers", color: "rose" },
    { what: "Back from the SWE National Conference in Boston (#WE26)", where: "November 2026", color: "mint" },
  ] as { what: string; where: string; color: "sky" | "brand" | "rose" | "mint" }[],
  /** The hero's last line, shown as the subway doors finish opening. */
  heroTagline: "Next Stop: Who is Ariana Marchan?",
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
      "I own the landing gear for our AIAA Aero Design competition aircraft: its design, fabrication, inspection and testing, from sizing the geometry to carbon-fiber layups to load tests and refinement.",
    points: [
      "Own the design, fabrication, inspection and testing of the competition-aircraft landing gear, balancing strength, mass, manufacturability and AIAA Aero Design requirements.",
      "Size the gear's geometry and fabricate it with carbon-fiber composites, then test and refine the design.",
      "Manufacture carbon-fiber and fiberglass structures through hand layup and vacuum bagging; trim, inspect and validate parts for design conformance and flight readiness.",
      "Load-tested five landing-gear configurations, identified their structural failure modes, and revised the geometry and manufacturing methods based on the results.",
      "Fabricated a carbon-fiber composite landing gear (April 2026) with attention to material handling, layering accuracy and structural performance; it was dry-fit integrated into the aircraft and validated through testing before competition.",
      "Work across the build and landing gear subteams to fabricate and integrate hardware, help with final integration decisions before flight, and use Solite covering for a clean aerodynamic finish.",
      "Troubleshoot build issues with teammates and carry design changes through fabrication and testing.",
    ],
    tools: ["Carbon fiber layup", "Fiberglass layup", "Vacuum bagging", "Load testing", "Failure analysis", "Quality inspection", "Solite covering"],
    art: "glacier",
    photos: [],
  },
  {
    slug: "curve-hydrofoils",
    title: "Hydrofoils for a small-scale marine vehicle",
    role: "CURVE Undergraduate Research Fellow",
    org: "USC Fluid–Structure Interactions Lab",
    dates: "Aug 2025 – Aug 2026",
    summary:
      "Research on how hydrofoil design affects the performance and stability of a small-scale autonomous marine vehicle, aiming for geometries that improve hydrodynamic efficiency while keeping the vehicle stable in water.",
    points: [
      "Designed and evaluated 20+ hydrofoil geometries in Siemens NX, varying planform and cross-sectional shapes to examine their effects on lift, drag and stability.",
      "Used quantitative trade studies to compare propulsion performance and stability across the designs.",
      "3D-printed prototypes, ran instrumented experiments and analyzed the data to see how design changes affected the vehicle's behavior in water.",
      "Presented the findings at the USC Viterbi Undergraduate Research Symposium.",
      "Used literature review, advisor feedback and iterative design decisions to refine candidate geometries and connect engineering concepts to the experimental work.",
      "Collaborated with a small research team to discuss design tradeoffs and communicate technical findings.",
    ],
    tools: ["Siemens NX", "MATLAB", "3D printing", "Instrumented testing", "Trade studies", "Literature review"],
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
      "Developing the mechanical concept for a lunar rover as part of an interdisciplinary mission-design team, following the NASA mission life cycle.",
    points: [
      "Model the vehicle and its mechanical systems in Siemens NX.",
      "Run MATLAB terramechanics simulations to evaluate rover wheel dimensions and estimate the power needed to traverse lunar terrain.",
      "Translate mission and customer objectives into mechanical design requirements, then use trade studies to compare design options and document decisions.",
      "Contribute to the Mission Concept, System Requirements, Mission Definition and Preliminary Design Reviews, coordinating mechanical design choices with the broader mission concept.",
      "Help develop mission traceability, ConOps, vehicle CAD, schedule, budget and risk deliverables with the team.",
    ],
    tools: ["Siemens NX", "MATLAB", "Terramechanics", "Trade studies", "Requirements"],
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
    org: "USC Makers",
    dates: "Sep 2026 – present",
    summary:
      "The mechanical side of an animatronic trick-or-treat pumpkin that talks with visitors and dodges anyone reaching for the candy. I'll be presenting our work so far at the USC Makers Fall Showcase.",
    points: [
      "Design, 3D-print and build the mechanical components: an Onshape-modeled pumpkin head with servo-actuated lid and jaw (mouth) mechanisms, plus integrated mounts for eye-tracking, speech and electronic components.",
      "Create and revise the parts in CAD and take responsibility for mechanical construction and assembly.",
      "Build and test the mechanical assembly with computer engineering and electronics teammates who are integrating computer vision and AI-based interaction, so the animatronic can talk with visitors and react when someone reaches for candy.",
      "Iterate the design as the team brings the mechanism, electronics and interactive behavior together.",
      "Presenting the work we've done so far at the USC Makers Fall Showcase.",
    ],
    tools: ["Onshape", "3D printing", "Servo mechanisms", "Mechanical assembly"],
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
      "Designed and analyzed a conceptual aircraft with a team, focusing on performance optimization and the trade-offs between efficiency, stability and overall system design.",
    points: [
      "Designed and analyzed a conceptual aircraft, weighing efficiency, stability and overall system design.",
      "Evaluated design decisions as a team and presented final recommendations.",
    ],
    tools: ["Aircraft sizing", "Performance analysis", "Trade studies"],
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
  /** The light this interest's page is lit with. */
  color: "brand" | "sky" | "rose" | "mint";
  /** A song snippet to play on the record player (the music plate). */
  track?: Track;
  /** Marks text you still need to write. */
  draft?: boolean;
};

export type Track = {
  title: string;
  artist: string;
  album: string;
  /** Apple's official 30-second preview of the song. */
  preview: string;
  cover: string;
  spotify: string;
  note: string;
};

export const interests: Interest[] = [
  {
    slug: "music",
    name: "Music",
    tag: "On repeat",
    tier: 4,
    color: "rose",
    plate: "/interests/music.svg",
    blurb: "Steelpan, piano, and one song I've played more than 50 times.",
    details: ["Steelpan", "Piano", "Top track: Friday I'm In Love"],
    body: [
      "I play steelpan, the instrument Trinidad and Tobago gave the world, and piano.",
      "My top track right now is Friday I'm In Love by The Cure. I've listened to it over 50 times and I'm not stopping. Press play on the record to hear a bit of it.",
    ],
    track: {
      title: "Friday I'm In Love",
      artist: "The Cure",
      album: "Wish",
      preview:
        "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/de/35/c0/de35c065-9c6c-f9e5-d9bf-974eebef90da/mzaf_969952745186056862.plus.aac.p.m4a",
      cover:
        "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/49/99/b4/4999b482-ac72-6aa2-0016-a6924355e72e/dj.tyyqcstw.jpg/300x300bb.jpg",
      spotify: "https://open.spotify.com/search/Friday%20I%27m%20In%20Love%20The%20Cure",
      note: "50+ plays and counting",
    },
    photos: [],
  },
  {
    slug: "sushi",
    name: "Sushi",
    tag: "All you can eat",
    tier: 5,
    color: "brand",
    plate: "/sushi/dragon-roll.webp",
    blurb: "A good dragon roll, at my favorite all-you-can-eat spot in DTLA.",
    details: ["Dragon roll", "All you can eat", "Downtown LA"],
    body: [
      "There's an all-you-can-eat sushi place in downtown LA that I keep going back to, and my order always starts with a dragon roll: shrimp tempura inside, avocado on top, eel sauce over all of it.",
      "It's also why the interests on this site come around on a sushi belt.",
    ],
    photos: [],
  },
  {
    slug: "volunteering",
    name: "Volunteering",
    tag: "Since 2021",
    tier: 3,
    color: "rose",
    plate: "/interests/volunteering.svg",
    blurb: "From Rotary service projects in Trinidad to food banks and robotics kids in LA.",
    details: ["Interact Club president", "Viterbi Impact", "Seacrest Studios", "YWCA youth board"],
    body: [
      "Service is a big part of how I think about engineering. It started with the Interact Club at St. Joseph's Convent, Rotary's youth service club, which I led first as vice president and then as president. The club had 50+ active members, won a District Citation Award for 2022–2023, gave to Polio Plus every year, and turned out for the International Coastal Cleanup, Hike and Plant, and the Rotary Youth Leadership Awards.",
      "At USC I volunteer through Viterbi Impact: packing food boxes for families at the Los Angeles Regional Food Bank, and helping young programmers and engineers get ready for SOLA Robotics' SOLA CON.",
      "In the summer of 2025 I volunteered at Seacrest Studios, a broadcast studio inside Arnold Palmer Hospital for Children in Orlando. I helped run 5+ hospital events, edited 6 video segments, appeared on the morning show every other week, and co-hosted a talent show for 15+ patients. Before that I sat on the YWCA youth board.",
    ],
    photos: [],
  },
  {
    slug: "tennis",
    name: "Tennis",
    tag: "Game, set",
    tier: 2,
    color: "mint",
    plate: "/interests/tennis.svg",
    blurb: "I love spending time on the tennis court.",
    details: ["On the court whenever I can"],
    body: [],
    photos: [],
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    tag: "Since 2021",
    tier: 1,
    color: "sky",
    plate: "/interests/astronomy.svg",
    blurb: "I ran my school's astronomy club for three years.",
    details: ["Club president", "50+ members", "T&T Astronomy Quiz"],
    body: [
      "From 2021 to 2024 I was president of the Astronomy Club at St. Joseph's Convent. We met every week, ran workshops and discussions on whatever was happening in the sky, and entered the Trinidad and Tobago Astronomy Quiz every year.",
      "In 2024 I took Embry-Riddle's pre-college spaceflight course, covering orbital mechanics, propulsion and launch vehicles, and worked on a capstone about sending women to Mars.",
    ],
    photos: [],
  },
  {
    slug: "broadcast",
    name: "Broadcast & video",
    tag: "On air",
    tier: 3,
    color: "brand",
    plate: "/interests/broadcast.svg",
    blurb: "Live production, from a hospital studio to graduate lecture halls.",
    details: ["Multi-camera production", "Live switching", "Video editing"],
    body: [
      "At Seacrest Studios I edited and produced video segments, wrote show notes and appeared on the morning broadcast. At USC I work in a multi-camera studio for graduate engineering courses: framing, live switching, audio and monitoring, which keeps me calm when something breaks live and lets me listen in on coursework a few years ahead of mine.",
    ],
    photos: [],
  },
];

export const resume = {
  education: {
    school: "University of Southern California, Viterbi School of Engineering",
    degree: "Bachelor of Science in Aerospace and Mechanical Engineering",
    graduation: "Aug 2025 – May 2029 (expected)",
    location: "Los Angeles, CA",
    honors: "Thematic Option Honors Program; W.V.T. Rusch Undergraduate Engineering Honors Program",
    activities: "CURVE Research Fellow · USC AeroDesign Team · Student worker at DEN@Viterbi",
    others: [
      {
        school: "Embry-Riddle Aeronautical University",
        detail: "Pre-college aerospace program: a three-week, in-person course in introductory spaceflight (3 units), covering orbital mechanics, propulsion systems, U.S. space missions and launch vehicle architectures. Capstone on the feasibility of sustained human spaceflight to Mars, focused on sending women to Mars.",
        dates: "May – Jun 2024",
      },
    ],
  },
  sections: [
    {
      id: "engineering",
      title: "Engineering experience",
      entries: [
        {
          org: "NASA L'SPACE Mission Concept Academy",
          role: "Mechanical Engineer",
          dates: "Sep 2026 – present",
          place: "Remote",
          points: [
            "Develop the mechanical concept for a lunar rover as part of an interdisciplinary mission-design team, using Siemens NX to model the vehicle and its mechanical systems.",
            "Run MATLAB terramechanics simulations to evaluate rover wheel dimensions and estimate the power needed to traverse lunar terrain.",
            "Translate mission and customer objectives into mechanical design requirements, then use trade studies to compare design options and document decisions.",
            "Contribute to the Mission Concept, System Requirements, Mission Definition, and Preliminary Design Reviews, coordinating mechanical design choices with the broader mission concept.",
            "Collaborate on mission traceability, ConOps, vehicle CAD, schedule, budget, and risk deliverables following the NASA mission life cycle.",
          ],
        },
        {
          org: "USC AeroDesign Team",
          role: "Composites & Hardware Engineer",
          dates: "Jan 2026 – present",
          place: "Los Angeles, CA · Part-time",
          points: [
            "Own the design, fabrication, inspection, and testing of competition-aircraft landing gear, balancing strength, mass, manufacturability, and AIAA Aero Design requirements; size its geometry, fabricate it with carbon-fiber composites, and refine the design.",
            "Manufacture carbon-fiber and fiberglass structures through hand layup and vacuum bagging; trim, inspect, and validate parts for design conformance and flight readiness.",
            "Load-tested 5 landing-gear configurations, identified structural failure modes, and revised geometry and manufacturing methods based on test results.",
            "Work across the build and landing gear subteams, contribute to aircraft integration before flight, and use Solite covering to support a clean aerodynamic finish.",
            "Troubleshoot build issues with teammates and carry design changes through fabrication and testing.",
          ],
        },
        {
          org: "USC Fluid–Structure Interactions Lab",
          role: "CURVE Undergraduate Research Fellow",
          dates: "Aug 2025 – Aug 2026",
          place: "Los Angeles, CA",
          points: [
            "Researched how hydrofoil design affects the performance and stability of a small-scale autonomous marine vehicle, developing and comparing geometries that could improve hydrodynamic efficiency while keeping the vehicle stable in water.",
            "Designed and evaluated 20+ hydrofoil geometries in Siemens NX, varying planform and cross-sectional shapes and using quantitative trade studies to compare lift, drag, propulsion performance, and stability.",
            "Produced 3D-printed prototypes, ran instrumented experiments, analyzed data, and presented findings at the USC Viterbi Undergraduate Research Symposium.",
            "Used literature review, advisor feedback, and iterative design decisions to refine candidate geometries and connect engineering concepts to the project's experimental work.",
            "Collaborated with a small research team to discuss design tradeoffs and communicate technical findings.",
          ],
        },
      ],
    },
    {
      id: "projects",
      title: "Selected technical projects",
      entries: [
        {
          org: "USC Makers – Trick-or-Treat Animatronic",
          role: "Mechanical Design Engineer",
          dates: "Sep 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Design and 3D-print an Onshape-modeled animatronic pumpkin head with servo-actuated lid and jaw mechanisms plus integrated mounts for eye-tracking, speech, and electronic components.",
            "Create and revise mechanical parts in CAD and take responsibility for mechanical construction and assembly.",
            "Build and test the mechanical assembly alongside computer and electrical engineers integrating computer vision and AI-based interaction so the animatronic can converse with visitors and evade users reaching for candy.",
            "Iterate the design as the team integrates the mechanism, electronics, and interactive behavior; presenting the team's work at the USC Makers Fall Showcase.",
          ],
        },
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
          org: "Boeing Freshman Design Challenge",
          role: "Team member",
          dates: "Feb 2026",
          place: "",
          points: [
            "Designed and analyzed a conceptual aircraft, focusing on performance optimization and trade-offs between efficiency, stability, and overall system design; evaluated design decisions as a team and presented final recommendations.",
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
            "Help lead the planning and delivery of 12+ professional development events per year, managing schedules, budgets, logistics, timelines, stakeholder coordination, and deliverables across concurrent programs.",
            "Recruit industry speakers and lead recruiter and alumni outreach to connect students with engineers and career opportunities.",
            "Support the Meet Women in Industry event, which drew more than 80 attendees, and help lead the annual Women in Engineering Leadership Conference from planning through execution.",
            "Moderate panels and facilitate conversations between students and professionals, including an industry panel for 80+ attendees.",
          ],
        },
        {
          org: "USC Society of Women Engineers",
          role: "National Conference Attendee",
          dates: "Nov 2026",
          place: "Boston, MA",
          points: [
            "Selected for sponsorship by USC SWE to attend the national conference in Boston.",
            "Participated in a professional development and recruiting conference for women in engineering, connecting with fellow students, industry professionals, presenters, and recruiters.",
          ],
        },
        {
          org: "USC Residential Housing Association",
          role: "Resident Assistant",
          dates: "Aug 2026 – present",
          place: "Los Angeles, CA",
          points: [
            "Support the safety, well-being, and belonging of 30+ residents through regular check-ins, relationship-building, and follow-up on residents' needs and concerns.",
            "Help residents navigate community expectations and residential standards and connect with appropriate campus support, handling sensitive conversations with care and discretion.",
            "Coordinate events and resident support with a team of 19 RAs serving 700+ residents, supporting programming, communication, and day-to-day residential life.",
            "Manage assigned responsibilities and time-sensitive deadlines while contributing to a welcoming, safe, and respectful living environment.",
          ],
        },
        {
          org: "USC Viterbi School of Engineering",
          role: "Camera/Network Operator",
          dates: "Aug 2025 – present",
          place: "Los Angeles, CA · Part-time",
          points: [
            "Operate, monitor, and troubleshoot 10+ interconnected cameras, networked systems, and audiovisual equipment supporting 4 graduate engineering courses each semester, minimizing service downtime.",
            "Work in a multi-camera production environment, handling camera framing, live switching, audio, and real-time monitoring.",
            "Respond to changing production needs and technical problems during live sessions, coordinating with technical staff and communicating system status.",
            "Use the live sessions to build familiarity with advanced engineering coursework and technical discussions.",
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
