"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Movie } from "@/lib/movie-data";
import { useEffect } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  direction: "left" | "right" | null;
  onSwipe: (direction: "left" | "right") => void;
}

export default function MovieCard({
  movie,
  direction,
  onSwipe,
}: MovieCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-30, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  // Add color overlay based on swipe direction
  const backgroundColor = useTransform(
    x,
    [-300, 0, 300],
    [
      "rgba(239, 68, 68, 0.3)", // Red with higher opacity
      "rgba(0, 0, 0, 0)",
      "rgba(34, 197, 94, 0.3)", // Green with higher opacity
    ]
  );

  const handleDragEnd = async (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      // Trigger haptic feedback if available
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }

      const direction = info.offset.x > 0 ? "right" : "left";
      const targetX = direction === "left" ? -300 : 300;
      await animate(x, targetX, { type: "spring", duration: 0.5 });
      onSwipe(direction);
    } else {
      // If not swiped far enough, return to center
      animate(x, 0, { type: "spring", duration: 0.5 });
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full cursor-grab active:cursor-grabbing"
    >
      <motion.div style={{ opacity }} className="w-full">
        <Card className="overflow-hidden relative">
          <motion.div
            style={{ backgroundColor }}
            className="absolute inset-0 z-10 pointer-events-none"
          />
          <div
            className="h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.image})` }}
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
            <p className="text-muted-foreground">
              {movie.genre} • {movie.year}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
