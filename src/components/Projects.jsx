import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { PROJECTS } from "../data";

export default function Projects() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;
  const AUTO_MS = 4500;

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % total), AUTO_MS);
    return () => clearInterval(id);
  }, [total]);

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);

  return (
    <Section id="work" eyebrow="Projects" title="" align="center">
      <div className="w-full space-y-6 px-2">
        <div className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0c0d11] shadow-[0_26px_70px_-40px_rgba(0,0,0,0.9)] p-6 md:p-14 min-h-[520px]">
          <AnimatePresence mode="wait">
            {PROJECTS.map((project, index) =>
              index === active ? (
                <ProjectCard key={project.title} project={project} />
              ) : null
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between text-sm text-white/70 px-1">
          <button
            onClick={prev}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="h-px w-6 bg-white/40" />
            Previous
          </button>
          <div className="text-xs font-mono tracking-wide">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
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
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div
      className="grid md:grid-cols-[2fr_1fr] items-start justify-between gap-10 md:gap-16 h-full"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex-1 space-y-5 md:pr-12">
        <div className="text-xs uppercase tracking-[0.22em] text-white/50">{project.year}</div>
        <h3 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
          {project.title}
        </h3>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5 text-[11px] text-white/78 pt-3">
          {project.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 border border-white/14 rounded-md text-white/85">
              {s}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-2.5 text-sm text-white/88 md:min-w-[200px] items-start justify-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
      >
        <ActionLink href={project.links.live} label="Live Demo" />
        <ActionLink href={project.links.code} label="GitHub" />
        <ActionLink href={project.links.live} label="Case Study" />
      </motion.div>
    </motion.div>
  );
}

function ActionLink({ href, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className="h-px w-6 bg-white/30" />
      <span>{label}</span>
    </motion.a>
  );
}
