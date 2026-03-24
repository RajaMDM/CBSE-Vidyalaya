"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Classroom, Scene, Agent } from "@/lib/types";

interface ChatMessage {
  id: string;
  agentName: string;
  content: string;
  type: "message" | "question" | "answer" | "system";
}

export default function ClassroomPage() {
  const params = useParams();
  const classroomId = params.id as string;

  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"slide" | "whiteboard" | "chat">("slide");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClassroom() {
      try {
        const res = await fetch(`/api/classroom/${classroomId}`);
        if (res.ok) {
          const data = await res.json();
          setClassroom(data);
          setChatMessages([
            {
              id: "welcome",
              agentName: "System",
              content: `Welcome to "${data.title}"! Class ${data.classLevel}. Click Play to start the lesson.`,
              type: "system",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load classroom:", error);
      } finally {
        setLoading(false);
      }
    }
    loadClassroom();
  }, [classroomId]);

  const currentScene: Scene | undefined = classroom?.scenes[currentSceneIndex];
  const totalScenes = classroom?.scenes.length || 0;

  const nextScene = useCallback(() => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex((i) => i + 1);
    }
  }, [currentSceneIndex, totalScenes]);

  const prevScene = useCallback(() => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((i) => i - 1);
    }
  }, [currentSceneIndex]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      agentName: "You",
      content: userMessage,
      type: "question",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserMessage("");

    // Get AI response
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classroomId,
          message: userMessage,
          sceneContext: currentScene?.title,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-reply",
            agentName: data.agentName || "Guru Bot",
            content: data.response,
            type: "answer",
          },
        ]);
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          agentName: "System",
          content: "Unable to get response. Please try again.",
          type: "system",
        },
      ]);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🏫</div>
          <p className="text-lg font-medium">Loading Classroom...</p>
          <p className="text-sm text-[var(--cbse-text-secondary)] hindi-text">
            कक्षा लोड हो रही है...
          </p>
        </div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Classroom not found</p>
          <Link href="/" className="mt-4 text-[var(--cbse-primary)] underline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-[var(--cbse-border)] bg-[var(--cbse-card)] px-4 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--cbse-text-secondary)] hover:text-[var(--cbse-primary)]">
            &larr;
          </Link>
          <div>
            <h1 className="text-sm font-semibold">{classroom.title}</h1>
            <p className="text-xs text-[var(--cbse-text-secondary)]">
              Class {classroom.classLevel} | Scene {currentSceneIndex + 1}/{totalScenes}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevScene}
            disabled={currentSceneIndex === 0}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-lg bg-[var(--cbse-primary)] px-4 py-1 text-sm font-medium text-white"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={nextScene}
            disabled={currentSceneIndex >= totalScenes - 1}
            className="rounded px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-30"
          >
            Next
          </button>
        </div>

        {/* Agents */}
        <div className="flex items-center gap-1">
          {classroom.agents.map((agent: Agent) => (
            <div
              key={agent.id}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cbse-primary)] text-xs font-bold text-white"
              title={`${agent.name} (${agent.role})`}
            >
              {agent.name.charAt(0)}
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Stage Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="flex border-b border-[var(--cbse-border)] bg-[var(--cbse-card)]">
            {(["slide", "whiteboard", "chat"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-[var(--cbse-primary)] text-[var(--cbse-primary)]"
                    : "text-[var(--cbse-text-secondary)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "slide" && currentScene && (
              <div className="mx-auto max-w-4xl">
                {/* Scene Header */}
                <div className="mb-6 rounded-lg bg-[var(--cbse-primary)] p-4 text-white">
                  <div className="text-xs uppercase tracking-wider opacity-70">
                    {currentScene.type.replace("_", " ")}
                  </div>
                  <h2 className="text-xl font-bold">{currentScene.title}</h2>
                </div>

                {/* Narration */}
                {currentScene.content.narration && (
                  <div className="mb-6 rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-6">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {currentScene.content.narration}
                    </p>
                  </div>
                )}

                {/* Slides */}
                {currentScene.content.slides?.map((slide, i) => (
                  <div
                    key={slide.id || i}
                    className="mb-4 rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-6"
                  >
                    <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: slide.content }}
                    />
                  </div>
                ))}

                {/* Quiz */}
                {currentScene.content.quiz && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[var(--cbse-primary)]">
                      Quiz Time!
                    </h3>
                    {currentScene.content.quiz.map((q, i) => (
                      <div
                        key={q.id}
                        className="rounded-lg border border-[var(--cbse-border)] bg-[var(--cbse-card)] p-4"
                      >
                        <p className="font-medium mb-3">
                          Q{i + 1}. {q.question}
                          <span className="ml-2 text-xs text-[var(--cbse-text-secondary)]">
                            [{q.marks} marks]
                          </span>
                        </p>

                        {q.options && (
                          <div className="space-y-2 mb-3">
                            {q.options.map((opt, j) => (
                              <label
                                key={j}
                                className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer ${
                                  quizAnswers[q.id] === opt
                                    ? "border-[var(--cbse-primary)] bg-blue-50"
                                    : "border-[var(--cbse-border)]"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={q.id}
                                  value={opt}
                                  onChange={() =>
                                    setQuizAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: opt,
                                    }))
                                  }
                                />
                                <span className="text-sm">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() =>
                            setShowExplanation((prev) => ({
                              ...prev,
                              [q.id]: !prev[q.id],
                            }))
                          }
                          className="text-xs text-[var(--cbse-primary)] underline"
                        >
                          {showExplanation[q.id] ? "Hide" : "Show"} Explanation
                        </button>

                        {showExplanation[q.id] && (
                          <div className="mt-2 rounded bg-green-50 p-3 text-sm">
                            <p className="font-medium text-green-800">
                              Answer: {q.correctAnswer}
                            </p>
                            <p className="text-green-700 mt-1">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "whiteboard" && (
              <div className="whiteboard-canvas mx-auto h-[500px] w-full max-w-4xl flex items-center justify-center">
                <p className="text-[var(--cbse-text-secondary)]">
                  Whiteboard will appear here during the lesson
                </p>
              </div>
            )}

            {activeTab === "chat" && (
              <div className="mx-auto max-w-2xl">
                <div className="space-y-3 mb-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-lg p-3 ${
                        msg.type === "system"
                          ? "bg-gray-100 text-center text-sm"
                          : msg.type === "question"
                            ? "ml-auto max-w-[80%] bg-[var(--cbse-primary)] text-white"
                            : "max-w-[80%] border border-[var(--cbse-border)] bg-[var(--cbse-card)]"
                      }`}
                    >
                      {msg.type !== "system" && (
                        <p className="text-xs font-semibold mb-1 opacity-70">
                          {msg.agentName}
                        </p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask a doubt / Type your question..."
                    className="flex-1 rounded-lg border border-[var(--cbse-border)] px-4 py-2 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="rounded-lg bg-[var(--cbse-primary)] px-4 py-2 text-sm font-medium text-white"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Scene Navigation */}
          <div className="border-t border-[var(--cbse-border)] bg-[var(--cbse-card)] px-4 py-2">
            <div className="flex gap-1 overflow-x-auto">
              {classroom.scenes.map((scene: Scene, i: number) => (
                <button
                  key={scene.id}
                  onClick={() => setCurrentSceneIndex(i)}
                  className={`whitespace-nowrap rounded px-3 py-1 text-xs ${
                    i === currentSceneIndex
                      ? "bg-[var(--cbse-primary)] text-white"
                      : "bg-gray-100 text-[var(--cbse-text-secondary)] hover:bg-gray-200"
                  }`}
                >
                  {i + 1}. {scene.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
