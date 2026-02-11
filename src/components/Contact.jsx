import { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!email) {
      setStatus("error");
      setError("Email required");
      return;
    }

    setStatus("sending");
    setError("");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);

    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}

Message:
${message || "(no message)"}`
    );

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");

    setStatus("sent");
    form.reset();
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something" align="center">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-6 md:p-10 rounded-2xl bg-transparent max-w-3xl mx-auto"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <label className="space-y-2 text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.16em] text-white/50">Name</span>
              <input type="text" name="name" placeholder="Your name"
                className="w-full rounded-xl border border-white/12 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/30 transition"
              />
            </label>

            <label className="space-y-2 text-sm text-white/80">
              <span className="text-xs uppercase tracking-[0.16em] text-white/50">Email</span>
              <input type="email" name="email" placeholder="you@example.com" required
                className="w-full rounded-xl border border-white/12 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/30 transition"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-white/80">
            <span className="text-xs uppercase tracking-[0.16em] text-white/50">Message</span>
            <textarea name="message" rows="4" placeholder="A few lines about what you need"
              className="w-full rounded-xl border border-white/12 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/25 focus:border-white/30 transition resize-none"
            />
          </label>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-white/50">
              {status === "sent"
                ? "Gmail opened. Send your message ✉️"
                : "Quick replies."}
            </div>

            <button type="submit"
              className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold tracking-tight hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={status === "sending"}
            >
              Send message
            </button>
          </div>

          {status === "error" && (
            <div className="text-xs text-red-300">
              {error || "Something went wrong. Try again."}
            </div>
          )}
        </form>
      </motion.div>
    </Section>
  );
}
