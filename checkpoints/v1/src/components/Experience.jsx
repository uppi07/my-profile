import { motion } from "framer-motion";
import Section from "./Section";
import { EXPERIENCE } from "../data";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve done the work">
      <div className="space-y-4 md:space-y-6">
        {EXPERIENCE.map((e, idx) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(idx * 0.05, 0.2) }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">{e.company}</h3>
                <div className="text-sm text-zinc-300">{e.title}</div>
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                {e.period}
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-zinc-300">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
