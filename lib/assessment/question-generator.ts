// ============================================
// CBSE Assessment Engine
// Board exam pattern question generation
// ============================================

import { generateText } from "@/lib/ai";
import type { LLMMessage } from "@/lib/ai";
import type {
  QuizQuestion,
  QuestionType,
  CBSESection,
  AssessmentPaper,
  PaperSection,
  MarkingSchemeEntry,
  ClassLevel,
  Language,
  BloomsLevel,
} from "@/lib/types";
import { getChapterById } from "@/lib/curriculum";
import { v4 as uuid } from "uuid";

// CBSE Board Exam Paper Structure (Class 10/12)
const CBSE_PAPER_STRUCTURE: Record<
  CBSESection,
  {
    title: string;
    questionTypes: QuestionType[];
    marksPerQuestion: number;
    numberOfQuestions: number;
    internalChoice: boolean;
  }
> = {
  A: {
    title: "Section A - Objective Type Questions",
    questionTypes: ["mcq", "assertion_reason", "fill_blank", "true_false"],
    marksPerQuestion: 1,
    numberOfQuestions: 16,
    internalChoice: false,
  },
  B: {
    title: "Section B - Very Short Answer",
    questionTypes: ["short_answer_2"],
    marksPerQuestion: 2,
    numberOfQuestions: 5,
    internalChoice: true,
  },
  C: {
    title: "Section C - Short Answer",
    questionTypes: ["short_answer_3"],
    marksPerQuestion: 3,
    numberOfQuestions: 6,
    internalChoice: true,
  },
  D: {
    title: "Section D - Long Answer",
    questionTypes: ["long_answer_5"],
    marksPerQuestion: 5,
    numberOfQuestions: 4,
    internalChoice: true,
  },
  E: {
    title: "Section E - Case Based Questions",
    questionTypes: ["case_based"],
    marksPerQuestion: 4,
    numberOfQuestions: 3,
    internalChoice: true,
  },
};

export async function generateQuestions(
  chapterId: string,
  classLevel: ClassLevel,
  questionType: QuestionType,
  count: number,
  language: Language,
  difficulty?: "easy" | "medium" | "hard"
): Promise<QuizQuestion[]> {
  const chapter = getChapterById(chapterId);
  if (!chapter) throw new Error(`Chapter not found: ${chapterId}`);

  const systemPrompt = `You are a CBSE question paper setter for Class ${classLevel}. Generate ${count} ${questionType} questions from the chapter "${chapter.title}".

REQUIREMENTS:
- Follow exact CBSE board exam pattern and difficulty
- Include questions from all topics in the chapter
- Mix difficulty levels unless specified
- For MCQs: 4 options (a, b, c, d) with exactly one correct answer
- For assertion-reason: follow CBSE format with 4 standard options
- For case-based: provide a passage/case followed by 4 sub-questions
- For numerical: include proper units and significant figures
- Provide detailed explanations for each answer
- Language: ${language === "hi" ? "Hindi (Devanagari)" : "English"}

Topics in this chapter:
${chapter.topics.map((t) => `- ${t.title}: ${t.subtopics.join(", ")}`).join("\n")}

OUTPUT: JSON array of questions:
[{
  "type": "${questionType}",
  "question": "...",
  "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
  "correctAnswer": "...",
  "explanation": "...",
  "marks": N,
  "difficulty": "easy|medium|hard",
  "bloomsLevel": "remember|understand|apply|analyze|evaluate|create",
  "topicIndex": N
}]`;

  const userPrompt = difficulty
    ? `Generate ${count} ${difficulty} ${questionType} questions.`
    : `Generate ${count} ${questionType} questions with mixed difficulty.`;

  const messages: LLMMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const response = await generateText(messages, {
    temperature: 0.6,
    maxTokens: 4096,
  });

  try {
    const jsonMatch = response.content.match(/\[[\s\S]*\]/);
    const parsed = JSON.parse(jsonMatch?.[0] || "[]");

    return parsed.map(
      (q: Record<string, unknown>, i: number): QuizQuestion => ({
        id: uuid(),
        type: questionType,
        question: (q.question as string) || "",
        questionHi: language === "hi" ? (q.question as string) : undefined,
        options: q.options as string[] | undefined,
        correctAnswer: (q.correctAnswer as string) || "",
        explanation: (q.explanation as string) || "",
        marks: (q.marks as number) || getDefaultMarks(questionType),
        difficulty: (q.difficulty as "easy" | "medium" | "hard") || "medium",
        bloomsLevel: (q.bloomsLevel as BloomsLevel) || "understand",
        chapterId,
        topicId: chapter.topics[
          Math.min((q.topicIndex as number) || i, chapter.topics.length - 1)
        ]?.id || chapter.topics[0]?.id,
      })
    );
  } catch {
    throw new Error("Failed to parse generated questions");
  }
}

export async function generateSamplePaper(
  subjectId: string,
  classLevel: ClassLevel,
  chapterIds: string[],
  type: AssessmentPaper["type"],
  language: Language
): Promise<AssessmentPaper> {
  const sections: PaperSection[] = [];
  const markingScheme: MarkingSchemeEntry[] = [];

  for (const [sectionKey, config] of Object.entries(CBSE_PAPER_STRUCTURE)) {
    const sectionQuestions: QuizQuestion[] = [];

    // Distribute questions across chapters
    const questionsPerChapter = Math.ceil(
      config.numberOfQuestions / chapterIds.length
    );

    for (const chapterId of chapterIds) {
      const questions = await generateQuestions(
        chapterId,
        classLevel,
        config.questionTypes[0],
        Math.min(questionsPerChapter, config.numberOfQuestions - sectionQuestions.length),
        language
      );
      sectionQuestions.push(...questions);
      if (sectionQuestions.length >= config.numberOfQuestions) break;
    }

    const section: PaperSection = {
      section: sectionKey as CBSESection,
      title: config.title,
      instructions: getSectionInstructions(sectionKey as CBSESection, config),
      questions: sectionQuestions.slice(0, config.numberOfQuestions),
      totalMarks: config.marksPerQuestion * config.numberOfQuestions,
    };

    sections.push(section);

    // Generate marking scheme for each question
    for (const q of section.questions) {
      markingScheme.push({
        questionId: q.id,
        stepwiseMarks: [{ step: "Full answer", marks: q.marks }],
        commonErrors: [],
      });
    }
  }

  const totalMarks = sections.reduce((sum, s) => sum + s.totalMarks, 0);

  return {
    id: uuid(),
    title: `${type.replace("_", " ").toUpperCase()} - Class ${classLevel} ${subjectId}`,
    classLevel,
    subjectId,
    type,
    totalMarks,
    duration: totalMarks <= 40 ? 90 : 180, // minutes
    sections,
    markingScheme,
  };
}

function getDefaultMarks(type: QuestionType): number {
  switch (type) {
    case "mcq":
    case "assertion_reason":
    case "fill_blank":
    case "true_false":
    case "match_columns":
      return 1;
    case "short_answer_2":
      return 2;
    case "short_answer_3":
      return 3;
    case "case_based":
      return 4;
    case "long_answer_5":
    case "numerical":
    case "diagram_based":
      return 5;
    case "very_long_answer":
    case "map_based":
      return 5;
    default:
      return 1;
  }
}

function getSectionInstructions(
  section: CBSESection,
  config: (typeof CBSE_PAPER_STRUCTURE)[CBSESection]
): string {
  const choiceText = config.internalChoice
    ? " Internal choice is provided."
    : " All questions are compulsory.";

  switch (section) {
    case "A":
      return `This section contains ${config.numberOfQuestions} questions of ${config.marksPerQuestion} mark each.${choiceText}`;
    case "B":
      return `This section contains ${config.numberOfQuestions} questions of ${config.marksPerQuestion} marks each. Answer in 30-50 words.${choiceText}`;
    case "C":
      return `This section contains ${config.numberOfQuestions} questions of ${config.marksPerQuestion} marks each. Answer in 50-80 words.${choiceText}`;
    case "D":
      return `This section contains ${config.numberOfQuestions} questions of ${config.marksPerQuestion} marks each. Answer in 80-120 words.${choiceText}`;
    case "E":
      return `This section contains ${config.numberOfQuestions} case-based questions of ${config.marksPerQuestion} marks each.${choiceText}`;
  }
}
