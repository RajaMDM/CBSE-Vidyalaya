"use client";

import { useState } from "react";
import Link from "next/link";
import { getSubjectsForClass } from "@/lib/curriculum/subjects";
import { getChaptersForSubject } from "@/lib/curriculum/chapters";
import type { ClassLevel, AssessmentPaper } from "@/lib/types";

type PaperType = "unit_test" | "half_yearly" | "annual" | "pre_board" | "sample_paper";

export default function AssessmentPage() {
  const [classLevel, setClassLevel] = useState<ClassLevel>(10);
  const [subjectId, setSubjectId] = useState("");
  const [paperType, setPaperType] = useState<PaperType>("sample_paper");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [paper, setPaper] = useState<AssessmentPaper | null>(null);

  const subjects = getSubjectsForClass(classLevel);
  const chapters = subjectId ? getChaptersForSubject(subjectId, classLevel) : [];

  const handleGenerate = async () => {
    if (!subjectId) return;
    setIsGenerating(true);
    try {
      const res = await fetch("/api/assessment/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLevel,
          subjectId,
          type: paperType,
          chapterIds: selectedChapters.length > 0 ? selectedChapters : undefined,
          language: "en",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPaper(data);
      }
    } catch (error) {
      console.error("Failed to generate assessment:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleChapter = (chapterId: string) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <main className="flex-1 bg-[var(--cbse-bg)]">
      <header className="border-b border-[var(--cbse-border)] bg-[var(--cbse-card)]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link href="/" className="text-[var(--cbse-text-secondary)] hover:text-[var(--cbse-primary)]">
            &larr; Home
          </Link>
          <h1 className="text-xl font-bold text-[var(--cbse-primary)]">
            Assessment Center
          </h1>
          <span className="hindi-text text-sm text-[var(--cbse-text-secondary)]">
            मूल्यांकन केंद्र
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {!paper ? (
          <div className="rounded-xl border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-8">
            <h2 className="text-lg font-semibold mb-6">Generate CBSE Assessment Paper</h2>

            {/* Paper Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Paper Type</label>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { value: "sample_paper", label: "Sample Paper", labelHi: "नमूना प्रश्नपत्र" },
                    { value: "unit_test", label: "Unit Test", labelHi: "इकाई परीक्षा" },
                    { value: "half_yearly", label: "Half Yearly", labelHi: "अर्धवार्षिक" },
                    { value: "annual", label: "Annual Exam", labelHi: "वार्षिक परीक्षा" },
                    { value: "pre_board", label: "Pre-Board", labelHi: "प्री-बोर्ड" },
                  ] as const
                ).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPaperType(type.value)}
                    className={`rounded-lg border px-4 py-2 text-sm ${
                      paperType === type.value
                        ? "border-[var(--cbse-primary)] bg-[var(--cbse-primary)] text-white"
                        : "border-[var(--cbse-border)] hover:border-[var(--cbse-primary)]"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Class & Subject */}
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <select
                  value={classLevel}
                  onChange={(e) => {
                    setClassLevel(Number(e.target.value) as ClassLevel);
                    setSubjectId("");
                    setSelectedChapters([]);
                  }}
                  className="w-full rounded-lg border border-[var(--cbse-border)] px-4 py-2 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                    setSelectedChapters([]);
                  }}
                  className="w-full rounded-lg border border-[var(--cbse-border)] px-4 py-2 text-sm"
                >
                  <option value="">Select subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.nameHi})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chapter Selection */}
            {chapters.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Chapters (optional - leave empty for full syllabus)
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  {chapters.map((ch) => (
                    <label
                      key={ch.id}
                      className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer ${
                        selectedChapters.includes(ch.id)
                          ? "border-[var(--cbse-primary)] bg-blue-50"
                          : "border-[var(--cbse-border)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedChapters.includes(ch.id)}
                        onChange={() => toggleChapter(ch.id)}
                      />
                      <div>
                        <div className="text-sm font-medium">
                          Ch. {ch.number}: {ch.title}
                        </div>
                        <div className="hindi-text text-xs text-[var(--cbse-text-secondary)]">
                          {ch.titleHi}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!subjectId || isGenerating}
              className="w-full rounded-lg bg-[var(--cbse-primary)] py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {isGenerating ? "Generating Paper..." : "Generate Assessment Paper"}
            </button>
          </div>
        ) : (
          /* Paper Display */
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{paper.title}</h2>
              <button
                onClick={() => setPaper(null)}
                className="text-sm text-[var(--cbse-primary)] underline"
              >
                Generate Another
              </button>
            </div>

            <div className="mb-6 rounded-lg bg-[var(--cbse-primary)] p-4 text-white text-center">
              <p className="font-semibold">
                Total Marks: {paper.totalMarks} | Time: {paper.duration} minutes
              </p>
              <p className="text-sm opacity-80">
                Class {paper.classLevel} | {paper.type.replace("_", " ").toUpperCase()}
              </p>
            </div>

            {paper.sections.map((section) => (
              <div key={section.section} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-[var(--cbse-primary)]">
                  {section.title} ({section.totalMarks} marks)
                </h3>
                <p className="text-sm text-[var(--cbse-text-secondary)] mb-3">
                  {section.instructions}
                </p>
                <div className="space-y-3">
                  {section.questions.map((q, i) => (
                    <div
                      key={q.id}
                      className="rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-4"
                    >
                      <p className="font-medium text-sm">
                        Q{i + 1}. {q.question}
                        <span className="ml-2 text-xs text-[var(--cbse-text-secondary)]">
                          [{q.marks} marks]
                        </span>
                      </p>
                      {q.options && (
                        <div className="mt-2 pl-4 space-y-1 text-sm">
                          {q.options.map((opt, j) => (
                            <p key={j}>{opt}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
