import Link from "next/link";
import { CBSE_SUBJECTS } from "@/lib/curriculum/subjects";

const CLASS_LEVELS = [
  { range: "1-5", label: "Primary", labelHi: "प्राथमिक", icon: "🎨" },
  { range: "6-8", label: "Middle School", labelHi: "माध्यमिक", icon: "📚" },
  { range: "9-10", label: "Secondary", labelHi: "उच्च माध्यमिक", icon: "🔬" },
  { range: "11-12", label: "Senior Secondary", labelHi: "उच्चतर माध्यमिक", icon: "🎓" },
];

const FEATURES = [
  {
    title: "AI Interactive Classroom",
    titleHi: "AI इंटरैक्टिव कक्षा",
    description: "Multi-agent teaching with subject-expert AI teachers, peer learning, and doubt resolution",
    icon: "🏫",
    href: "/classroom/new",
  },
  {
    title: "Board Exam Preparation",
    titleHi: "बोर्ड परीक्षा तैयारी",
    description: "CBSE-pattern sample papers, previous year questions, and AI-powered marking scheme",
    icon: "📝",
    href: "/assessment",
  },
  {
    title: "NCERT Solutions",
    titleHi: "NCERT समाधान",
    description: "Step-by-step solutions for all NCERT exercises with detailed explanations",
    icon: "📖",
    href: "/ncert",
  },
  {
    title: "Virtual Laboratory",
    titleHi: "वर्चुअल प्रयोगशाला",
    description: "Interactive science experiments with virtual apparatus, observations, and viva",
    icon: "🧪",
    href: "/lab",
  },
  {
    title: "Curriculum Explorer",
    titleHi: "पाठ्यक्रम एक्सप्लोरर",
    description: "Browse CBSE syllabus, chapters, topics, and weightage for all subjects",
    icon: "🗺️",
    href: "/curriculum",
  },
  {
    title: "Doubt Resolution",
    titleHi: "संदेह समाधान",
    description: "24/7 AI tutor for instant doubt clearing with step-by-step explanations",
    icon: "💡",
    href: "/doubts",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Header */}
      <header className="border-b border-[var(--cbse-border)] bg-[var(--cbse-card)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--cbse-primary)] text-white font-bold text-lg">
              V
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--cbse-primary)]">
                CBSE Vidyalaya
              </h1>
              <p className="text-xs text-[var(--cbse-text-secondary)] hindi-text">
                AI-संचालित इंटरैक्टिव कक्षा
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/curriculum" className="text-sm hover:text-[var(--cbse-primary)]">
              Curriculum
            </Link>
            <Link href="/assessment" className="text-sm hover:text-[var(--cbse-primary)]">
              Assessments
            </Link>
            <Link href="/lab" className="text-sm hover:text-[var(--cbse-primary)]">
              Virtual Lab
            </Link>
            <Link
              href="/classroom/new"
              className="rounded-lg bg-[var(--cbse-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              New Classroom
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--cbse-primary)] to-[#283593] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            CBSE Vidyalaya
          </h2>
          <p className="hindi-text mt-2 text-xl text-blue-200">
            विद्यालय - AI-संचालित शिक्षा
          </p>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Transform any CBSE chapter into an immersive, multi-agent interactive classroom.
            AI teachers, board exam prep, NCERT solutions - all in one click.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/classroom/new"
              className="rounded-lg bg-[var(--cbse-secondary)] px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Start Learning
            </Link>
            <Link
              href="/curriculum"
              className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white hover:bg-white/10"
            >
              Explore Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Class Levels */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Select Your Class</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CLASS_LEVELS.map((level) => (
              <Link
                key={level.range}
                href={`/curriculum?classes=${level.range}`}
                className="group rounded-xl border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-6 text-center hover:border-[var(--cbse-primary)] hover:shadow-lg"
              >
                <div className="text-4xl mb-3">{level.icon}</div>
                <div className="text-lg font-semibold group-hover:text-[var(--cbse-primary)]">
                  Class {level.range}
                </div>
                <div className="text-sm text-[var(--cbse-text-secondary)]">
                  {level.label}
                </div>
                <div className="hindi-text text-xs text-[var(--cbse-text-secondary)] mt-1">
                  {level.labelHi}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[var(--cbse-card)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold text-center mb-8">
            Everything You Need for CBSE Success
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-xl border border-[var(--cbse-border)] p-6 hover:border-[var(--cbse-primary)] hover:shadow-lg"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-semibold group-hover:text-[var(--cbse-primary)]">
                  {feature.title}
                </h4>
                <p className="hindi-text text-sm text-[var(--cbse-secondary)] mb-2">
                  {feature.titleHi}
                </p>
                <p className="text-sm text-[var(--cbse-text-secondary)]">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Popular Subjects</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {CBSE_SUBJECTS.filter((s) => s.classes.includes(10)).map((subject) => (
              <Link
                key={subject.id}
                href={`/curriculum/${subject.id}?class=10`}
                className="rounded-full border border-[var(--cbse-border)] px-4 py-2 text-sm hover:border-[var(--cbse-primary)] hover:bg-[var(--cbse-primary)] hover:text-white"
              >
                {subject.name}
                <span className="hindi-text ml-1 text-xs opacity-70">
                  ({subject.nameHi})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--cbse-border)] bg-[var(--cbse-card)] py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[var(--cbse-text-secondary)]">
          <p className="font-medium">CBSE Vidyalaya - AI-Powered Interactive Classroom</p>
          <p className="hindi-text mt-1">Inspired by OpenMAIC | CBSE & NCERT Aligned</p>
          <p className="mt-2">Classes 1-12 | All Subjects | Board Exam Preparation</p>
        </div>
      </footer>
    </main>
  );
}
