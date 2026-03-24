import { NextRequest, NextResponse } from "next/server";
import { getStorage } from "@/lib/storage";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const storage = getStorage();
    const classroom = await storage.getClassroom(id);

    if (!classroom) {
      return NextResponse.json({ error: "Classroom not found" }, { status: 404 });
    }

    return NextResponse.json(classroom);
  } catch (error) {
    console.error("Error fetching classroom:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
