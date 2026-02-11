import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AboutOverlay from "./components/AboutOverlay";

export default function App() {
  const [showAbout, setShowAbout] = useState(false);

  // Always start from the top on refresh (drop any hash and reset scroll)
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen relative bg-black text-white">
      {!showAbout && <Navbar />}
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />

      {!showAbout && <RightEdgeArrow onClick={() => setShowAbout(true)} />}

      <AnimatePresence>
        {showAbout && (
          <AboutOverlay
            key="about"
            onClose={() => setShowAbout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RightEdgeArrow({ onClick }) {
  return (
    <motion.button
      aria-label="More"
      onClick={onClick}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 text-white"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 0.9, x: 0 }}
      whileHover={{ opacity: 1, scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="p-3 rounded-full border border-white/18 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
        style={{ perspective: 900, transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -5, 0, 5, 0],
          rotateY: [0, -14, 0, 12, 0],
          rotateX: [0, 4, 0, -3, 0],
          scale: [1, 1.01, 1, 1.01, 1],
          opacity: [0.9, 1, 0.92, 1, 0.9],
          z: [0, 6, 0, -4, 0]
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          y: [0, -8, 0, 8, 0],
          rotateY: [0, -18, 0, 16, 0],
          rotateX: [0, 6, 0, -5, 0],
          transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          fill="none"
          className="drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
          animate={{ opacity: [0.8, 1, 0.85], scale: [1, 1.02, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="arrowGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#e6e8ee" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M16 30 L42 30 L32 20 L36 16 L52 32 L36 48 L32 44 L42 34 L16 34 Z"
            fill="url(#arrowGrad)"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
