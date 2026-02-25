export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctAnswer: string; // option id
  explanation: string;
}

export interface QuizResultDetail {
  questionId: number;
  correct: boolean;
  selectedAnswer: string;
}

export interface QuizScoreRecord {
  studentEmail: string;
  score: number;
  timestamp: Date;
  details: QuizResultDetail[];
}
