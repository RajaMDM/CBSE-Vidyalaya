// ============================================
// Classroom Orchestration Engine
// Manages multi-agent interactions in classroom
// ============================================

import type {
  Classroom,
  Scene,
  Agent,
  Action,
  ClassLevel,
  Language,
  ClassroomSettings,
  GenerationRequest,
} from "@/lib/types";
import { generateOutline, generateAllScenes } from "@/lib/generation";
import { createTeachingAgents } from "./agents";
import { v4 as uuid } from "uuid";

export interface ClassroomState {
  classroom: Classroom;
  currentSceneIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  chatHistory: ChatMessage[];
  activeDiscussion: boolean;
}

export interface ChatMessage {
  id: string;
  agentId: string | null; // null = student
  agentName: string;
  content: string;
  timestamp: string;
  type: "message" | "question" | "answer" | "system";
}

export async function createClassroom(
  request: GenerationRequest
): Promise<Classroom> {
  // Stage 1: Generate outline
  const outline = await generateOutline(request);

  // Stage 2: Create teaching agents
  const agents = createTeachingAgents(
    request.subjectId,
    request.classLevel,
    request.language,
    request.settings.boardExamFocus
  );

  // Stage 3: Generate scene content
  const scenes = await generateAllScenes(
    outline,
    request.classLevel,
    request.subjectId,
    request.language,
    request.settings
  );

  // Stage 4: Assign actions to agents
  const scenesWithActions = assignAgentActions(scenes, agents);

  return {
    id: uuid(),
    title: outline.title,
    titleHi: outline.titleHi,
    classLevel: request.classLevel,
    subjectId: request.subjectId,
    chapterId: request.chapterId,
    language: request.language,
    scenes: scenesWithActions,
    agents,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: request.settings,
  };
}

function assignAgentActions(scenes: Scene[], agents: Agent[]): Scene[] {
  const teacher = agents.find((a) => a.role === "teacher");
  const peer = agents.find((a) => a.role === "peer_student");

  return scenes.map((scene) => {
    const actions: Action[] = [];

    // Teacher introduces each scene
    if (teacher && scene.content.narration) {
      actions.push({
        id: uuid(),
        type: "speech",
        agentId: teacher.id,
        payload: {
          text: scene.content.narration,
          textHi: scene.content.narrationHi,
        },
      });
    }

    // Open whiteboard for lecture/slide scenes
    if (scene.type === "lecture" || scene.type === "slide") {
      if (teacher) {
        actions.push({
          id: uuid(),
          type: "wb_open",
          agentId: teacher.id,
          payload: {},
          delay: 1000,
        });
      }

      // Draw content on whiteboard
      if (scene.content.whiteboard?.elements) {
        scene.content.whiteboard.elements.forEach((element, i) => {
          if (teacher) {
            actions.push({
              id: uuid(),
              type: `wb_draw_${element.type}` as Action["type"],
              agentId: teacher.id,
              payload: element as unknown as Record<string, unknown>,
              delay: 2000 + i * 800,
            });
          }
        });
      }
    }

    // Show slides
    if (scene.content.slides) {
      scene.content.slides.forEach((slide, i) => {
        if (teacher) {
          actions.push({
            id: uuid(),
            type: "show_slide",
            agentId: teacher.id,
            payload: { slideIndex: i, slide },
            delay: i * 5000,
          });
        }
      });
    }

    // Quiz scenes
    if (scene.type === "quiz" && scene.content.quiz) {
      actions.push({
        id: uuid(),
        type: "show_quiz",
        agentId: teacher?.id || "",
        payload: { questions: scene.content.quiz },
      });
    }

    // Peer student asks a question midway through lectures
    if (
      peer &&
      (scene.type === "lecture" || scene.type === "slide") &&
      scene.duration > 120
    ) {
      actions.push({
        id: uuid(),
        type: "discussion",
        agentId: peer.id,
        payload: {
          type: "question",
          trigger: "midway",
        },
        delay: Math.floor(scene.duration * 500),
      });
    }

    return { ...scene, actions };
  });
}

export function initClassroomState(classroom: Classroom): ClassroomState {
  return {
    classroom,
    currentSceneIndex: 0,
    isPlaying: false,
    isPaused: false,
    chatHistory: [
      {
        id: uuid(),
        agentId: null,
        agentName: "System",
        content: `Welcome to ${classroom.title}! Class ${classroom.classLevel} - ${classroom.subjectId}`,
        timestamp: new Date().toISOString(),
        type: "system",
      },
    ],
    activeDiscussion: false,
  };
}
