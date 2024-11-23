"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import WaitingRoom from "@/components/quiz/waiting-room";
import QuizQuestion from "@/components/quiz/quiz-question";
import MovieSwiper from "@/components/quiz/movie-swiper";
import ResultsScreen from "@/components/quiz/results-screen";
import {
  MovieCardSkeleton,
  QuizQuestionSkeleton,
} from "@/components/loading-skeleton";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";

export type QuizState = "waiting" | "questions" | "swiping" | "results";

export default function QuizRoom() {
  const { roomId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>("swiping");
  const [participants, setParticipants] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (participants < 4) {
        setParticipants((prev) => prev + 1);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [participants]);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const startQuiz = () => {
    setQuizState("questions");
    toast({
      title: "Qüestionari començat",
      description: "Prepara't per contestar les preguntes!",
    });
  };

  const handleQuestionComplete = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizState("swiping");
    }
  };

  const handleSwipingComplete = (movieMatches: string[]) => {
    setMatches(movieMatches);
    setQuizState("results");
  };

  return (
    <div className="min-h-[70vh]  p-4">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {quizState === "questions" ? (
              <QuizQuestionSkeleton />
            ) : (
              <MovieCardSkeleton />
            )}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {quizState === "waiting" && (
              <WaitingRoom
                roomId={roomId as string}
                participants={participants}
                onStart={startQuiz}
              />
            )}

            {quizState === "questions" && (
              <QuizQuestion
                key={`question-${currentQuestion}`}
                questionNumber={currentQuestion}
                onComplete={handleQuestionComplete}
              />
            )}

            {quizState === "swiping" && (
              <MovieSwiper onComplete={handleSwipingComplete} />
            )}

            {quizState === "results" && (
              <ResultsScreen
                matches={matches}
                onRestart={() => router.push("/")}
              />
            )}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </div>
  );
}
