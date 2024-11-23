"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface ResultsScreenProps {
  matches: string[];
  onRestart: () => void;
}

export default function ResultsScreen({
  matches,
  onRestart,
}: ResultsScreenProps) {
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center"
    >
      <motion.h2
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold mb-8"
      >
        Resultats! 🎉
      </motion.h2>

      <div className="space-y-4">
        {matches.map((match, index) => (
          <motion.div
            key={match}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">#{index + 1}</span>
              <h3 className="text-lg">{match}</h3>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-2xl"
              >
                {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="mt-8 px-6 py-2 bg-[#be2649] uppercase text-white font-bold"
      >
        Torna a realitzar el quiz
      </motion.button>
    </motion.div>
  );
}
