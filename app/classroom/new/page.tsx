"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSubjectsForClass } from "@/lib/curriculum/subjects";
import { getChaptersForSubject } from "@/lib/curriculum/chapters";
import type { ClassLevel, Language } from "@/lib/types";

export default function NewClassroomPage() {
  const router = useRouter();
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [subjectId, setSubjectId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [difficulty, setDifficulty] = useState<"foundation" | "standard" | "advanced">("standard");
  const [boardExamFocus, setBoardExamFocus] = useState(false);
  const [includeNcert, setIncludeNcert] = useState(true);
  const [labSimulation, setLabSimulation] = useState(false);
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const subjects = getSubjectsForClass(classLevel);
  const chapters = subjectId ? getChaptersForSubject(subjectId, classLevel) : [];
  const selectedSubject = subjects.find((s) => s.id === subjectId);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/classroom/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLevel,
          subjectId,
          chapterId: chapterId || undefined,
          language,
          settings: {
            language,
            difficulty,
            includeNcertExamples: includeNcert,
            includePreviousYearQuestions: boardExamFocus,
            boardExamFocus,
            labSimulation,
            duration,
          },
          customPrompt: customPrompt || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/classroom/${data.id}`);
      }
    } catch (error) {
      console.error("Failed to generate classroom:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-1 bg-[var(--cbse-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--cbse-border)] bg-[var(--cbse-card)]">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link href="/" className="text-[var(--cbse-text-secondary)] hover:text-[var(--cbse-primary)]">
            &larr; Back
          </Link>
          <h1 className="text-xl font-bold text-[var(--cbse-primary)]">
            Create New Classroom
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-8">
          {/* Class Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Class Level</label>
            <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as ClassLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setClassLevel(level);
                    setSubjectId("");
                    setChapterId("");
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                    classLevel === level
                      ? "border-[var(--cbse-primary)] bg-[var(--cbse-primary)] text-white"
                      : "border-[var(--cbse-border)] hover:border-[var(--cbse-primary)]"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Subject</label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSubjectId(subject.id);
                    setChapterId("");
                    setLabSimulation(subject.hasLab);
                  }}
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    subjectId === subject.id
                      ? "border-[var(--cbse-primary)] bg-[var(--cbse-primary)] text-white"
                      : "border-[var(--cbse-border)] hover:border-[var(--cbse-primary)]"
                  }`}
                >
                  {subject.name}
                  <span className="hindi-text ml-1 text-xs opacity-70">
                    {subject.nameHi}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter */}
          {chapters.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Chapter (optional - leave empty for full subject)
              </label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value)}
                className="w-full rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-bg)] px-4 py-2 text-sm"
              >
                <option value="">All chapters / Custom topic</option>
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.number}. {ch.title} ({ch.titleHi})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Settings Grid */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-bg)] px-4 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                className="w-full rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-bg)] px-4 py-2 text-sm"
              >
                <option value="foundation">Foundation (Basic)</option>
                <option value="standard">Standard (Board Level)</option>
                <option value="advanced">Advanced (Competitive)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Duration: {duration} minutes
              </label>
              <input
                type="range"
                min={15}
                max={90}
                step={5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="mb-6 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={boardExamFocus}
                onChange={(e) => setBoardExamFocus(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Board Exam Focus Mode</span>
              <span className="text-xs text-[var(--cbse-text-secondary)]">
                (Emphasize exam patterns & marking scheme)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNcert}
                onChange={(e) => setIncludeNcert(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include NCERT Examples & Exercises</span>
            </label>

            {selectedSubject?.hasLab && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={labSimulation}
                  onChange={(e) => setLabSimulation(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Include Virtual Lab Simulation</span>
              </label>
            )}
          </div>

          {/* Custom Prompt */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Custom Instructions (optional)
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., Focus on numerical problems, explain with real-life examples, prepare for competitive exams..."
              className="w-full rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-bg)] px-4 py-3 text-sm"
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!subjectId || isGenerating}
            className="w-full rounded-lg bg-[var(--cbse-primary)] py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating
              ? "Generating your classroom... Please wait"
              : "Create Interactive Classroom"}
          </button>
        </div>
      </div>
    </main>
  );
}
