'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { MOVIE_DATA } from '@/lib/movie-data';
import MovieCard from './movie-card';

interface MovieSwiperProps {
  onComplete: (matches: string[]) => void;
}

export default function MovieSwiper({ onComplete }: MovieSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    if (swipeDirection === 'right') {
      setMatches([...matches, MOVIE_DATA[currentIndex].title]);
    }

    setTimeout(() => {
      if (currentIndex === MOVIE_DATA.length - 1) {
        onComplete(matches);
      } else {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      }
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Find Your Match</h2>
        <p className="text-muted-foreground">Swipe right to like, left to pass</p>
      </div>

      <div className="relative h-[500px]">
        <AnimatePresence>
          {currentIndex < MOVIE_DATA.length && (
            <MovieCard
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