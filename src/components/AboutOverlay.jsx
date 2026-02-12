import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FILES = ["README.md", "TechStack.json", "Experience.log", "WhyHireMe.md"];

const CONTENT = {
  "README.md": [],
  "TechStack.json": [],
  "Experience.log": [],
  "Projects.md": [],
  "WhyHireMe.md": [
    "🚀 Impact",
    "",
    "I ship production features end-to-end — React → Node/Express → Database → Cloud — without handoff friction.",
    "I deliver measurable latency and throughput improvements using caching, indexing, and async processing.",
    "",
    "🏗 Architecture",
    "",
    "I design stable API contracts and clean microservice boundaries that reduce coupling and long-term tech debt.",
    "I build event-driven systems with Kafka that scale safely and support independent deployments.",
    "",
    "🤖 AI in Production",
    "",
    "I integrate LLM APIs into live workflows using schema-validated outputs for reliability and control.",
    "I implement prompt + tool orchestration with guardrails to ensure auditable, production-safe AI systems.",
    "",
    "⚙️ Execution",
    "",
    "I write clear tickets, demo progress weekly, and document systems for smooth handoff and maintainability.",
    "I design with observability, health checks, alerts, and measurable SLOs from day one.",
    "",
    "🤝 Collaboration",
    "",
    "I align closely with frontend teams to define clean API shapes and reduce integration defects.",
    "I communicate constraints early, unblock teammates quickly, and keep delivery scope realistic."
  ]
};

export default function AboutOverlay({ onClose }) {
  const [activeFile, setActiveFile] = useState("README.md");

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0b0c0f] text-white overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
    >
      <TopBar onClose={onClose} />
      <div className="h-[calc(100%-64px)] min-h-0 flex flex-col">
        <MobileFileStrip activeFile={activeFile} setActiveFile={setActiveFile} />
        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          <Sidebar activeFile={activeFile} setActiveFile={setActiveFile} />
          <div className="flex-1 grid grid-cols-1 min-h-0 bg-[#0f1014]">
            <div className="flex flex-col min-h-0">
              <TabBar activeFile={activeFile} />
              <EditorArea activeFile={activeFile} />
            </div>
          </div>
        </div>
        <Terminal />
      </div>
      <StatusBar />
      <RightEdgeBackArrow onClick={onClose} />
      <OverlayRobotButton />
    </motion.div>
  );
}

function ExperienceTypewriter() {
  const colorMap = {
    accent: "text-[#7fd3ff]",
    green: "text-[#9de5c0]",
    purple: "text-[#c4b5fd]",
    yellow: "text-[#f6d58f]"
  };

  const lines = [
    [{ t: "accent", v: "Experience" }],
    [" "],
    [
      { t: "accent", v: "CoverMyMeds" },
      " · ",
      { t: "green", v: "Software Engineer (Internship)" },
      " · Twinsburg, Ohio · Jun 2024 - Dec 2025"
    ],
    ["• Delivered scalable backend services using Node.js, Express.js, and MongoDB on AWS (EC2), improving stability and reducing downtime."],
    ["• Evolved monolith into MERN microservices with Docker and AWS Lambda, boosting deployment independence and fault isolation."],
    ["• Designed and integrated RESTful APIs and maintained legacy SOAP integrations, reducing integration errors with partners."],
    ["• Collaborated with React teams, aligning UI components, API contracts, and backend logic for seamless delivery."],
    ["• Built MongoDB-backed pipelines with modern JS (async/await), cutting processing time for batch and transactional workloads."],
    ["• Integrated LLM APIs into backend workflows to automate analysis and decision support, reducing manual review time."],
    ["• Applied prompt engineering with structured JSON outputs for reliable, scalable AI integrations."],
    [" "],
    [
      { t: "accent", v: "Accenture" },
      " · ",
      { t: "green", v: "Full Stack Engineer" },
      " · Chennai, India · Jan 2020 - Nov 2023"
    ],
    ["• Owned Node.js/Express backend evolution with clear controller–service–data layers for testability and maintainability."],
    ["• Implemented Kafka event-driven workflows for async processing, reducing coupling across MERN services."],
    ["• Led MongoDB data modeling and indexing for low-latency, high-throughput workloads."],
    ["• Introduced Redis cache-aside on hot read paths, improving API latency by ~40% during peak traffic."],
    ["• Secured RESTful APIs with auth + validation for reliable React consumption."],
    ["• Drove OpenAPI contracts with frontend teams, reducing integration defects."],
    ["• Standardized Docker + Kubernetes deployments for consistent, scalable releases."]
  ];

  const [completed, setCompleted] = useState([]);
  const [current, setCurrent] = useState([]);
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    setCompleted([]);
    setCurrent([]);
    setDone(false);

    const typeSpeed = 1;
    const linePause = 0;
    let timer;
    let cursorTimer;
    let active = true;

    const typeLine = (li, ci) => {
      if (!active) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const parts = lines[li];
      const full = parts.map((p) => (typeof p === "string" ? p : p.v)).join("");
      if (ci <= full.length) {
        setCurrent(renderSlice(parts, ci, colorMap));
        timer = setTimeout(() => typeLine(li, ci + 1), typeSpeed);
      } else {
        setCompleted((prev) => [...prev, parts]);
        setCurrent([]);
        timer = setTimeout(() => typeLine(li + 1, 0), linePause);
      }
    };

    timer = setTimeout(typeLine, 0, 0, 0);
    cursorTimer = setInterval(() => setCursorOn((c) => !c), 500);

    return () => {
      active = false;
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="flex-1 bg-[#0f1014] relative overflow-auto px-8 py-10">
      <div className="font-mono text-[14px] leading-7 text-[#d4d4d4] max-w-4xl mx-auto">
        {completed.map((parts, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {parts.map((p, idx) => {
              if (typeof p === "string") return <span key={idx}>{p}</span>;
              return <span key={idx} className={colorMap[p.t] || ""}>{p.v}</span>;
            })}
          </div>
        ))}
        {!done && (
          <div className="whitespace-pre-wrap">
            {current}
          </div>
        )}
      </div>
    </div>
  );
}

function WhyHireMeView() {
  const colorMap = {
    heading: "text-[#7fd3ff]",
    accent: "text-[#9de5c0]",
    purple: "text-[#c4b5fd]",
    yellow: "text-[#f6d58f]"
  };

  const lines = [
    [{ t: "heading", v: "🚀 Impact" }],
    ["I ship production features end-to-end — React → Node/Express → Database → Cloud — without handoff friction."],
    ["I deliver measurable latency and throughput improvements using ", { t: "accent", v: "caching" }, ", ", { t: "accent", v: "indexing" }, ", and ", { t: "accent", v: "async processing" }, "."],
    [" "],
    [{ t: "heading", v: "🏗 Architecture" }],
    ["I design stable API contracts and clean microservice boundaries that reduce coupling and long-term tech debt."],
    ["I build event-driven systems with ", { t: "purple", v: "Kafka" }, " that scale safely and support independent deployments."],
    [" "],
    [{ t: "heading", v: "🤖 AI in Production" }],
    ["I integrate LLM APIs into live workflows using schema-validated outputs for reliability and control."],
    ["I implement prompt + tool orchestration with guardrails to ensure auditable, production-safe AI systems."],
    [" "],
    [{ t: "heading", v: "⚙️ Execution" }],
    ["I write clear tickets, demo progress weekly, and document systems for smooth handoff and maintainability."],
    ["I design with observability, health checks, alerts, and measurable SLOs from day one."],
    [" "],
    [{ t: "heading", v: "🤝 Collaboration" }],
    ["I align closely with frontend teams to define clean API shapes and reduce integration defects."],
    ["I communicate constraints early, unblock teammates quickly, and keep delivery scope realistic."]
  ];

  return (
    <div className="flex-1 bg-[#0f1014] overflow-auto px-8 py-10">
      <div className="font-mono text-[14px] leading-7 text-[#d4d4d4] max-w-4xl mx-auto space-y-1">
        {lines.map((parts, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {parts.map((p, idx) => {
              if (typeof p === "string") return <span key={idx}>{p}</span>;
              const cls = colorMap[p.t] || "";
              return (
                <span key={idx} className={cls}>
                  {p.v}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TopBar({ onClose }) {
  return (
    <div className="h-10 flex items-center px-4 bg-[#111319] border-b border-white/10 text-xs text-white/70 select-none">
      <div className="flex items-center gap-2 flex-1">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3c4048]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3c4048]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3c4048]" />
        <span className="ml-3 text-white/80">Portfolio — Workspace</span>
      </div>
      <button onClick={onClose} className="px-2 py-1 text-white/60 hover:text-white text-xs">
        Close
      </button>
    </div>
  );
}

function MobileFileStrip({ activeFile, setActiveFile }) {
  return (
    <div className="md:hidden sticky top-10 z-30 bg-[#0b0c0f]/95 backdrop-blur-md border-b border-white/10 px-3 py-3 overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max">
        {FILES.map((file) => {
          const active = file === activeFile;
          return (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-3 py-2 rounded-lg border text-[11px] font-mono transition ${
                active
                  ? "bg-white/15 border-white/30 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white"
              }`}
            >
              {file}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sidebar({ activeFile, setActiveFile }) {
  return (
    <div className="w-64 bg-[#0f1114] border-r border-white/10 text-sm select-none hidden md:flex flex-col">
      <div className="px-3 py-2 text-white/60 uppercase text-[11px] tracking-[0.18em]">Explorer</div>
      <div className="flex-1">
        {FILES.map((file) => {
          const active = file === activeFile;
          return (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`w-full px-3 py-2 flex items-center gap-2 text-left transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <span className="text-white/50">▸</span>
              <span className="font-mono text-xs md:text-sm">{file}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabBar({ activeFile }) {
  return (
    <div className="h-9 flex items-center px-4 border-b border-white/10 text-xs text-white/70 bg-[#111319]">
      <div className="flex items-center gap-2 bg-[#1a1d24] border border-white/12 rounded-sm px-3 py-1 text-white/85">
        <span className="w-2 h-2 rounded-full bg-[#61dafb]" />
        <span className="font-mono text-xs">{activeFile}</span>
        <span className="text-white/40 text-[10px]">×</span>
      </div>
    </div>
  );
}

function EditorArea({ activeFile }) {
  if (activeFile === "README.md") return <ReadmeTypewriter />;
  if (activeFile === "TechStack.json") return <TechStackOrbit />;
  if (activeFile === "Experience.log") return <ExperienceTypewriter />;
  if (activeFile === "WhyHireMe.md") return <WhyHireMeView />;

  const lines = useMemo(() => CONTENT[activeFile] || [], [activeFile]);

  return (
    <div className="flex-1 min-h-0 overflow-auto font-mono text-sm leading-6 text-[#d4d4d4] bg-[#0f1014] max-h-[calc(100vh-240px)] md:max-h-none">
      <div className="grid grid-cols-[auto_1fr] gap-4 px-6 py-6">
        <div className="text-right pr-3 text-[#58606f] select-none">
          {lines.map((_, i) => (
            <div key={i}>{String(i + 1).padStart(2, "0")}</div>
          ))}
        </div>
        <div className="space-y-1">
          {lines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {line === "" ? "\u00a0" : line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReadmeTypewriter() {
  const lines = [
    ['Hi, I’m ', { t: 'accent', v: 'Upendra Dommaraju' }, ', a ', { t: 'green', v: 'Full-Stack Engineer' }, ' with 5+ years designing and building scalable backend systems and cloud-native microservices.'],
    ['I specialize in the ', { t: 'purple', v: 'MERN stack' }, ', event-driven architectures with ', { t: 'accent', v: 'Kafka' }, ', and performance optimization using ', { t: 'accent', v: 'Redis cache-aside' }, ' patterns.'],
    ['I’ve built distributed services with ', { t: 'accent', v: 'Node.js' }, ', ', { t: 'accent', v: 'Express' }, ', ', { t: 'accent', v: 'MongoDB' }, ', and ', { t: 'accent', v: 'AWS' }, ', focused on scalability, reliability, and clean architecture.'],
    ['Recently, I’ve integrated ', { t: 'purple', v: 'LLM APIs' }, ' and AI-powered workflows into production systems to automate decision-making and improve processing efficiency.'],
    ['From ', { t: 'accent', v: 'frontend interactions' }, ','],
    ['to ', { t: 'accent', v: 'backend architecture' }, ','],
    ['to ', { t: 'purple', v: 'AI-powered workflows' }, ','],
    ['I focus on ', { t: 'green', v: 'scalable systems' }, ', ', { t: 'green', v: 'clean contracts' }, ', and ', { t: 'green', v: 'reliable delivery' }, '.'],
    ['My core strength lies in ', { t: 'yellow', v: 'system design' }, ', ', { t: 'yellow', v: 'distributed systems' }, ', and building production-grade APIs that scale under load.']
  ];

  const colorMap = {
    accent: 'text-[#7fd3ff]',
    green: 'text-[#9de5c0]',
    purple: 'text-[#c4b5fd]',
    yellow: 'text-[#f6d58f]'
  };

  const [completed, setCompleted] = useState([]);
  const [current, setCurrent] = useState([]);
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    // reset state on mount to avoid duplicate runs when remounting
    setCompleted([]);
    setCurrent([]);
    setDone(false);

    const typeSpeed = 1;
    const linePause = 0;
    let timer;
    let cursorTimer;
    let active = true;

    const typeLine = (li, ci) => {
      if (!active) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const parts = lines[li];
      const full = parts.map((p) => (typeof p === "string" ? p : p.v)).join("");
      if (ci <= full.length) {
        setCurrent(renderSlice(parts, ci, colorMap));
        timer = setTimeout(() => typeLine(li, ci + 1), typeSpeed);
      } else {
        setCompleted((prev) => [...prev, parts]);
        setCurrent([]);
        timer = setTimeout(() => typeLine(li + 1, 0), linePause);
      }
    };

    timer = setTimeout(typeLine, 0, 0, 0);
    cursorTimer = setInterval(() => setCursorOn((c) => !c), 500);

    return () => {
      active = false;
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  return (
    <div className="flex-1 bg-[#0f1014] relative overflow-auto md:overflow-hidden px-6 md:px-8 py-8 md:py-10 max-h-[calc(100vh-240px)] md:max-h-none">
      <div className="font-mono text-[15px] leading-7 text-[#d4d4d4] max-w-3xl mx-auto">
        {completed.slice(0, lines.length).map((parts, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {parts.map((p, idx) => {
              if (typeof p === "string") return <span key={idx}>{p}</span>;
              return <span key={idx} className={colorMap[p.t] || ""}>{p.v}</span>;
            })}
          </div>
        ))}
        {!done && (
          <div className="whitespace-pre-wrap">
            {current}
          </div>
        )}
      </div>
    </div>
  );
}

function renderSlice(parts, maxChars, colorMap) {
  let remaining = maxChars;
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const text = typeof p === "string" ? p : p.v;
    if (remaining <= 0) break;
    const take = Math.min(remaining, text.length);
    const slice = text.slice(0, take);
    out.push(
      <span key={i} className={typeof p === "string" ? "" : colorMap[p.t] || ""}>
        {slice}
      </span>
    );
    remaining -= take;
  }
  return out;
}

function TechStackOrbit() {
  const tech = useMemo(
    () => [
      // Languages
      { name: "JavaScript (ES6+)", group: "Languages" },
      { name: "TypeScript", group: "Languages" },
      { name: "Python", group: "Languages" },
      { name: "SQL", group: "Languages" },
      // Frontend
      { name: "HTML5", group: "Frontend" },
      { name: "CSS3", group: "Frontend" },
      { name: "React.js", group: "Frontend" },
      { name: "Redux", group: "Frontend" },
      { name: "Next.js", group: "Frontend" },
      // Backend & APIs
      { name: "Node.js", group: "Backend" },
      { name: "Express.js", group: "Backend" },
      { name: "RESTful API Design", group: "Backend" },
      { name: "API Versioning", group: "Backend" },
      { name: "Idempotency", group: "Backend" },
      { name: "JWT / OAuth2", group: "Backend" },
      { name: "Secure API Design", group: "Backend" },
      { name: "RBAC", group: "Backend" },
      { name: "Async Programming", group: "Backend" },
      { name: "API Docs / OpenAPI", group: "Backend" },
      // AI & LLM
      { name: "LLM API Integration", group: "AI" },
      { name: "Prompt Engineering", group: "AI" },
      { name: "RAG", group: "AI" },
      { name: "Embeddings & Semantic Search", group: "AI" },
      { name: "Vector Databases", group: "AI" },
      { name: "AI Workflow Orchestration", group: "AI" },
      { name: "Streaming AI Responses", group: "AI" },
      { name: "AI Cost Optimization", group: "AI" },
      { name: "Prompt Injection Mitigation", group: "AI" },
      { name: "Retry & Fallback Strategies", group: "AI" },
      // Microservices & Distributed
      { name: "Microservices Architecture", group: "Distributed" },
      { name: "Event-Driven Systems", group: "Distributed" },
      { name: "Async Messaging", group: "Distributed" },
      { name: "Service-to-Service Comm", group: "Distributed" },
      { name: "System Design", group: "Distributed" },
      { name: "Apache Kafka", group: "Messaging" },
      { name: "API Gateway", group: "Distributed" },
      { name: "API Testing", group: "Distributed" },
      // Data & Caching
      { name: "MongoDB", group: "Data" },
      { name: "PostgreSQL / MySQL", group: "Data" },
      { name: "Redis (Cache-aside)", group: "Data" },
      { name: "Indexing Strategies", group: "Data" },
      { name: "Data Modeling", group: "Data" },
      { name: "Read/Write Optimization", group: "Data" },
      { name: "Consistency & Perf Trade-offs", group: "Data" },
      // Cloud & Platform
      { name: "CI/CD", group: "Platform" },
      { name: "Docker", group: "Platform" },
      { name: "Kubernetes (Pods/Deploy/Autoscale)", group: "Platform" },
      { name: "AWS (EC2, S3, RDS, Lambda)", group: "Platform" },
      { name: "Cloud-Native Design", group: "Platform" },
      { name: "Nginx Reverse Proxy / LB", group: "Platform" },
      // Observability & Ops
      { name: "Structured Logging", group: "Ops" },
      { name: "Metrics (Prometheus style)", group: "Ops" },
      { name: "Monitoring & Alerting", group: "Ops" },
      { name: "Production Debugging", group: "Ops" },
      // Core CS
      { name: "Data Structures & Algorithms", group: "CS" },
      { name: "Object-Oriented Design", group: "CS" },
      { name: "Operating Systems", group: "CS" },
      { name: "DBMS Fundamentals", group: "CS" }
    ],
    []
  );

  const [focused, setFocused] = useState(tech[0]);

  return (
    <div className="flex-1 bg-[#0f1014] relative overflow-hidden px-4 sm:px-6 py-6 sm:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.04),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_45%)]" />

      <div className="relative h-full min-h-[420px] md:min-h-[520px] flex items-center justify-center px-2">
        <div
          className="relative w-full max-w-6xl max-h-[70vh] rounded-2xl border border-white/8 bg-[#0b0c10]/70 backdrop-blur-[2px] overflow-auto p-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tech.map((item, idx) => {
              const isFocused = focused?.name === item.name;
              const floatDuration = 6 + (idx % 4);
              return (
                <motion.button
                  key={item.name}
                  onClick={() => setFocused(item)}
                  className="text-left"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`min-h-[68px] rounded-xl px-4 py-3 shadow-[0_14px_26px_rgba(0,0,0,0.28)] border border-white/12 bg-white/[0.05] text-white/90 font-semibold text-sm ${
                      isFocused ? "ring-2 ring-white/60" : ""
                    }`}
                    animate={{
                      y: [0, -2, 0, 2, 0],
                      opacity: isFocused ? 1 : 0.9,
                      scale: isFocused ? 1.06 : 1
                    }}
                    transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-base leading-tight">{item.name}</div>
                    <div className="text-[11px] text-white/60 font-normal mt-1">{item.group}</div>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-white/65 text-xs font-mono mt-6">
            <span>Hover = highlight · Click = focus · Grid layout</span>
            <motion.span
              className="text-white/85 text-sm font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {focused?.name} · {focused?.group}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
function VisualRightPanel({ activeFile }) {
  const showCodeFlow = activeFile === "TechStack.json";
  const showHero = activeFile === "README.md";

  return (
    <div
      id="viz-panel"
      className="hidden lg:flex flex-col min-h-0 border-l border-white/10 bg-[#0f1014] relative overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.03),transparent_50%)] opacity-40" />
      <div className="relative flex-1 flex items-center justify-center text-white/60 text-xs uppercase tracking-[0.18em]">
        {showHero ? <HeroWorkflowVisual /> : showCodeFlow ? <CodeFlowVisual /> : <div className="text-white/50">System Visual</div>}
      </div>
    </div>
  );
}

function HeroWorkflowVisual() {
  const stages = [
    { label: "DESIGN", color: "#4fd1ff", glow: "0 10px 30px rgba(79,209,255,0.35)" },
    { label: "BUILD", color: "#b887ff", glow: "0 10px 30px rgba(184,135,255,0.35)" },
    { label: "TEST", color: "#7cf5a1", glow: "0 10px 30px rgba(124,245,161,0.32)" },
    { label: "DEPLOY", color: "#ffb86c", glow: "0 10px 30px rgba(255,184,108,0.32)" },
    { label: "MAINTAIN", color: "#ff7b7b", glow: "0 10px 30px rgba(255,123,123,0.32)" }
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, 2000); // 2s per step
    return () => clearInterval(id);
  }, [stages.length]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-8 py-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d14] via-[#0c1220] to-[#05060a]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-[#4fd1ff]/10 blur-3xl -top-10 left-10" />
        <div className="absolute w-48 h-48 bg-[#b887ff]/12 blur-3xl bottom-10 right-6" />
      </div>

        <div className="relative w-full max-w-2xl flex flex-col gap-6">
        <div className="relative flex flex-col gap-4">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.label}
              className="relative flex items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="h-14 md:h-16 flex-1 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm px-4 md:px-5 flex items-center"
                style={{
                  boxShadow: stage.glow,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
                }}
                animate={{
                  y: [0, -3, 0, 3, 0],
                  scale: active === idx ? 1.06 : 1,
                  boxShadow: active === idx ? `${stage.glow}, 0 0 22px ${stage.color}40` : stage.glow,
                  opacity: active === idx ? 1 : 0.8
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  className="text-sm md:text-base font-semibold tracking-wide"
                  style={{ color: stage.color, textShadow: stage.glow }}
                >
                  {stage.label}
                </div>
              </motion.div>

            </motion.div>
          ))}
        </div>

        {/* tagline intentionally removed for a cleaner hero */}
      </div>
    </div>
  );
}

function CodeFlowVisual() {
  const lines = useMemo(
    () => [
      { stage: "Frontend", text: "<Button onClick={() => fetch('/api/orders')}/>" },
      { stage: "Frontend", text: "useEffect(() => loadProfile(), [])" },
      { stage: "API", text: "router.get('/api/orders', auth, ctrl.list)" },
      { stage: "Backend", text: "const orders = await OrderService.list(userId);" },
      { stage: "DB", text: "db.orders.find({ userId }).sort({ createdAt: -1 })" },
      { stage: "Backend", text: "return res.json({ data: orders });" },
      { stage: "API", text: "router.post('/api/checkout', rateLimit, ctrl.checkout)" },
      { stage: "Backend", text: "await PaymentGateway.charge(card, amount);" },
      { stage: "DB", text: "db.transactions.insertOne({ userId, status: 'paid' })" },
      { stage: "AI", text: "const summary = await ai.summarize(orderHistory);" },
      { stage: "Frontend", text: "setRecommendations(summary.items);" }
    ],
    []
  );

  const stageColor = {
    Frontend: "text-[#7fd3ff]",
    API: "text-[#9de5c0]",
    Backend: "text-[#c4b5fd]",
    DB: "text-[#f6d58f]",
    AI: "text-[#ffa8e8]"
  };

  return (
    <div className="relative h-full w-full px-6 py-8">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0f1014] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0f1014] to-transparent pointer-events-none" />

      <div className="relative h-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, blockIdx) => (
            <div key={blockIdx} className="space-y-3">
              {lines.map((line, i) => (
                <div
                  key={`${blockIdx}-${i}`}
                  className="flex items-start gap-3 font-mono text-[12.5px] leading-6 text-white/85"
                >
                  <div className="w-2 h-2 rounded-full bg-white/20 mt-2 shadow-[0_0_0_4px_rgba(255,255,255,0.03)]" />
                  <div className="flex-1">
                    <div className={`text-[11px] uppercase tracking-[0.18em] text-white/50`}>{line.stage}</div>
                    <div className={`${stageColor[line.stage] || "text-white/80"} whitespace-pre`}>
                      {line.text}
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-6" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Terminal() {
  return (
    <div className="h-36 sm:h-40 md:h-44 border-t border-white/10 bg-[#0f1114] text-[#d4d4d4] font-mono text-sm px-4 py-3 flex flex-col gap-2 select-none">
      <div className="text-white/70 text-xs uppercase tracking-[0.18em]">TERMINAL</div>
      <div className="flex-1 bg-[#0b0c10] border border-white/10 px-3 py-2 overflow-auto flex flex-col justify-start rounded">
        <div className="space-y-1 text-[#a9b2c0] break-all selection:bg-white selection:text-black">
          <div>
            $ <a className="underline text-white" href="https://www.linkedin.com/in/upendradommaraju/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/upendradommaraju/</a>
          </div>
          <div>
            $ <a className="underline text-white" href="https://github.com/uppi07" target="_blank" rel="noreferrer">https://github.com/uppi07</a>
          </div>
          <div>
            $ <a className="underline text-white" href="https://leetcode.com/u/Uppi_007/" target="_blank" rel="noreferrer">https://leetcode.com/u/Uppi_007/</a>
          </div>
          <div>
            $ <a className="underline text-white" href="mailto:upendradommarajuu@gmail.com">upendradommarajuu@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-7 bg-[#007acc] text-white text-xs font-mono px-3 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
      <div className="flex items-center gap-3 text-white/90">
        <span>Ready</span>
      </div>
    </div>
  );
}

function RightEdgeBackArrow({ onClick }) {
  return (
    <motion.button
      aria-label="Back to main"
      onClick={onClick}
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 text-white hidden md:block"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 0.9, x: 0 }}
      whileHover={{ opacity: 1, scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="p-4 rounded-full border border-white/18 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
        style={{ perspective: 900, transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -5, 0, 5, 0],
          rotateY: [0, 14, 0, -12, 0],
          rotateX: [0, 3, 0, -4, 0],
          scale: [1, 1.01, 1, 1.01, 1],
          opacity: [0.9, 1, 0.92, 1, 0.9],
          z: [0, 6, 0, -4, 0]
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          y: [0, -8, 0, 8, 0],
          rotateY: [0, 18, 0, -16, 0],
          rotateX: [0, 5, 0, -6, 0],
          transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <motion.svg
          width="36"
          height="36"
          viewBox="0 0 64 64"
          fill="none"
          className="drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
          animate={{
            opacity: [0.8, 1, 0.85],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M48 30 L22 30 L32 20 L28 16 L12 32 L28 48 L32 44 L22 34 L48 34 Z"
            fill="#f5f7fb"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}

function OverlayRobotButton() {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      aria-label="Assistant"
      onClick={() => setOpen((v) => !v)}
      className="fixed right-4 bottom-12 md:right-6 md:bottom-14 z-50"
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 0.9, scale: 1, y: 0 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="p-3 rounded-full border border-black/10 bg-white text-black shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M12 2v3" />
          <rect x="5" y="7" width="14" height="10" rx="3" />
          <path d="M5 11H3" />
          <path d="M21 11h-2" />
          <path d="M8 21h8" />
          <path d="M9 17v2" />
          <path d="M15 17v2" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
        </svg>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 bottom-16 w-56 rounded-2xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] p-3 text-left text-black"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-black/60 mb-2">Assistant</div>
            <div className="text-sm text-black/80">Soon...</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
