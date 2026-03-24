import { NextResponse } from "next/server";
import { getAvailableProviders } from "@/lib/ai";

export async function GET() {
  const providers = getAvailableProviders();

  return NextResponse.json({
    status: "healthy",
    app: "CBSE Vidyalaya",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
    providers: providers.map((p) => p.id),
    features: {
      classroom: true,
      assessment: true,
      curriculum: true,
      bilingual: true,
      labSimulation: true,
    },
  });
}
