"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import WaitingRoom from "@/components/quiz/waiting-room";
import QuizQuestion from "@/components/quiz/quiz-question";
import MovieSwiper from "@/components/quiz/movie-swiper";
import ResultsScreen from "@/components/quiz/results-screen";

export type QuizState = "waiting" | "questions" | "swiping" | "results";

export default function QuizRoom() {
  const { roomId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [quizState, setQuizState] = useState<QuizState>("waiting");
  const [participants, setParticipants] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (participants < 4) {
        setParticipants((prev) => prev + 1);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [participants]);

  const startQuiz = () => {
    setQuizState("questions");
    toast({
      title: "Quiz Started",
      description: "Get ready for your questions!",
    });
  };

  const handleQuestionComplete = () => {
    if (currentQuestion < 4) {
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
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background p-4">
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
          <ResultsScreen matches={matches} onRestart={() => router.push("/")} />
        )}
      </AnimatePresence>
    </div>
  );
}
