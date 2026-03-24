// ============================================
// CBSE Subject Definitions - All Classes 1-12
// ============================================

import type { Subject, ClassLevel } from "@/lib/types";

export const CBSE_SUBJECTS: Subject[] = [
  // --- Languages ---
  {
    id: "english",
    name: "English",
    nameHi: "अंग्रेज़ी",
    code: "184",
    category: "language",
    classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hasLab: false,
    ncertBookIds: ["marigold", "honeydew", "beehive", "flamingo", "vistas"],
  },
  {
    id: "hindi",
    name: "Hindi",
    nameHi: "हिन्दी",
    code: "002",
    category: "language",
    classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hasLab: false,
    ncertBookIds: ["rimjhim", "vasant", "kshitij", "aroh", "vitan"],
  },
  {
    id: "sanskrit",
    name: "Sanskrit",
    nameHi: "संस्कृत",
    code: "122",
    category: "language",
    classes: [6, 7, 8, 9, 10],
    hasLab: false,
    ncertBookIds: ["ruchira", "shemushi"],
  },

  // --- Mathematics ---
  {
    id: "mathematics",
    name: "Mathematics",
    nameHi: "गणित",
    code: "041",
    category: "mathematics",
    classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hasLab: false,
    ncertBookIds: ["math-magic", "ncert-math"],
  },

  // --- Science ---
  {
    id: "science",
    name: "Science",
    nameHi: "विज्ञान",
    code: "086",
    category: "science",
    classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    hasLab: true,
    ncertBookIds: ["ncert-science"],
  },
  {
    id: "physics",
    name: "Physics",
    nameHi: "भौतिक विज्ञान",
    code: "042",
    category: "science",
    classes: [11, 12],
    streams: ["science"],
    hasLab: true,
    ncertBookIds: ["ncert-physics-1", "ncert-physics-2"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    nameHi: "रसायन विज्ञान",
    code: "043",
    category: "science",
    classes: [11, 12],
    streams: ["science"],
    hasLab: true,
    ncertBookIds: ["ncert-chemistry-1", "ncert-chemistry-2"],
  },
  {
    id: "biology",
    name: "Biology",
    nameHi: "जीव विज्ञान",
    code: "044",
    category: "science",
    classes: [11, 12],
    streams: ["science"],
    hasLab: true,
    ncertBookIds: ["ncert-biology"],
  },

  // --- Social Science ---
  {
    id: "social_science",
    name: "Social Science",
    nameHi: "सामाजिक विज्ञान",
    code: "087",
    category: "social_science",
    classes: [6, 7, 8, 9, 10],
    hasLab: false,
    ncertBookIds: ["history", "geography", "civics", "economics"],
  },
  {
    id: "history",
    name: "History",
    nameHi: "इतिहास",
    code: "027",
    category: "social_science",
    classes: [11, 12],
    streams: ["humanities"],
    hasLab: false,
    ncertBookIds: ["themes-world-history", "themes-indian-history"],
  },
  {
    id: "geography",
    name: "Geography",
    nameHi: "भूगोल",
    code: "029",
    category: "social_science",
    classes: [11, 12],
    streams: ["humanities"],
    hasLab: false,
    ncertBookIds: ["ncert-geography"],
  },
  {
    id: "political_science",
    name: "Political Science",
    nameHi: "राजनीति विज्ञान",
    code: "028",
    category: "social_science",
    classes: [11, 12],
    streams: ["humanities"],
    hasLab: false,
    ncertBookIds: ["indian-constitution", "political-theory"],
  },
  {
    id: "economics",
    name: "Economics",
    nameHi: "अर्थशास्त्र",
    code: "030",
    category: "social_science",
    classes: [11, 12],
    streams: ["commerce", "humanities"],
    hasLab: false,
    ncertBookIds: ["indian-economic-development", "statistics-economics"],
  },

  // --- Commerce ---
  {
    id: "accountancy",
    name: "Accountancy",
    nameHi: "लेखाशास्त्र",
    code: "055",
    category: "social_science",
    classes: [11, 12],
    streams: ["commerce"],
    hasLab: false,
    ncertBookIds: ["accountancy-1", "accountancy-2"],
  },
  {
    id: "business_studies",
    name: "Business Studies",
    nameHi: "व्यवसाय अध्ययन",
    code: "054",
    category: "social_science",
    classes: [11, 12],
    streams: ["commerce"],
    hasLab: false,
    ncertBookIds: ["business-studies"],
  },

  // --- Computer Science ---
  {
    id: "computer_science",
    name: "Computer Science",
    nameHi: "कंप्यूटर विज्ञान",
    code: "083",
    category: "computer_science",
    classes: [11, 12],
    streams: ["science", "commerce"],
    hasLab: true,
    ncertBookIds: ["ncert-cs-python"],
  },
  {
    id: "informatics_practices",
    name: "Informatics Practices",
    nameHi: "सूचना विज्ञान अभ्यास",
    code: "065",
    category: "computer_science",
    classes: [11, 12],
    streams: ["science", "commerce"],
    hasLab: true,
    ncertBookIds: ["ncert-ip"],
  },

  // --- EVS (Primary) ---
  {
    id: "evs",
    name: "Environmental Studies",
    nameHi: "पर्यावरण अध्ययन",
    code: "EVS",
    category: "science",
    classes: [1, 2, 3, 4, 5],
    hasLab: false,
    ncertBookIds: ["looking-around"],
  },

  // --- Physical Education ---
  {
    id: "physical_education",
    name: "Physical Education",
    nameHi: "शारीरिक शिक्षा",
    code: "048",
    category: "physical_education",
    classes: [9, 10, 11, 12],
    hasLab: false,
    ncertBookIds: ["health-physical-education"],
  },
];

export function getSubjectsForClass(classLevel: ClassLevel, stream?: string): Subject[] {
  return CBSE_SUBJECTS.filter((subject) => {
    if (!subject.classes.includes(classLevel)) return false;
    if (classLevel >= 11 && subject.streams && stream) {
      return subject.streams.includes(stream as never);
    }
    return true;
  });
}

export function getSubjectById(id: string): Subject | undefined {
  return CBSE_SUBJECTS.find((s) => s.id === id);
}
