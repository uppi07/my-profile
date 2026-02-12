import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { PROJECTS } from "../data";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [previewData, setPreviewData] = useState(null);
  const [paused, setPaused] = useState(false);

  const total = PROJECTS.length;
  const AUTO_MS = 4500;

  // Auto carousel with pause on hover
  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, AUTO_MS);

    return () => clearInterval(id);
  }, [total, paused]);

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  const handlePointerEnter = (e) => {
    // Only pause auto-rotate for mouse/trackpad, keep touch devices rotating
    if (e.pointerType === "mouse") setPaused(true);
  };

  const handlePointerLeave = () => setPaused(false);

  return (
    <>
      <Section id="work" eyebrow="Projects" title="" align="center">
        <div className="w-full space-y-6 px-2">

          {/* Project container */}
          <div
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative overflow-hidden rounded-[18px] border-[1.4px] border-white/16 border-b-[2px] border-b-white/18 bg-[#0c0d11] shadow-[0_26px_70px_-40px_rgba(0,0,0,0.9)] min-h-[520px] md:h-[560px]"
          >
            <AnimatePresence mode="wait">
              {PROJECTS.map((project, index) =>
                index === active ? (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onPreview={(projectItem) => {
                      if (projectItem.title === "RAG Intelligence Bot") {
                        setPreviewData({ type: "rag" });
                      } else {
                        setPreviewData({ type: "url", url: projectItem.links.live });
                      }
                    }}
                  />
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-sm text-white/70 px-1">
            <button
              onClick={prev}
              className="flex items-center gap-2 hover:text-white transition"
            >
              <span className="h-px w-6 bg-white/40" />
              Previous
            </button>

            <div className="text-xs font-mono tracking-wide">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </div>

            <button
              onClick={next}
              className="flex items-center gap-2 hover:text-white transition"
            >
              Next
              <span className="h-px w-6 bg-white/40" />
            </button>
          </div>
        </div>
      </Section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewData(null)}
          >
            <motion.div
              className="relative w-[95%] h-[90%] bg-black rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm"
              >
                ✕ Close
              </button>

              {previewData.type === "rag" ? (
                <RagPreviewAnimation />
              ) : (
                <iframe
                  src={previewData.url}
                  className="w-full h-full border-0"
                  title="Project Preview"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, onPreview }) {
  return (
    <motion.div
      className="relative h-full overflow-hidden"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35 }}
    >
      {project.bg && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-65 blur-[14px]"
            style={{ backgroundImage: `url(${project.bg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/68 via-[#0c0d11]/48 to-[#0c0d11]/82" />
        </>
      )}

      <div className="relative grid md:grid-cols-[2fr_1fr] gap-10 md:gap-16 h-full p-6 md:p-14 pb-12 md:pb-14 overflow-y-auto">
        <div className="relative space-y-5 md:pr-12">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">
            {project.year}
          </div>

          <h3 className="text-5xl md:text-6xl font-semibold text-white">
            {project.title}
          </h3>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {project.tagline}
          </p>

          {project.problem && (
            <DetailBlock label="Client Problem" text={project.problem} />
          )}

          {project.solution && (
            <DetailBlock label="What I Built" text={project.solution} />
          )}

          {project.feedback && (
            <DetailBlock label="Client Feedback" text={project.feedback} />
          )}

        </div>

        <div className="relative flex flex-col gap-3 text-sm text-white/88">
          <ActionLink
            label="Live Demo"
            onClick={() => onPreview(project)}
          />

          <ActionLink
            label="GitHub"
            href={project.links.code}
            external
          />
        </div>
      </div>
    </motion.div>
  );
}

function ActionLink({ label, href, external, onClick }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
      >
        <span className="h-px w-6 bg-white/30" />
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
    >
      <span className="h-px w-6 bg-white/30" />
      {label}
    </button>
  );
}

function DetailBlock({ label, text }) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
        {label}
      </div>
      <div className="text-base md:text-lg text-white/82 leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function RagPreviewAnimation() {
  const files = [
    "policies.pdf",
    "runbooks.md",
    "sops.docx",
    "faq.csv",
    "release-notes.md",
    "audits.xlsx",
    "oncall-playbook.md",
    "infosec-standards.pdf"
  ];

  // Build a sequential chat timeline (user -> bot -> user ...) with cumulative delays
  const baseChat = [
    { role: "user", text: "Need access control rules for prod APIs." },
    { role: "bot", text: "Found policy 4.2.1: MFA required, least-privilege roles, audit logging on admin actions." },
    { role: "user", text: "Restart playbook for payment service?" },
    { role: "bot", text: "Use ops/runbooks.md#L48-L71: drain traffic, restart pod set, run health check, re-enable." },
    { role: "user", text: "Any PII caveats for exports?" },
    { role: "bot", text: "Mask PAN, redact SSN, encrypt at rest, expire links after 24h. Cites policy 4.3.4." },
    { role: "user", text: "Citations?" },
    { role: "bot", text: "policy.pdf §4.2.1, §4.3.4 · ops/runbooks.md#L48-L71" }
  ];

  const BOT_THINK_MS = 3000;
  const BOT_TYPE_MS = 45;
  const USER_TYPE_MS = 70; // moderate
  const GAP_MS = 400; // small pause between messages

  let elapsed = 0;
  const chat = baseChat.map((m, idx) => {
    const words = m.text.split(" ").length;
    const think = m.role === "bot" ? BOT_THINK_MS : 0;
    const typeMs = words * (m.role === "bot" ? BOT_TYPE_MS : USER_TYPE_MS);
    const start = elapsed;
    elapsed += think + typeMs + GAP_MS;
    return { ...m, delay: start / 1000 };
  });

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-black via-[#05070d] to-[#020305] text-white p-6 md:p-10 flex flex-col gap-6 overflow-hidden">
      {/* Soft glows */}
      <div className="absolute -left-10 -top-16 h-64 w-64 bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 bg-indigo-500/10 blur-3xl" />

      <div className="relative text-xl md:text-2xl font-semibold tracking-tight">
        RAG Intelligence Bot · confidential preview
      </div>

      <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-4 md:gap-6 flex-1 min-h-0">
        {/* Chat panel */}
        <div className="bg-white/6 border border-white/10 rounded-2xl p-0 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]" />
            <div className="text-sm font-semibold">RAG Bot</div>
            <div className="text-xs text-white/60">Internal chat · citations on</div>
          </div>
          <div className="flex-1 min-h-0 overflow-auto px-4 py-4 flex flex-col gap-3">
            {chat.map((m) => (
              <ChatBubble key={m.text} role={m.role} text={m.text} delay={m.delay} />
            ))}
            <div className="mt-1 flex items-center gap-2 text-emerald-200 text-xs font-mono">
              <TypingDots /> drafting follow-ups...
            </div>
          </div>
          <div className="px-4 py-3 border-t border-white/10 bg-black/40 text-xs text-white/60 font-mono flex items-center gap-2">
            🔒 Demo disabled (confidential). Showing simulated chat flow.
          </div>
        </div>

        {/* Reading / sources panel */}
        <div className="bg-white/6 border border-white/10 rounded-2xl p-4 md:p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm flex flex-col gap-4 overflow-hidden">
          <div className="text-xs uppercase tracking-[0.22em] text-white/55">Reading sources</div>
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="absolute inset-1 rounded-xl bg-gradient-to-b from-white/4 to-white/0"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative space-y-2 text-sm">
              {files.map((f, i) => (
                <motion.div
                  key={f}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white/8 border border-white/10"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.35 }}
                >
                  <motion.span
                    className="h-2.5 w-2.5 rounded-full bg-emerald-300"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
                  />
                  <span className="font-mono">{f}</span>
                  <motion.div className="ml-auto h-1 rounded-full bg-white/15 w-16 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-300"
                      initial={{ width: "10%" }}
                      animate={{ width: ["30%", "90%", "60%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="absolute left-2 right-2 h-16 rounded-xl border border-white/6 bg-white/5 overflow-hidden mt-4"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-40%", "120%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
              <div className="h-full flex items-center px-3 text-xs text-white/70 font-mono">
                <span className="mr-2">🔍</span> vector search · embeddings · policy corpus
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative text-[11px] text-white/60 font-mono">
        Demo disabled for confidential client — showing simulated chat and retrieval flow instead.
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-emerald-200"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ role, text, delay = 0 }) {
  const isBot = role === "bot";
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);
  const [show, setShow] = useState(false);
  const [thinking, setThinking] = useState(isBot);
  const typingTimerRef = useRef(null);
  const thinkingTimerRef = useRef(null);
  const startTimerRef = useRef(null);

  useEffect(() => {
    const BOT_THINK_MS = 3000;
    const BOT_TYPE_MS = 45;
    const USER_TYPE_MS = 70;

    const clearTimers = () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (thinkingTimerRef.current) {
        clearTimeout(thinkingTimerRef.current);
        thinkingTimerRef.current = null;
      }
      if (startTimerRef.current) {
        clearTimeout(startTimerRef.current);
        startTimerRef.current = null;
      }
    };

    clearTimers();
    setVisibleCount(0);
    setShow(false);
    setThinking(isBot);

    startTimerRef.current = setTimeout(() => {
      setShow(true);

      const startTyping = (intervalMs) => {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        typingTimerRef.current = setInterval(() => {
          setVisibleCount((v) => {
            if (v >= words.length) {
              clearInterval(typingTimerRef.current);
              return v;
            }
            return v + 1;
          });
        }, intervalMs);
      };

      if (isBot) {
        thinkingTimerRef.current = setTimeout(() => {
          setThinking(false);
          startTyping(BOT_TYPE_MS);
        }, BOT_THINK_MS);
      } else {
        setThinking(false);
        startTyping(USER_TYPE_MS);
      }
    }, delay * 1000);

    return clearTimers;
  }, [delay, isBot, text, words.length]);

  return (
    <motion.div
      className={`max-w-[92%] md:max-w-[82%] rounded-2xl px-3.5 py-2.5 border ${
        isBot
          ? "bg-emerald-400/10 border-emerald-300/40 text-emerald-50"
          : "bg-white/8 border-white/12 text-white"
      } shadow-[0_12px_36px_-24px_rgba(0,0,0,0.7)]`}
      initial={{ opacity: 0, y: isBot ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{ alignSelf: isBot ? "flex-end" : "flex-start" }}
    >
      <div className="text-[10px] uppercase tracking-[0.18em] mb-1 opacity-70">
        {isBot ? "Assistant" : "User"}
      </div>
      <div className="leading-relaxed">
        {!show ? null : thinking ? (
          <div className="flex items-center gap-2 text-emerald-200">
            <TypingDots />
            <span className="text-xs">thinking...</span>
          </div>
        ) : (
          <>
            {words.slice(0, visibleCount).join(" ")}
            {visibleCount < words.length && <span className="animate-pulse">▋</span>}
          </>
        )}
      </div>
    </motion.div>
  );
}
