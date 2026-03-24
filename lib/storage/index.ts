// ============================================
// Storage Layer - Provider Pattern
// Supports local filesystem and S3
// ============================================

import type { Classroom, AssessmentPaper } from "@/lib/types";
import type { AssessmentResult } from "@/lib/assessment";

export interface StorageProvider {
  // Classroom operations
  saveClassroom(classroom: Classroom): Promise<void>;
  getClassroom(id: string): Promise<Classroom | null>;
  listClassrooms(): Promise<Classroom[]>;
  deleteClassroom(id: string): Promise<void>;

  // Assessment operations
  saveAssessment(paper: AssessmentPaper): Promise<void>;
  getAssessment(id: string): Promise<AssessmentPaper | null>;
  listAssessments(subjectId?: string, classLevel?: number): Promise<AssessmentPaper[]>;

  // Result operations
  saveResult(classroomId: string, result: AssessmentResult): Promise<void>;
  getResults(classroomId: string): Promise<AssessmentResult[]>;

  // Media operations
  saveMedia(id: string, data: Buffer, contentType: string): Promise<string>;
  getMediaUrl(id: string): Promise<string | null>;
}

// In-memory storage for development
class MemoryStorage implements StorageProvider {
  private classrooms = new Map<string, Classroom>();
  private assessments = new Map<string, AssessmentPaper>();
  private results = new Map<string, AssessmentResult[]>();
  private media = new Map<string, { data: Buffer; contentType: string }>();

  async saveClassroom(classroom: Classroom): Promise<void> {
    this.classrooms.set(classroom.id, classroom);
  }

  async getClassroom(id: string): Promise<Classroom | null> {
    return this.classrooms.get(id) || null;
  }

  async listClassrooms(): Promise<Classroom[]> {
    return Array.from(this.classrooms.values());
  }

  async deleteClassroom(id: string): Promise<void> {
    this.classrooms.delete(id);
  }

  async saveAssessment(paper: AssessmentPaper): Promise<void> {
    this.assessments.set(paper.id, paper);
  }

  async getAssessment(id: string): Promise<AssessmentPaper | null> {
    return this.assessments.get(id) || null;
  }

  async listAssessments(subjectId?: string, classLevel?: number): Promise<AssessmentPaper[]> {
    let papers = Array.from(this.assessments.values());
    if (subjectId) papers = papers.filter((p) => p.subjectId === subjectId);
    if (classLevel) papers = papers.filter((p) => p.classLevel === classLevel);
    return papers;
  }

  async saveResult(classroomId: string, result: AssessmentResult): Promise<void> {
    const existing = this.results.get(classroomId) || [];
    existing.push(result);
    this.results.set(classroomId, existing);
  }

  async getResults(classroomId: string): Promise<AssessmentResult[]> {
    return this.results.get(classroomId) || [];
  }

  async saveMedia(id: string, data: Buffer, contentType: string): Promise<string> {
    this.media.set(id, { data, contentType });
    return `/api/media/${id}`;
  }

  async getMediaUrl(id: string): Promise<string | null> {
    return this.media.has(id) ? `/api/media/${id}` : null;
  }
}

// Singleton storage instance
let storageInstance: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (!storageInstance) {
    storageInstance = new MemoryStorage();
  }
  return storageInstance;
}
