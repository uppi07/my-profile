import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children, align = "left" }) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <section id={id} className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`mb-10 md:mb-12 flex flex-col ${alignClass}`}
        >
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
        </motion.div>

        <div>{children}</div>
      </div>
    </section>
  );
}
