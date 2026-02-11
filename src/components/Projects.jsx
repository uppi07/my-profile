import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { PROJECTS } from "../data";

export default function Projects() {
  const [active, setActive] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
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

  return (
    <>
      <Section id="work" eyebrow="Projects" title="" align="center">
        <div className="w-full space-y-6 px-2">

          {/* Project container */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[#0c0d11] shadow-[0_26px_70px_-40px_rgba(0,0,0,0.9)] p-6 md:p-14 min-h-[520px]"
          >
            <AnimatePresence mode="wait">
              {PROJECTS.map((project, index) =>
                index === active ? (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onPreview={(url) => setPreviewUrl(url)}
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
        {previewUrl && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewUrl(null)}
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
                onClick={() => setPreviewUrl(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm"
              >
                ✕ Close
              </button>

              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Project Preview"
              />
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
      className="grid md:grid-cols-[2fr_1fr] gap-10 md:gap-16 h-full"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35 }}
    >
      <div className="space-y-5 md:pr-12">
        <div className="text-xs uppercase tracking-[0.22em] text-white/50">
          {project.year}
        </div>

        <h3 className="text-5xl md:text-6xl font-semibold text-white">
          {project.title}
        </h3>

        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 text-[11px] text-white/78 pt-3">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 border border-white/14 rounded-md"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm text-white/88">
        <ActionLink
          label="Live Demo"
          onClick={() => onPreview(project.links.live)}
        />

        <ActionLink
          label="GitHub"
          href={project.links.code}
          external
        />
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
