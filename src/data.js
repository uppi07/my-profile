export const PROFILE = {
  name: "Upendra Dommaraju",
  role: "Full Stack AI Engineer",
  tagline: "I build fast, scalable web apps — clean UI, strong backend, production mindset.",
  location: "Dayton, OH",
  photo: "/profile.png",
  email: "upendradommarajuu@gmail.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://www.linkedin.com/in/yourhandle/",
  resume: "#",
  availability: "Open to Full-Stack / Backend roles"
};

export const SKILLS = [
  "Node.js", "Express", "React", "Redux",
  "MongoDB", "Postgres", "MySQL",
  "Redis", "Kafka", "Docker", "Kubernetes",
  "System Design", "CI/CD"
];

export const PROJECTS = [
  {
    title: "Recruitimee",
    year: "2026",
    tagline:
      "A recruitment intelligence platform enabling candidate discovery, role matching, and structured hiring workflows with scalable search and filtering.",
    stack: ["React", "Node.js", "MySQL", "Redis", "Kafka"],
    links: {
      live: "https://www.recruitemee.com",
      code: "https://github.com/yourhandle/recruitimee"
    }
  },
  {
    title: "Appointment Booking System",
    year: "2026",
    tagline:
      "Production-style scheduling platform with dynamic availability management, conflict-free slot booking, secure JWT authentication, and automated email workflows.",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "React",
      "Tailwind",
      "JWT",
      "Nodemailer"
    ],
    links: {
      live: "https://example.com",
      code: "https://github.com/yourhandle/appointment-booking-system"
    }
  },
  {
    title: "Instagram-like Feed System",
    year: "2026",
    tagline:
      "Feed generation strategies and scalable read-optimized architecture.",
    stack: ["Node.js", "MongoDB", "Redis"],
    links: {
      live: "https://example.com",
      code: "https://github.com/yourhandle/insta-feed"
    }
  }
];


export const EXPERIENCE = [
  {
    company: "CoverMyMeds",
    title: "Software Engineer",
    period: "2022 — 2024",
    bullets: [
      "Built and shipped backend services with strong reliability and observability.",
      "Improved performance and reduced incidents via better caching + API design."
    ]
  },
  {
    company: "Bread Financial",
    title: "Software Engineer",
    period: "2021 — 2022",
    bullets: [
      "Delivered full-stack features end-to-end, from APIs to UI.",
      "Worked in Agile/Scrum with production ownership."
    ]
  },
  {
    company: "Accenture",
    title: "Software Engineer",
    period: "2019 — 2021",
    bullets: [
      "Built scalable integrations and improved internal tools.",
      "Collaborated cross-team to deliver on time with quality."
    ]
  }
];
