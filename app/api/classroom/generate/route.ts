import { NextRequest, NextResponse } from "next/server";
import { createClassroom } from "@/lib/orchestration";
import { getStorage } from "@/lib/storage";
import type { GenerationRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const request: GenerationRequest = {
      classLevel: body.classLevel,
      subjectId: body.subjectId,
      chapterId: body.chapterId,
      topics: body.topics,
      language: body.language || "en",
      settings: {
        language: body.settings?.language || body.language || "en",
        difficulty: body.settings?.difficulty || "standard",
        includeNcertExamples: body.settings?.includeNcertExamples ?? true,
        includePreviousYearQuestions: body.settings?.includePreviousYearQuestions ?? false,
        boardExamFocus: body.settings?.boardExamFocus ?? false,
        labSimulation: body.settings?.labSimulation ?? false,
        duration: body.settings?.duration || 30,
      },
      referenceDocument: body.referenceDocument,
      customPrompt: body.customPrompt,
    };

    const classroom = await createClassroom(request);
    const storage = getStorage();
    await storage.saveClassroom(classroom);

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("Classroom generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate classroom" },
      { status: 500 }
    );
  }
}
