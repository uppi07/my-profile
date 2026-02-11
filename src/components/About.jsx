import { motion } from "framer-motion";
import Section from "./Section";
import { SKILLS } from "../data";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Simple, scalable, reliable">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7"
        >
          <p className="text-zinc-300 leading-relaxed">
            I’m a full-stack engineer focused on building products that feel fast and stay stable in production.
            I like clean UI, strong APIs, smart caching, and architecture that’s easy to evolve.
          </p>
          <p className="mt-4 text-zinc-300 leading-relaxed">
            I’m especially into distributed systems, microservices, and end-to-end ownership — from design to deployment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="md:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            Tools I use
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-zinc-950/30 px-3 py-1 text-xs text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
