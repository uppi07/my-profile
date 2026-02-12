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
    title: "RecruiteMee",
    year: "2026",
    tagline: "Resume Builder & Recruitment Platform",
    problem: "Users struggled with complex resume tools and poor candidate search experience.",
    solution:
      "Built a modern MERN application with intuitive resume creation, smooth workflows, and fast, user-friendly search.",
    feedback: "Client praised the clean UI/UX for improving usability and engagement.",
    stack: [],
    bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    links: {
      live: "https://www.recruitemee.com",
      code: "https://github.com/uppi07/RecruiteMee_v1"
    }
  },
  {
    title: "QuickBook",
    year: "2026",
    tagline: "Appointment booking made simple.",
    problem: "Manual calendars caused conflicts and missed appointments.",
    solution: "Providers set availability, users book in real time, with conflict checks and email confirmations.",
    feedback: "Stakeholders liked the predictable flow and fewer back-and-forths.",
    stack: [],
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    links: {
      live: "https://appointment-booking-system-57tm.vercel.app/",
      code: "https://github.com/uppi07/Appointment-Booking-System"
    }
  },
  {
    title: "RAG Intelligence Bot",
    year: "2026",
    tagline: "Enterprise RAG assistant embedded in the internal portal.",
    problem: "Employees struggled to find policies and process docs; portal search was slow and incomplete.",
    solution: "Built a RAG chatbot with vector search over internal documents, role-based access, and source citations—available directly inside the portal.",
    feedback: "Pilot teams reported faster answers and higher self-serve rates.",
    stack: [],
    bg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
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
