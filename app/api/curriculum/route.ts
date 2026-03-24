import { NextRequest, NextResponse } from "next/server";
import { getSubjectsForClass, getChaptersForSubject } from "@/lib/curriculum";
import type { ClassLevel } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const classLevel = Number(searchParams.get("class") || "10") as ClassLevel;
  const subjectId = searchParams.get("subject");

  const subjects = getSubjectsForClass(classLevel);

  if (subjectId) {
    const chapters = getChaptersForSubject(subjectId, classLevel);
    return NextResponse.json({ subjects, chapters });
  }

  return NextResponse.json({ subjects });
}
