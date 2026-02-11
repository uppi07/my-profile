import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(index * 0.05, 0.2) }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
    >
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
              {project.year}
            </div>
            <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-zinc-300">
              {project.tagline}
            </p>
          </div>

          <div className="shrink-0">
            <div className="h-14 w-14 rounded-2xl border border-white/10 bg-zinc-950/40 flex items-center justify-center">
              <span className="text-xs text-zinc-300">↗</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-zinc-950/30 px-3 py-1 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            Live
          </a>
          <a
            href={project.links.code}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            Code
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      </div>
    </motion.article>
  );
}
