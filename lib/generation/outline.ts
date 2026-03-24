// ============================================
// Lesson Outline Generation Pipeline
// Stage 1: Analyze topic → Create structured outline
// ============================================

import { generateText } from "@/lib/ai";
import type { LLMMessage } from "@/lib/ai";
import type {
  GenerationRequest,
  GenerationOutline,
  ClassLevel,
  Language,
} from "@/lib/types";
import { getSubjectById } from "@/lib/curriculum";
import { getChapterById } from "@/lib/curriculum";

const OUTLINE_SYSTEM_PROMPT = `You are a CBSE curriculum expert and instructional designer. Your task is to create a detailed lesson outline for an interactive AI classroom.

IMPORTANT GUIDELINES:
- Strictly follow NCERT textbook content and CBSE syllabus
- Include proper pedagogy: Introduction → Concept Building → Examples → Practice → Assessment
- Use age-appropriate language for the given class level
- Include board exam relevant content and question patterns
- Reference NCERT examples and exercises where applicable
- For Science subjects, include practical/lab components when relevant
- For Mathematics, include step-by-step problem solving

OUTPUT FORMAT: Respond with valid JSON matching this structure:
{
  "title": "Lesson title",
  "titleHi": "Hindi title (if Hindi language)",
  "scenes": [
    {
      "type": "lecture|slide|quiz|discussion|lab_simulation|pbl_activity|revision|board_exam_practice|ncert_exercise",
      "title": "Scene title",
      "description": "What this scene covers",
      "estimatedDuration": <seconds>
    }
  ],
  "agents": [
    {
      "role": "teacher|lab_assistant|exam_coach|peer_student|doubt_resolver|ncert_expert",
      "name": "Agent name",
      "expertise": "Subject/topic expertise"
    }
  ],
  "totalDuration": <total seconds>
}`;

export async function generateOutline(
  request: GenerationRequest
): Promise<GenerationOutline> {
  const subject = getSubjectById(request.subjectId);
  const chapter = request.chapterId ? getChapterById(request.chapterId) : null;

  const userPrompt = buildOutlinePrompt(request, subject, chapter);

  const messages: LLMMessage[] = [
    { role: "system", content: OUTLINE_SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];

  const response = await generateText(messages, {
    temperature: 0.5,
    maxTokens: 4096,
  });

  try {
    const outline = JSON.parse(extractJson(response.content));
    return outline as GenerationOutline;
  } catch {
    throw new Error("Failed to parse outline generation response");
  }
}

function buildOutlinePrompt(
  request: GenerationRequest,
  subject: ReturnType<typeof getSubjectById>,
  chapter: ReturnType<typeof getChapterById>
): string {
  const parts: string[] = [];

  parts.push(`Class: ${request.classLevel}`);
  parts.push(`Subject: ${subject?.name || request.subjectId}`);
  parts.push(`Language: ${request.language === "hi" ? "Hindi" : "English"}`);
  parts.push(`Difficulty: ${request.settings.difficulty}`);
  parts.push(`Duration: ${request.settings.duration} minutes`);

  if (chapter) {
    parts.push(`\nChapter: ${chapter.number}. ${chapter.title}`);
    parts.push(`Description: ${chapter.description}`);
    parts.push(`\nTopics to cover:`);
    chapter.topics.forEach((t) => {
      parts.push(`- ${t.title}: ${t.subtopics.join(", ")}`);
    });
    parts.push(`\nLearning Objectives:`);
    chapter.learningObjectives.forEach((obj) => parts.push(`- ${obj}`));
    parts.push(`\nEstimated periods (40 min each): ${chapter.estimatedPeriods}`);
  }

  if (request.topics?.length) {
    parts.push(`\nSpecific topics requested: ${request.topics.join(", ")}`);
  }

  if (request.settings.boardExamFocus) {
    parts.push(`\nIMPORTANT: Focus on board exam preparation. Include:`);
    parts.push(`- Previous year question patterns`);
    parts.push(`- CBSE marking scheme awareness`);
    parts.push(`- Common mistakes to avoid`);
    parts.push(`- Important formulas and derivations`);
  }

  if (request.settings.includeNcertExamples) {
    parts.push(`\nInclude NCERT textbook examples and in-text questions.`);
  }

  if (request.settings.labSimulation && subject?.hasLab) {
    parts.push(`\nInclude virtual lab simulation for practical component.`);
  }

  if (request.customPrompt) {
    parts.push(`\nAdditional instructions: ${request.customPrompt}`);
  }

  if (request.referenceDocument) {
    parts.push(`\nReference material:\n${request.referenceDocument.slice(0, 3000)}`);
  }

  return parts.join("\n");
}

function extractJson(text: string): string {
  // Try to extract JSON from markdown code blocks or raw JSON
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) return jsonMatch[1].trim();

  const braceMatch = text.match(/\{[\s\S]*\}/);
  if (braceMatch) return braceMatch[0];

  return text;
}
