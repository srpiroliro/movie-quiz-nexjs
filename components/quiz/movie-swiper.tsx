"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MOVIE_DATA } from "@/lib/movie-data";
import MovieCard from "./movie-card";
import { Button } from "../ui/button";
import { Film, ThumbsDown, ThumbsUp } from "lucide-react";

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
    <div className="w-[320px] mx-auto pt-12 pb-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Troba la teva coincidència</h2>
        <p className="text-muted-foreground">
          Fes lliscar cap a la dreta per donar m&apos;agrada, a l&apos;esquerra
          per passar
        </p>
      </div>

      <div className="relative min-h-[500px]">
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

      <div className="flex justify-center gap-4 mt-6">
        {/* biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation> */}
        <button
          type="button"
          className="rounded-sm w-full flex items-center justify-center"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#be2649",
            padding: "0.75rem 2rem",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#be2649";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.color = "";
          }}
          onClick={() => handleSwipe("left")}
          disabled={exiting || currentIndex >= MOVIE_DATA.length}
        >
          <ThumbsDown className="w-8 h-auto" />
        </button>
        {/* biome-ignore lint/a11y/useKeyWithMouseEvents: <explanation> */}
        <button
          type="button"
          className="rounded-sm w-full flex items-center justify-center"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#22c55e",
            padding: "0.75rem 2rem",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#22c55e";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.color = "";
          }}
          onClick={() => handleSwipe("right")}
          disabled={exiting || currentIndex >= MOVIE_DATA.length}
        >
          <ThumbsUp className="w-8 h-auto" />
        </button>
      </div>
    </div>
  );
}
