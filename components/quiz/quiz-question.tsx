'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QUIZ_QUESTIONS } from '@/lib/quiz-data';

interface QuizQuestionProps {
  questionNumber: number;
  onComplete: () => void;
}

export default function QuizQuestion({
  questionNumber,
  onComplete,
}: QuizQuestionProps) {
  const question = QUIZ_QUESTIONS[questionNumber];

  if (!question) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto mt-20"
    >
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{question.text}</h2>
          <div className="text-sm text-muted-foreground">
            Pregunta {questionNumber + 1} de {QUIZ_QUESTIONS.length}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-24 text-4xl"
              onClick={onComplete}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}