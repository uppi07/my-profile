import { motion } from "framer-motion";
import Section from "./Section";
import { PROFILE } from "../data";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
      >
        <p className="text-zinc-300 max-w-2xl leading-relaxed">
          If you’re hiring or want to collaborate, send me a quick note.
          I reply fast and I’m happy to jump on a call.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="rounded-2xl px-5 py-3 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            Email me
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-5 py-3 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-5 py-3 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            GitHub
          </a>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-zinc-400 font-mono">
          {PROFILE.email}
        </div>
      </motion.div>
    </Section>
  );
}
