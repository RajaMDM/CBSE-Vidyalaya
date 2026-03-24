import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai";
import type { LLMMessage } from "@/lib/ai";
import { getStorage } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { classroomId, message, sceneContext } = await req.json();

    const storage = getStorage();
    const classroom = classroomId ? await storage.getClassroom(classroomId) : null;

    const systemPrompt = `You are Guru Bot, an AI doubt-resolver for CBSE students.
${classroom ? `Current classroom: "${classroom.title}", Class ${classroom.classLevel}, Subject: ${classroom.subjectId}` : ""}
${sceneContext ? `Current topic: ${sceneContext}` : ""}

INSTRUCTIONS:
- Answer student doubts clearly and concisely
- Reference NCERT textbook content when applicable
- For numerical problems, show step-by-step solutions
- Use simple language appropriate for the student's class level
- If the question is about board exams, include marking scheme tips
- Be encouraging and patient
- Use examples from Indian context where relevant`;

    const messages: LLMMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ];

    const response = await generateText(messages, {
      temperature: 0.5,
      maxTokens: 2048,
    });

    return NextResponse.json({
      response: response.content,
      agentName: "Guru Bot",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
