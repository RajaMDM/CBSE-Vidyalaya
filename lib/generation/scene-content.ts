// ============================================
// Scene Content Generation Pipeline
// Stage 2: Outline → Rich scene content
// ============================================

import { generateText } from "@/lib/ai";
import type { LLMMessage } from "@/lib/ai";
import type {
  Scene,
  SceneType,
  ClassLevel,
  Language,
  ClassroomSettings,
  GenerationOutline,
} from "@/lib/types";
import { v4 as uuid } from "uuid";

interface SceneGenerationContext {
  classLevel: ClassLevel;
  subjectId: string;
  language: Language;
  settings: ClassroomSettings;
  outline: GenerationOutline;
  sceneIndex: number;
}

const SCENE_PROMPTS: Record<SceneType, string> = {
  lecture: `Generate a lecture scene with narration, key points, and whiteboard actions. Include:
- Opening hook/motivation
- Concept explanation with real-world examples
- NCERT-aligned content
- Key formulas/definitions highlighted
- Summary points
Output JSON: { "narration": "...", "narrationHi": "...", "slides": [...], "whiteboardActions": [...] }`,

  slide: `Generate presentation slides for this topic. Each slide should have:
- Clear title
- Concise content (bullet points or short paragraphs)
- Notes for the teacher
- Appropriate layout type
Output JSON: { "slides": [{ "id": "...", "title": "...", "content": "...", "notes": "...", "layout": "title|content|two_column|image|diagram|formula" }] }`,

  quiz: `Generate CBSE-pattern quiz questions. Include a mix of:
- MCQs (1 mark each)
- Assertion-Reason questions (1 mark)
- Short answer (2-3 marks)
- Case-based questions (4 marks)
Match CBSE board exam difficulty and format.
Output JSON: { "questions": [{ "id": "...", "type": "mcq|assertion_reason|case_based|short_answer_2|short_answer_3", "question": "...", "options": [...], "correctAnswer": "...", "explanation": "...", "marks": N, "difficulty": "easy|medium|hard", "bloomsLevel": "..." }] }`,

  discussion: `Generate an interactive discussion prompt. Include:
- A thought-provoking question related to the topic
- Multiple perspectives/stances for AI agents to take
- Guidelines for student participation
- Connection to real-world applications
Output JSON: { "topic": "...", "context": "...", "agentPersonas": [{ "agentId": "...", "stance": "..." }], "guidelines": [...] }`,

  lab_simulation: `Generate a virtual lab simulation description. Include:
- Aim of the experiment
- Materials/apparatus list
- Step-by-step procedure
- Expected observations
- Conclusion
- Precautions
- Viva voce questions
Output JSON: { "title": "...", "apparatus": [...], "procedure": [...], "observations": "...", "conclusion": "...", "precautions": [...] }`,

  pbl_activity: `Generate a project-based learning activity aligned with CBSE guidelines. Include:
- Project title and objective
- Real-world connection
- Steps/milestones
- Expected deliverables
- Assessment criteria
Output JSON: { "title": "...", "objective": "...", "realWorldConnection": "...", "steps": [...], "deliverables": [...], "rubric": [...] }`,

  revision: `Generate a revision/summary scene. Include:
- Key concepts recap
- Important formulas/definitions
- Quick recall questions
- Mind map structure
- Common mistakes to avoid
Output JSON: { "keyPoints": [...], "formulas": [...], "recallQuestions": [...], "commonMistakes": [...] }`,

  board_exam_practice: `Generate board exam practice questions following exact CBSE pattern. Include:
- Section-wise questions (A through E)
- Proper marks distribution
- Sample answers with marking scheme
- Time management tips
Output JSON: { "sections": [{ "section": "A|B|C|D|E", "questions": [...], "totalMarks": N }], "tips": [...] }`,

  ncert_exercise: `Generate practice based on NCERT exercise questions. Include:
- Questions similar to NCERT back-exercise
- Step-by-step solutions
- Additional practice questions
- HOTS (Higher Order Thinking Skills) questions
Output JSON: { "exerciseQuestions": [...], "solutions": [...], "hotsQuestions": [...] }`,
};

export async function generateSceneContent(
  context: SceneGenerationContext
): Promise<Scene> {
  const sceneOutline = context.outline.scenes[context.sceneIndex];
  const sceneType = sceneOutline.type as SceneType;

  const systemPrompt = `You are a CBSE ${context.subjectId} teacher for Class ${context.classLevel}.
Generate rich, interactive content for an AI classroom scene.
Language: ${context.language === "hi" ? "Hindi (with English technical terms)" : "English"}
Difficulty: ${context.settings.difficulty}
${context.settings.boardExamFocus ? "BOARD EXAM FOCUS MODE: Emphasize exam-relevant content." : ""}

${SCENE_PROMPTS[sceneType] || SCENE_PROMPTS.lecture}`;

  const userPrompt = `Scene: ${sceneOutline.title}
Description: ${sceneOutline.description}
Duration: ${sceneOutline.estimatedDuration} seconds
Overall lesson: ${context.outline.title}
Scene ${context.sceneIndex + 1} of ${context.outline.scenes.length}`;

  const messages: LLMMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const response = await generateText(messages, {
    temperature: 0.6,
    maxTokens: 4096,
  });

  const content = parseSceneResponse(response.content, sceneType);

  return {
    id: uuid(),
    type: sceneType,
    title: sceneOutline.title,
    content,
    actions: [],
    duration: sceneOutline.estimatedDuration,
    order: context.sceneIndex,
  };
}

export async function generateAllScenes(
  outline: GenerationOutline,
  classLevel: ClassLevel,
  subjectId: string,
  language: Language,
  settings: ClassroomSettings
): Promise<Scene[]> {
  const scenes: Scene[] = [];

  for (let i = 0; i < outline.scenes.length; i++) {
    const scene = await generateSceneContent({
      classLevel,
      subjectId,
      language,
      settings,
      outline,
      sceneIndex: i,
    });
    scenes.push(scene);
  }

  return scenes;
}

function parseSceneResponse(content: string, _sceneType: SceneType): Scene["content"] {
  try {
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.match(/\{[\s\S]*\}/)?.[0] || "{}";
    const parsed = JSON.parse(jsonStr);

    return {
      slides: parsed.slides,
      narration: parsed.narration,
      narrationHi: parsed.narrationHi,
      quiz: parsed.questions || parsed.exerciseQuestions,
      discussion: parsed.topic
        ? {
            topic: parsed.topic,
            context: parsed.context,
            agentPersonas: parsed.agentPersonas || [],
            guidelines: parsed.guidelines || [],
          }
        : undefined,
      whiteboard: parsed.whiteboardActions
        ? { elements: parsed.whiteboardActions }
        : undefined,
    };
  } catch {
    return {
      narration: content,
    };
  }
}
