import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "../data";

export default function Navbar() {
  const [showToast, setShowToast] = useState(false);

  const handleResumeClick = () => {
    // download
    const link = document.createElement("a");
    link.href = "/UpendraDommaraju_SoftwareDeveloper.pdf";
    link.download = "Upendra_Dommaraju_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // show popup
    setShowToast(true);

    // auto hide
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <>
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="w-full px-4 md:px-8 pt-3">
          <div className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-2 md:px-4 py-3">
              <a href="#top" className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[0_10px_30px_-18px_rgba(255,255,255,0.4)]">
                  <span className="text-xs font-semibold">UD</span>
                </span>
                <span className="text-sm text-zinc-200">{PROFILE.name}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResumeClick}
                  className="hidden sm:inline-flex rounded-xl px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  Resume
                </button>

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

      {/* Toast popup */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] 
                       bg-zinc-900 border border-white/10 
                       text-white px-6 py-4 rounded-xl shadow-xl backdrop-blur-xl"
          >
            📄 Resume downloaded! Thanks for visiting 🚀
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
