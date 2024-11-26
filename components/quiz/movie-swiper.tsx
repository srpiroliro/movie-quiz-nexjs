"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOVIE_DATA } from "@/lib/movie-data";
import MovieCard from "./movie-card";
import { Button } from "../ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MovieSwiperProps {
  onComplete: (matches: string[]) => void;
}

export default function MovieSwiper({ onComplete }: MovieSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  const progress = ((currentIndex + 1) / MOVIE_DATA.length) * 100;
  const currentMovie = MOVIE_DATA[currentIndex];

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
    <div className="w-full max-w-lg mx-auto pt-12 pb-20 px-4">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-3xl font-bold">Troba la teva coincidència</h2>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <p className="text-lg">Llisca o fes clic als botons per decidir:</p>
            <div className="flex items-between gap-12">
              <div className="flex items-center gap-3">
                <ThumbsDown className="w-5 h-5 text-destructive" />
                <span>si no t&apos;interessa</span>
              </div>
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-5 h-5 text-[#22c55e]" />
                <span>si vols veure-la</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progrés</span>
          <span>
            {currentIndex + 1} de {MOVIE_DATA.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="relative h-[600px] w-full">
        <AnimatePresence mode="wait">
          {currentIndex < MOVIE_DATA.length && (
            <div className="absolute inset-0">
              <MovieCard
                key={currentIndex}
                movie={currentMovie}
                direction={direction}
                onSwipe={handleSwipe}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6 mt-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full p-8 aspect-square"
            onClick={() => handleSwipe("left")}
            disabled={exiting || currentIndex >= MOVIE_DATA.length}
          >
            <ThumbsDown className="w-10 h-10 text-destructive" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full p-8 aspect-square"
            onClick={() => handleSwipe("right")}
            disabled={exiting || currentIndex >= MOVIE_DATA.length}
          >
            <ThumbsUp className="w-10 h-10 text-[#22c55e]" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        {matches.length > 0 && (
          <p>
            Has donat m&apos;agrada a {matches.length}{" "}
            {matches.length === 1 ? "pel·lícula" : "pel·lícules"}
          </p>
        )}
      </motion.div>
    </div>
  );
}
