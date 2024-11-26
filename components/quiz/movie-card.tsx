"use client";

import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { Movie } from "@/lib/movie-data";
import { useCallback, useEffect } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

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

  const handleDragEnd = async (_: Event, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      if (window.navigator?.vibrate) {
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

  const animateSwipe = useCallback(
    async (direction: "left" | "right") => {
      const targetX = direction === "left" ? -300 : 300;
      await animate(x, targetX, { type: "spring", duration: 0.5 });
    },
    [x]
  );

  useEffect(() => {
    if (direction) {
      animateSwipe(direction);
    }
  }, [direction, animateSwipe]);

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
    >
      <motion.div style={{ opacity }} className="w-full h-full">
        <Card className="w-full h-full overflow-hidden">
          <motion.div
            style={{ backgroundColor }}
            className="absolute inset-0 z-20 pointer-events-none"
          />
          <div className="relative w-full h-full">
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-8 text-white pointer-events-none">
              <h3 className="text-2xl font-bold mb-3">{movie.title}</h3>
              <p className="text-base leading-relaxed opacity-90">
                {movie.description}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
