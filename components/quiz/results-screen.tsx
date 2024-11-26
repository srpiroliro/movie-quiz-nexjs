"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOVIE_DATA } from "@/lib/movie-data";
import { Film } from "lucide-react";

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

  // Get the movie objects for the matches
  const matchedMovies = MOVIE_DATA.filter((movie) =>
    matches.includes(movie.title)
  ).slice(0, 3); // Only show top 3

  // Create arrays for both mobile and desktop orders
  const mobileOrder = [
    matchedMovies[0], // Winner (1st)
    matchedMovies[1], // Second place
    matchedMovies[2], // Third place
  ].filter(Boolean);

  const desktopOrder = [
    matchedMovies[1], // Second place (left)
    matchedMovies[0], // Winner (center)
    matchedMovies[2], // Third place (right)
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto text-center px-4 pt-8 pb-12"
    >
      <motion.h2
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold mb-12"
      >
        Resultats! 🎉
      </motion.h2>
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 mb-8 md:hidden">
        {mobileOrder.map((movie, index) => {
          const isWinner = index === 0;
          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <Card
                className={`overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105 ${
                  isWinner
                    ? "ring-4 ring-[#FFD700] shadow-2xl bg-gradient-to-b from-yellow-50 to-white"
                    : ""
                }`}
              >
                <div
                  className={`relative ${isWinner ? "h-[400px]" : "h-[300px]"}`}
                >
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`flex items-center justify-center bg-white rounded-full shadow-lg ${
                        isWinner ? "w-12 h-12 text-2xl" : "w-8 h-8 text-xl"
                      }`}
                    >
                      {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                    </motion.div>
                  </div>
                  {isWinner && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  )}
                </div>
                <div
                  className={`p-4 flex flex-col flex-grow ${
                    isWinner ? "p-6" : ""
                  }`}
                >
                  <h3
                    className={`font-semibold mb-2 ${
                      isWinner ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {movie.title}
                  </h3>
                  {movie.description && (
                    <p
                      className={`text-muted-foreground mb-4 flex-grow ${
                        isWinner ? "text-base" : "text-sm"
                      }`}
                    >
                      {movie.description}
                    </p>
                  )}
                  <Button
                    variant={isWinner ? "default" : "outline"}
                    className={`w-full mt-auto ${
                      isWinner
                        ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                        : ""
                    }`}
                    onClick={() =>
                      window.open(
                        `https://www.3cat.cat/programa/${movie.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    <Film className="w-4 h-4 mr-2" />
                    Veure detalls
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      ;{/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-center items-center gap-6 mb-8">
        {desktopOrder.map((movie, displayIndex) => {
          const rankMap = [1, 0, 2]; // [left, center, right] positions map to [2nd, 1st, 3rd] places
          const actualIndex = rankMap[displayIndex];
          const isWinner = actualIndex === 0 || desktopOrder.length === 1;

          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: actualIndex * 0.1 }}
              className={`w-[300px] ${isWinner ? "w-[400px] -mt-8" : ""}`}
            >
              <Card
                className={`overflow-hidden h-full flex flex-col transform transition-transform duration-300 hover:scale-105 ${
                  isWinner ? "ring-4 ring-[#FFD700] shadow-2xl" : ""
                }`}
              >
                <div
                  className={`relative ${isWinner ? "h-[400px]" : "h-[300px]"}`}
                >
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className={`flex items-center justify-center bg-white rounded-full shadow-lg ${
                        isWinner ? "w-12 h-12 text-2xl" : "w-8 h-8 text-xl"
                      }`}
                    >
                      {isWinner ? "🏆" : actualIndex === 1 ? "🥈" : "🥉"}
                    </motion.div>
                  </div>
                  {isWinner && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  )}
                </div>
                <div
                  className={`p-4 flex flex-col flex-grow ${
                    isWinner ? "p-6" : ""
                  }`}
                >
                  <h3
                    className={`font-semibold mb-2 ${
                      isWinner ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {movie.title}
                  </h3>
                  {movie.description && (
                    <p
                      className={`text-muted-foreground mb-4 flex-grow ${
                        isWinner ? "text-base" : "text-sm"
                      }`}
                    >
                      {movie.description}
                    </p>
                  )}
                  <Button
                    variant={isWinner ? "default" : "outline"}
                    className={`w-full mt-auto ${
                      isWinner
                        ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                        : ""
                    }`}
                    onClick={() =>
                      window.open(
                        `https://www.3cat.cat/programa/${movie.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      )
                    }
                  >
                    <Film className="w-4 h-4 mr-2" />
                    Veure detalls
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="mt-12 px-6 py-2 bg-[#be2649] uppercase text-white font-bold"
      >
        Torna a realitzar el quiz
      </motion.button>
    </motion.div>
  );
}
