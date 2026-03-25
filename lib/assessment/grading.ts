// ============================================
// CBSE Grading & Evaluation System
// ============================================

import { generateText } from "@/lib/ai";
import type { LLMMessage } from "@/lib/ai";
import type { QuizQuestion, CBSEGrade } from "@/lib/types";

export interface StudentResponse {
  questionId: string;
  answer: string;
  timeTaken?: number; // seconds
}

export interface GradingResult {
  questionId: string;
  marksObtained: number;
  maxMarks: number;
  feedback: string;
  isCorrect: boolean;
  partialCredit: boolean;
}

export interface AssessmentResult {
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  gradePoint: number;
  sectionWise: { section: string; obtained: number; total: number }[];
  questionResults: GradingResult[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export async function gradeResponse(
  question: QuizQuestion,
  studentAnswer: string
): Promise<GradingResult> {
  // For objective questions, use exact matching
  if (
    question.type === "mcq" ||
    question.type === "true_false" ||
    question.type === "fill_blank"
  ) {
    return gradeObjective(question, studentAnswer);
  }

  // For subjective questions, use AI grading
  return gradeSubjective(question, studentAnswer);
}

function gradeObjective(
  question: QuizQuestion,
  studentAnswer: string
): GradingResult {
  const correct = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.some(
        (a) => a.toLowerCase().trim() === studentAnswer.toLowerCase().trim()
      )
    : question.correctAnswer.toLowerCase().trim() ===
      studentAnswer.toLowerCase().trim();

  return {
    questionId: question.id,
    marksObtained: correct ? question.marks : 0,
    maxMarks: question.marks,
    feedback: correct
      ? "Correct!"
      : `Incorrect. The correct answer is: ${question.correctAnswer}. ${question.explanation}`,
    isCorrect: correct,
    partialCredit: false,
  };
}

async function gradeSubjective(
  question: QuizQuestion,
  studentAnswer: string
): Promise<GradingResult> {
  const systemPrompt = `You are a CBSE examiner grading a student's answer. Follow CBSE marking scheme strictly.

GRADING GUIDELINES:
- Award marks step by step as per CBSE marking scheme
- Give partial credit where applicable
- Consider alternative correct approaches
- Be fair but strict, as in actual CBSE board evaluation
- For diagrams: award marks for labeling, neatness, accuracy
- For numerical: award marks for formula, substitution, calculation, units

Respond with JSON:
{
  "marksObtained": N,
  "feedback": "Detailed feedback with step-wise marks breakdown",
  "isCorrect": boolean,
  "partialCredit": boolean,
  "stepwiseMarks": [{"step": "...", "marks": N, "comment": "..."}]
}`;

  const userPrompt = `QUESTION (${question.marks} marks, ${question.type}):
${question.question}

MODEL ANSWER:
${question.correctAnswer}

STUDENT'S ANSWER:
${studentAnswer}

Grade this answer out of ${question.marks} marks following CBSE marking scheme.`;

  const messages: LLMMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  try {
    const response = await generateText(messages, {
      temperature: 0.3,
      maxTokens: 1024,
    });

    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch?.[0] || "{}");

    return {
      questionId: question.id,
      marksObtained: Math.min(result.marksObtained || 0, question.marks),
      maxMarks: question.marks,
      feedback: result.feedback || "Unable to provide detailed feedback.",
      isCorrect: result.isCorrect || false,
      partialCredit: result.partialCredit || false,
    };
  } catch {
    return {
      questionId: question.id,
      marksObtained: 0,
      maxMarks: question.marks,
      feedback: "Grading error. Please review manually.",
      isCorrect: false,
      partialCredit: false,
    };
  }
}

export function calculateGrade(percentage: number): { grade: string; gradePoint: number } {
  const gradeInfo: CBSEGrade[] = [
    { grade: "A1", marksRange: { min: 91, max: 100 }, gradePoint: 10, description: "Outstanding" },
    { grade: "A2", marksRange: { min: 81, max: 90 }, gradePoint: 9, description: "Excellent" },
    { grade: "B1", marksRange: { min: 71, max: 80 }, gradePoint: 8, description: "Very Good" },
    { grade: "B2", marksRange: { min: 61, max: 70 }, gradePoint: 7, description: "Good" },
    { grade: "C1", marksRange: { min: 51, max: 60 }, gradePoint: 6, description: "Above Average" },
    { grade: "C2", marksRange: { min: 41, max: 50 }, gradePoint: 5, description: "Average" },
    { grade: "D", marksRange: { min: 33, max: 40 }, gradePoint: 4, description: "Below Average" },
    { grade: "E1", marksRange: { min: 21, max: 32 }, gradePoint: 0, description: "Needs Improvement" },
    { grade: "E2", marksRange: { min: 0, max: 20 }, gradePoint: 0, description: "Unsatisfactory" },
  ];

  const rounded = Math.round(percentage);
  const match = gradeInfo.find(
    (g) => rounded >= g.marksRange.min && rounded <= g.marksRange.max
  );

  return match
    ? { grade: match.grade, gradePoint: match.gradePoint }
    : { grade: "E2", gradePoint: 0 };
}

export function generateAssessmentReport(
  results: GradingResult[],
  questions: QuizQuestion[]
): AssessmentResult {
  const totalMarks = results.reduce((sum, r) => sum + r.marksObtained, 0);
  const maxMarks = results.reduce((sum, r) => sum + r.maxMarks, 0);
  const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
  const { grade, gradePoint } = calculateGrade(percentage);

  // Analyze topic-wise performance
  const topicPerformance: Record<string, { obtained: number; total: number }> = {};
  results.forEach((r, i) => {
    const q = questions[i];
    if (q) {
      const topicId = q.topicId;
      if (!topicPerformance[topicId]) {
        topicPerformance[topicId] = { obtained: 0, total: 0 };
      }
      topicPerformance[topicId].obtained += r.marksObtained;
      topicPerformance[topicId].total += r.maxMarks;
    }
  });

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  Object.entries(topicPerformance).forEach(([topicId, perf]) => {
    const topicPct = (perf.obtained / perf.total) * 100;
    if (topicPct >= 70) {
      strengths.push(`Strong performance in topic ${topicId} (${Math.round(topicPct)}%)`);
    } else if (topicPct < 40) {
      weaknesses.push(`Needs improvement in topic ${topicId} (${Math.round(topicPct)}%)`);
    }
  });

  const recommendations = generateRecommendations(percentage, weaknesses.length);

  return {
    totalMarks,
    maxMarks,
    percentage: Math.round(percentage * 100) / 100,
    grade,
    gradePoint,
    sectionWise: [],
    questionResults: results,
    strengths,
    weaknesses,
    recommendations,
  };
}

function generateRecommendations(percentage: number, weakTopics: number): string[] {
  const recs: string[] = [];

  if (percentage < 33) {
    recs.push("Focus on understanding basic concepts from NCERT textbook");
    recs.push("Practice solved examples before attempting exercises");
    recs.push("Seek help from teacher for fundamental concepts");
  } else if (percentage < 60) {
    recs.push("Revise weak topics using NCERT solutions");
    recs.push("Practice previous year board questions");
    recs.push("Focus on understanding rather than memorization");
  } else if (percentage < 80) {
    recs.push("Practice HOTS (Higher Order Thinking Skills) questions");
    recs.push("Attempt sample papers under timed conditions");
    recs.push("Review and improve answer presentation");
  } else {
    recs.push("Excellent performance! Try competitive exam level questions");
    recs.push("Help peers understand difficult concepts");
    recs.push("Explore advanced topics beyond the syllabus");
  }

  if (weakTopics > 0) {
    recs.push(`Focus extra revision on ${weakTopics} weak topic(s) identified`);
  }

  return recs;
}
