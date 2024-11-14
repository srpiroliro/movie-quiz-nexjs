"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";

interface WaitingRoomProps {
  roomId: string;
  participants: number;
  onStart: () => void;
}

export default function WaitingRoom({
  roomId,
  participants,
  onStart,
}: WaitingRoomProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto mt-20"
    >
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Sala de Quiz</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{participants} participant(s)</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-center mb-2">Comparteix aquest enllaç per convidar altres:</p>
          <code className="block p-2 bg-muted rounded text-sm break-all">
            {`${window.location.origin}/quiz/${roomId}`}
          </code>
        </div>

        <Button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Començar el qüestionari
        </Button>
      </Card>
    </motion.div>
  );
}
