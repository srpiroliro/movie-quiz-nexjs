'use client';

import { motion } from 'framer-motion';
import { Film, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function MenuPage() {
  const router = useRouter();

  const startQuiz = () => {
    const roomId = nanoid();
    router.push(`/quiz/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Film className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">MovieMatch</h1>
        <p className="text-muted-foreground">Preparat per trobar la teva propera pel·lícula?</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Button
          onClick={startQuiz}
          size="lg"
          className="w-full py-8 text-lg flex items-center gap-2"
        >
          <Play className="w-6 h-6" />
          Començar el qüestionari
        </Button>
      </motion.div>
    </div>
  );
}