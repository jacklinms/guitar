export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  category?: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string; // option id
  explanation: string;
  /** 選用圖示代碼，例如 "rhythm-44-eighth"、"theory-major-scale" */
  figure?: string;
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
