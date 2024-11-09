'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ResultsScreenProps {
  matches: string[];
  onRestart: () => void;
}

export default function ResultsScreen({
  matches,
  onRestart,
}: ResultsScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto mt-20 text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Your Matches!</h2>
      <div className="mb-6">
        {matches.map((match, index) => (
          <div
            key={index}
            className="bg-card p-4 rounded-lg mb-2 shadow-sm"
          >
            {match}
          </div>
        ))}
      </div>
      <Button onClick={onRestart}>Start New Quiz</Button>
    </motion.div>
  );
}