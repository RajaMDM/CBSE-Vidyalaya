// ============================================
// CBSE Vidyalaya - Core Type Definitions
// Inspired by OpenMAIC architecture
// ============================================

// --- Curriculum Types ---

export type ClassLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Board = "cbse" | "icse";

export type Language = "en" | "hi";

export type Stream = "science" | "commerce" | "humanities";

export type SubjectCategory =
  | "language"
  | "mathematics"
  | "science"
  | "social_science"
  | "computer_science"
  | "arts"
  | "physical_education";

export interface Subject {
  id: string;
  name: string;
  nameHi: string;
  code: string; // CBSE subject code
  category: SubjectCategory;
  classes: ClassLevel[];
  streams?: Stream[]; // For classes 11-12
  hasLab: boolean;
  ncertBookIds: string[];
}

export interface Chapter {
  id: string;
  subjectId: string;
  classLevel: ClassLevel;
  number: number;
  title: string;
  titleHi: string;
  description: string;
  topics: Topic[];
  learningObjectives: string[];
  estimatedPeriods: number; // 40-min periods
  ncertPageRange?: { start: number; end: number };
}

export interface Topic {
  id: string;
  title: string;
  titleHi: string;
  subtopics: string[];
  keywords: string[];
  bloomsLevel: BloomsLevel;
  weightage: number; // Marks weightage in board exam
}

export type BloomsLevel =
  | "remember"
  | "understand"
  | "apply"
  | "analyze"
  | "evaluate"
  | "create";

// --- Classroom Types ---

export interface Classroom {
  id: string;
  title: string;
  titleHi?: string;
  classLevel: ClassLevel;
  subjectId: string;
  chapterId?: string;
  language: Language;
  scenes: Scene[];
  agents: Agent[];
  createdAt: string;
  updatedAt: string;
  settings: ClassroomSettings;
}

export interface ClassroomSettings {
  language: Language;
  difficulty: "foundation" | "standard" | "advanced";
  includeNcertExamples: boolean;
  includePreviousYearQuestions: boolean;
  boardExamFocus: boolean;
  labSimulation: boolean;
  duration: number; // minutes
}

export interface Scene {
  id: string;
  type: SceneType;
  title: string;
  titleHi?: string;
  content: SceneContent;
  actions: Action[];
  duration: number; // seconds
  order: number;
}

export type SceneType =
  | "lecture"
  | "slide"
  | "quiz"
  | "discussion"
  | "lab_simulation"
  | "pbl_activity"
  | "revision"
  | "board_exam_practice"
  | "ncert_exercise";

export interface SceneContent {
  slides?: Slide[];
  narration?: string;
  narrationHi?: string;
  quiz?: QuizQuestion[];
  simulation?: LabSimulation;
  discussion?: DiscussionPrompt;
  whiteboard?: WhiteboardContent;
}

export interface Slide {
  id: string;
  title: string;
  content: string; // Markdown/HTML
  notes: string;
  layout: "title" | "content" | "two_column" | "image" | "diagram" | "formula";
  media?: MediaAsset[];
}

// --- Assessment Types (CBSE Pattern) ---

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  questionHi?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
  bloomsLevel: BloomsLevel;
  chapterId: string;
  topicId: string;
  isFromPreviousYear?: boolean;
  year?: string;
  section?: CBSESection;
}

export type QuestionType =
  | "mcq"
  | "assertion_reason"
  | "case_based"
  | "short_answer_2"
  | "short_answer_3"
  | "long_answer_5"
  | "very_long_answer"
  | "numerical"
  | "diagram_based"
  | "map_based"
  | "fill_blank"
  | "true_false"
  | "match_columns";

export type CBSESection = "A" | "B" | "C" | "D" | "E";

export interface AssessmentPaper {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subjectId: string;
  type: "unit_test" | "half_yearly" | "annual" | "pre_board" | "sample_paper";
  totalMarks: number;
  duration: number; // minutes
  sections: PaperSection[];
  markingScheme: MarkingSchemeEntry[];
}

export interface PaperSection {
  section: CBSESection;
  title: string;
  instructions: string;
  questions: QuizQuestion[];
  totalMarks: number;
}

export interface MarkingSchemeEntry {
  questionId: string;
  stepwiseMarks: { step: string; marks: number }[];
  commonErrors: string[];
  alternativeAnswers?: string[];
}

// --- Agent Types ---

export interface Agent {
  id: string;
  name: string;
  nameHi?: string;
  role: AgentRole;
  personality: string;
  subjectExpertise: string[];
  avatar: string;
  voiceId?: string;
  language: Language;
}

export type AgentRole =
  | "teacher"
  | "lab_assistant"
  | "exam_coach"
  | "peer_student"
  | "doubt_resolver"
  | "ncert_expert";

// --- Action Types (from OpenMAIC) ---

export type ActionType =
  | "speech"
  | "spotlight"
  | "laser"
  | "wb_open"
  | "wb_draw_text"
  | "wb_draw_shape"
  | "wb_draw_chart"
  | "wb_draw_latex"
  | "wb_draw_table"
  | "wb_draw_line"
  | "wb_delete"
  | "wb_clear"
  | "wb_close"
  | "play_video"
  | "show_slide"
  | "show_quiz"
  | "show_simulation"
  | "discussion"
  | "ncert_reference"
  | "formula_highlight"
  | "diagram_draw";

export interface Action {
  id: string;
  type: ActionType;
  agentId: string;
  payload: Record<string, unknown>;
  duration?: number;
  delay?: number;
}

// --- Lab Simulation Types ---

export interface LabSimulation {
  id: string;
  title: string;
  subject: string;
  classLevel: ClassLevel;
  apparatus: string[];
  procedure: string[];
  observations: string;
  conclusion: string;
  precautions: string[];
  vivaQuestions: QuizQuestion[];
  htmlContent: string; // Interactive HTML simulation
}

// --- Discussion Types ---

export interface DiscussionPrompt {
  topic: string;
  topicHi?: string;
  context: string;
  agentPersonas: { agentId: string; stance: string }[];
  guidelines: string[];
}

// --- Whiteboard Types ---

export interface WhiteboardContent {
  elements: WhiteboardElement[];
}

export interface WhiteboardElement {
  id: string;
  type: "text" | "shape" | "chart" | "latex" | "table" | "line" | "image";
  position: { x: number; y: number };
  size: { width: number; height: number };
  data: Record<string, unknown>;
  style?: Record<string, string>;
}

// --- Media Types ---

export interface MediaAsset {
  id: string;
  type: "image" | "video" | "audio" | "diagram";
  url: string;
  alt: string;
  caption?: string;
}

// --- Grading System ---

export interface CBSEGrade {
  grade: string;
  marksRange: { min: number; max: number };
  gradePoint: number;
  description: string;
}

export const CBSE_GRADING_SYSTEM: CBSEGrade[] = [
  { grade: "A1", marksRange: { min: 91, max: 100 }, gradePoint: 10, description: "Outstanding" },
  { grade: "A2", marksRange: { min: 81, max: 90 }, gradePoint: 9, description: "Excellent" },
  { grade: "B1", marksRange: { min: 71, max: 80 }, gradePoint: 8, description: "Very Good" },
  { grade: "B2", marksRange: { min: 61, max: 70 }, gradePoint: 7, description: "Good" },
  { grade: "C1", marksRange: { min: 51, max: 60 }, gradePoint: 6, description: "Above Average" },
  { grade: "C2", marksRange: { min: 41, max: 50 }, gradePoint: 5, description: "Average" },
  { grade: "D", marksRange: { min: 33, max: 40 }, gradePoint: 4, description: "Below Average" },
  { grade: "E1", marksRange: { min: 21, max: 32 }, gradePoint: 0, description: "Needs Improvement" },
  { grade: "E2", marksRange: { min: 0, max: 20 }, gradePoint: 0, description: "Unsatisfactory" },
];

// --- Generation Types ---

export interface GenerationRequest {
  classLevel: ClassLevel;
  subjectId: string;
  chapterId?: string;
  topics?: string[];
  language: Language;
  settings: ClassroomSettings;
  referenceDocument?: string; // PDF/text content
  customPrompt?: string;
}

export interface GenerationOutline {
  title: string;
  titleHi?: string;
  scenes: {
    type: SceneType;
    title: string;
    description: string;
    estimatedDuration: number;
  }[];
  agents: {
    role: AgentRole;
    name: string;
    expertise: string;
  }[];
  totalDuration: number;
}
