'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const movies = [
  {
    id: 1,
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop',
    genre: 'Sci-Fi',
    year: 2010,
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop',
    genre: 'Drama',
    year: 1994,
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop',
    genre: 'Crime',
    year: 1994,
  },
];

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
      setMatches([...matches, movies[currentIndex].title]);
    }

    setTimeout(() => {
      if (currentIndex === movies.length - 1) {
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
      <h2 className="text-2xl font-bold">Troba la teva coincidència</h2>
      <p className="text-muted-foreground">Fes lliscar cap a la dreta per donar m'agrada, a l'esquerra per passar</p>
      </div>

      <div className="relative h-[500px]">
        <AnimatePresence>
          {currentIndex < movies.length && (
            <motion.div
              key={movies[currentIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: direction === 'left' ? -300 : 300,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              className="absolute w-full"
            >
              <Card className="overflow-hidden">
                <div
                  className="h-80 bg-cover bg-center"
                  style={{ backgroundImage: `url(${movies[currentIndex].image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {movies[currentIndex].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {movies[currentIndex].genre} • {movies[currentIndex].year}
                  </p>
                </div>
              </Card>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('left')}
                  className="p-4 bg-destructive rounded-full text-white"
                >
                  <ThumbsDown className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('right')}
                  className="p-4 bg-primary rounded-full text-white"
                >
                  <ThumbsUp className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}