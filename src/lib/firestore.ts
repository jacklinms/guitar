import type { QuizScoreRecord } from "@/types/quiz";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveQuizScore(record: QuizScoreRecord): Promise<void> {
  await addDoc(collection(db, "quizScores"), {
    studentEmail: record.studentEmail,
    score: record.score,
    timestamp: record.timestamp,
    details: record.details,
    createdAt: serverTimestamp(),
  });
}
