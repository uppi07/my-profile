import { motion } from "framer-motion";
import { PROFILE } from "../data";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="w-full px-4 md:px-8 pt-3">
        <div className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-2 md:px-4 py-3">
            <a href="#top" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[0_10px_30px_-18px_rgba(255,255,255,0.4)]">
                <span className="text-xs font-semibold">UD</span>
              </span>
              <span className="text-sm text-zinc-200">{PROFILE.name}</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-zinc-300 hover:text-white transition"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                className="hidden sm:inline-flex rounded-xl px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
                href={PROFILE.resume}
              >
                Resume
              </a>
              <a
                className="inline-flex rounded-xl px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
                href="#contact"
              >
                Let’s talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
