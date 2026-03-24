"use client";

import { useState } from "react";
import Link from "next/link";
import { getSubjectsForClass } from "@/lib/curriculum/subjects";
import { getChaptersForSubject } from "@/lib/curriculum/chapters";
import type { ClassLevel, Subject, Chapter } from "@/lib/types";

export default function CurriculumPage() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(10);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const subjects = getSubjectsForClass(selectedClass);
  const chapters = selectedSubject
    ? getChaptersForSubject(selectedSubject.id, selectedClass)
    : [];

  return (
    <main className="flex-1 bg-[var(--cbse-bg)]">
      <header className="border-b border-[var(--cbse-border)] bg-[var(--cbse-card)]">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link href="/" className="text-[var(--cbse-text-secondary)] hover:text-[var(--cbse-primary)]">
            &larr; Home
          </Link>
          <h1 className="text-xl font-bold text-[var(--cbse-primary)]">
            CBSE Curriculum Explorer
          </h1>
          <span className="hindi-text text-sm text-[var(--cbse-text-secondary)]">
            पाठ्यक्रम एक्सप्लोरर
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Class Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Select Class</h2>
          <div className="flex flex-wrap gap-2">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as ClassLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedClass(level);
                  setSelectedSubject(null);
                }}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                  selectedClass === level
                    ? "border-[var(--cbse-primary)] bg-[var(--cbse-primary)] text-white"
                    : "border-[var(--cbse-border)] hover:border-[var(--cbse-primary)]"
                }`}
              >
                Class {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Subject List */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Subjects</h2>
            <div className="space-y-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full rounded-lg border p-3 text-left ${
                    selectedSubject?.id === subject.id
                      ? "border-[var(--cbse-primary)] bg-blue-50"
                      : "border-[var(--cbse-border)] hover:border-[var(--cbse-primary)]"
                  }`}
                >
                  <div className="font-medium text-sm">{subject.name}</div>
                  <div className="hindi-text text-xs text-[var(--cbse-text-secondary)]">
                    {subject.nameHi} | Code: {subject.code}
                  </div>
                  <div className="mt-1 flex gap-2">
                    {subject.hasLab && (
                      <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        Lab
                      </span>
                    )}
                    {subject.streams?.map((s) => (
                      <span key={s} className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Details */}
          <div>
            {selectedSubject ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {selectedSubject.name} - Class {selectedClass}
                  </h2>
                  <Link
                    href={`/classroom/new?class=${selectedClass}&subject=${selectedSubject.id}`}
                    className="rounded-lg bg-[var(--cbse-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Start Classroom
                  </Link>
                </div>

                {chapters.length > 0 ? (
                  <div className="space-y-3">
                    {chapters.map((chapter: Chapter) => (
                      <div
                        key={chapter.id}
                        className="rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">
                              Chapter {chapter.number}: {chapter.title}
                            </h3>
                            <p className="hindi-text text-sm text-[var(--cbse-secondary)]">
                              {chapter.titleHi}
                            </p>
                            <p className="mt-1 text-sm text-[var(--cbse-text-secondary)]">
                              {chapter.description}
                            </p>
                          </div>
                          <div className="text-right text-xs text-[var(--cbse-text-secondary)]">
                            <div>{chapter.estimatedPeriods} periods</div>
                            {chapter.ncertPageRange && (
                              <div>
                                pp. {chapter.ncertPageRange.start}-{chapter.ncertPageRange.end}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="mt-3 space-y-1">
                          {chapter.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className="flex items-center justify-between rounded bg-gray-50 px-3 py-1.5 text-sm"
                            >
                              <div>
                                <span className="font-medium">{topic.title}</span>
                                <span className="hindi-text ml-2 text-xs text-[var(--cbse-text-secondary)]">
                                  {topic.titleHi}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700">
                                  {topic.bloomsLevel}
                                </span>
                                <span className="text-[var(--cbse-text-secondary)]">
                                  {topic.weightage} marks
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Learning Objectives */}
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium text-[var(--cbse-primary)]">
                            Learning Objectives
                          </summary>
                          <ul className="mt-2 space-y-1 pl-4 text-sm text-[var(--cbse-text-secondary)]">
                            {chapter.learningObjectives.map((obj, i) => (
                              <li key={i} className="list-disc">
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </details>

                        {/* Quick Actions */}
                        <div className="mt-3 flex gap-2">
                          <Link
                            href={`/classroom/new?class=${selectedClass}&subject=${selectedSubject.id}&chapter=${chapter.id}`}
                            className="rounded bg-[var(--cbse-primary)] px-3 py-1 text-xs text-white hover:opacity-90"
                          >
                            Start Lesson
                          </Link>
                          <Link
                            href={`/assessment?chapter=${chapter.id}`}
                            className="rounded border border-[var(--cbse-border)] px-3 py-1 text-xs hover:border-[var(--cbse-primary)]"
                          >
                            Practice Questions
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[var(--cbse-border)] p-12 text-center">
                    <p className="text-[var(--cbse-text-secondary)]">
                      Chapter data for {selectedSubject.name} Class {selectedClass} is being prepared.
                    </p>
                    <p className="mt-2 text-sm">
                      You can still create a classroom - AI will generate content based on the CBSE syllabus.
                    </p>
                    <Link
                      href={`/classroom/new?class=${selectedClass}&subject=${selectedSubject.id}`}
                      className="mt-4 inline-block rounded-lg bg-[var(--cbse-primary)] px-4 py-2 text-sm font-medium text-white"
                    >
                      Create Classroom Anyway
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[var(--cbse-border)]">
                <p className="text-[var(--cbse-text-secondary)]">
                  Select a subject to view chapters and topics
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
