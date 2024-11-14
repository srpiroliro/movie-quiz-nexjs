"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOVIE_DATA } from "@/lib/movie-data";
import MovieCard from "./movie-card";

interface MovieSwiperProps {
  onComplete: (matches: string[]) => void;
}

export default function MovieSwiper({ onComplete }: MovieSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  const handleSwipe = (swipeDirection: "left" | "right") => {
    if (exiting) return;

    setExiting(true);
    setDirection(swipeDirection);

    if (swipeDirection === "right") {
      setMatches([...matches, MOVIE_DATA[currentIndex].title]);
    }

    setTimeout(() => {
      if (currentIndex === MOVIE_DATA.length - 1) {
        onComplete(matches);
      } else {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      }
      setExiting(false);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Troba la teva coincidència</h2>
        <p className="text-muted-foreground">Fes lliscar cap a la dreta per donar m'agrada, a l'esquerra per passar</p>
      </div>

      <div className="relative h-[500px]">
        <AnimatePresence mode="wait">
          {currentIndex < MOVIE_DATA.length && (
            <MovieCard
              key={currentIndex}
              movie={MOVIE_DATA[currentIndex]}
              direction={direction}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
