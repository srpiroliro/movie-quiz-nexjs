'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Movie } from '@/lib/movie-data';

interface MovieCardProps {
  movie: Movie;
  direction: 'left' | 'right' | null;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function MovieCard({ movie, direction, onSwipe }: MovieCardProps) {
  return (
    <motion.div
      key={movie.id}
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
          style={{ backgroundImage: `url(${movie.image})` }}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <p className="text-muted-foreground">
            {movie.genre} • {movie.year}
          </p>
        </div>
      </Card>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSwipe('left')}
          className="p-4 bg-destructive rounded-full text-white"
        >
          <ThumbsDown className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSwipe('right')}
          className="p-4 bg-primary rounded-full text-white"
        >
          <ThumbsUp className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}