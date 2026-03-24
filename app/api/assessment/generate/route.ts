import { NextRequest, NextResponse } from "next/server";
import { generateSamplePaper } from "@/lib/assessment";
import { getStorage } from "@/lib/storage";
import { getChaptersForSubject } from "@/lib/curriculum";
import type { ClassLevel, Language, AssessmentPaper } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const classLevel = body.classLevel as ClassLevel;
    const subjectId = body.subjectId as string;
    const type = body.type as AssessmentPaper["type"];
    const language = (body.language || "en") as Language;

    // Use provided chapters or get all chapters for the subject
    let chapterIds: string[] = body.chapterIds || [];

    if (chapterIds.length === 0) {
      const chapters = getChaptersForSubject(subjectId, classLevel);
      chapterIds = chapters.map((ch) => ch.id);
    }

    if (chapterIds.length === 0) {
      return NextResponse.json(
        { error: "No chapters available for this subject/class combination" },
        { status: 400 }
      );
    }

    const paper = await generateSamplePaper(
      subjectId,
      classLevel,
      chapterIds,
      type,
      language
    );

    const storage = getStorage();
    await storage.saveAssessment(paper);

    return NextResponse.json(paper);
  } catch (error) {
    console.error("Assessment generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate assessment" },
      { status: 500 }
    );
  }
}
