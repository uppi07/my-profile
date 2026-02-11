import { motion } from "framer-motion";
import { PROFILE } from "../data";

export default function Hero() {
  const [firstName, ...rest] = PROFILE.name.split(" ");
  const lastName = rest.join(" ");
  const totalLetters = (firstName + lastName).length;
  const letterDelay = 0.05;

  const renderLine = (text, offset = 0) =>
    text.split("").map((char, i) => (
      <motion.span
        key={`${text}-${i}`}
        initial={{ opacity: 0, y: 28, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          delay: 0.15 + (i + offset) * letterDelay,
          duration: 0.7,
          ease: [0.33, 1, 0.68, 1]
        }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <header
      id="top"
      className="relative min-h-screen flex items-center bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <div className="absolute inset-0 noise opacity-25 pointer-events-none" />

      <div className="relative w-full px-4 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 1.02 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.05, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-6 md:col-span-7"
          >
            <div className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.96] text-white/95 w-full md:max-w-[520px] space-y-2">
              <div className="flex flex-wrap">
                {renderLine(firstName)}
              </div>
              <div className="flex flex-wrap">
                {renderLine(lastName, firstName.length)}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + totalLetters * letterDelay, duration: 0.75, ease: [0.25, 0.8, 0.4, 1] }}
              className="space-y-3"
            >
              <motion.div
                className="h-[4px] bg-white/80 w-64"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.32 + totalLetters * letterDelay, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: "left center" }}
              />
              <div className="text-lg md:text-2xl font-semibold tracking-tight text-white/85">
                {PROFILE.role}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.75, ease: [0.25, 0.8, 0.4, 1] }}
          >
            <div className="w-full max-w-[520px]">
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.name} portrait`}
                className="w-full h-full object-contain mask-fade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
