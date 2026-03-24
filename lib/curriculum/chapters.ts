// ============================================
// CBSE Chapter Data - NCERT Aligned
// Representative chapters for key subjects
// ============================================

import type { Chapter, ClassLevel } from "@/lib/types";

// Class 10 Science Chapters (NCERT)
const CLASS_10_SCIENCE: Chapter[] = [
  {
    id: "c10-sci-ch1",
    subjectId: "science",
    classLevel: 10,
    number: 1,
    title: "Chemical Reactions and Equations",
    titleHi: "रासायनिक अभिक्रियाएँ एवं समीकरण",
    description: "Types of chemical reactions, balancing equations, corrosion and rancidity",
    topics: [
      {
        id: "c10-sci-ch1-t1",
        title: "Chemical Equations",
        titleHi: "रासायनिक समीकरण",
        subtopics: ["Writing chemical equations", "Balanced chemical equations", "Implications of a balanced equation"],
        keywords: ["reactants", "products", "arrow notation", "balancing"],
        bloomsLevel: "understand",
        weightage: 3,
      },
      {
        id: "c10-sci-ch1-t2",
        title: "Types of Chemical Reactions",
        titleHi: "रासायनिक अभिक्रियाओं के प्रकार",
        subtopics: ["Combination", "Decomposition", "Displacement", "Double displacement", "Redox reactions"],
        keywords: ["exothermic", "endothermic", "precipitation", "neutralization"],
        bloomsLevel: "apply",
        weightage: 5,
      },
      {
        id: "c10-sci-ch1-t3",
        title: "Effects of Oxidation in Everyday Life",
        titleHi: "दैनिक जीवन में ऑक्सीकरण के प्रभाव",
        subtopics: ["Corrosion", "Rancidity", "Prevention methods"],
        keywords: ["rusting", "galvanization", "antioxidants"],
        bloomsLevel: "analyze",
        weightage: 2,
      },
    ],
    learningObjectives: [
      "Write and balance chemical equations",
      "Identify types of chemical reactions",
      "Explain oxidation and reduction",
      "Describe corrosion and rancidity with prevention methods",
    ],
    estimatedPeriods: 8,
    ncertPageRange: { start: 1, end: 24 },
  },
  {
    id: "c10-sci-ch2",
    subjectId: "science",
    classLevel: 10,
    number: 2,
    title: "Acids, Bases and Salts",
    titleHi: "अम्ल, क्षारक एवं लवण",
    description: "Properties of acids, bases and salts, pH scale, importance in everyday life",
    topics: [
      {
        id: "c10-sci-ch2-t1",
        title: "Understanding Acids and Bases",
        titleHi: "अम्ल और क्षारक को समझना",
        subtopics: ["Indicators", "Acid-base reactions with metals", "Acid-base reactions with carbonates"],
        keywords: ["litmus", "phenolphthalein", "methyl orange", "neutralization"],
        bloomsLevel: "understand",
        weightage: 3,
      },
      {
        id: "c10-sci-ch2-t2",
        title: "Acids and Bases in Water",
        titleHi: "जल में अम्ल और क्षारक",
        subtopics: ["pH scale", "pH importance in everyday life", "Strong and weak acids/bases"],
        keywords: ["hydrogen ions", "hydroxide ions", "dilution", "universal indicator"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c10-sci-ch2-t3",
        title: "Salts",
        titleHi: "लवण",
        subtopics: ["Family of salts", "pH of salts", "Common salt", "Baking soda", "Washing soda", "Plaster of Paris"],
        keywords: ["NaCl", "NaHCO3", "Na2CO3", "CaSO4", "bleaching powder"],
        bloomsLevel: "apply",
        weightage: 3,
      },
    ],
    learningObjectives: [
      "Classify substances as acids, bases, or salts",
      "Understand pH scale and its applications",
      "Describe preparation and properties of common salts",
      "Explain the importance of pH in daily life",
    ],
    estimatedPeriods: 8,
    ncertPageRange: { start: 25, end: 48 },
  },
  {
    id: "c10-sci-ch3",
    subjectId: "science",
    classLevel: 10,
    number: 3,
    title: "Life Processes",
    titleHi: "जैव प्रक्रम",
    description: "Nutrition, respiration, transportation and excretion in organisms",
    topics: [
      {
        id: "c10-sci-ch3-t1",
        title: "Nutrition",
        titleHi: "पोषण",
        subtopics: ["Autotrophic nutrition", "Heterotrophic nutrition", "Nutrition in human beings"],
        keywords: ["photosynthesis", "stomata", "enzymes", "peristalsis"],
        bloomsLevel: "understand",
        weightage: 4,
      },
      {
        id: "c10-sci-ch3-t2",
        title: "Respiration",
        titleHi: "श्वसन",
        subtopics: ["Aerobic respiration", "Anaerobic respiration", "Human respiratory system"],
        keywords: ["ATP", "glucose", "alveoli", "diaphragm", "fermentation"],
        bloomsLevel: "understand",
        weightage: 3,
      },
      {
        id: "c10-sci-ch3-t3",
        title: "Transportation",
        titleHi: "परिवहन",
        subtopics: ["Transport in human beings", "Transport in plants", "Blood circulation"],
        keywords: ["heart", "arteries", "veins", "xylem", "phloem", "blood pressure"],
        bloomsLevel: "analyze",
        weightage: 4,
      },
      {
        id: "c10-sci-ch3-t4",
        title: "Excretion",
        titleHi: "उत्सर्जन",
        subtopics: ["Excretion in humans", "Excretion in plants", "Dialysis"],
        keywords: ["nephron", "kidney", "urine formation", "hemodialysis"],
        bloomsLevel: "understand",
        weightage: 2,
      },
    ],
    learningObjectives: [
      "Explain different modes of nutrition",
      "Compare aerobic and anaerobic respiration",
      "Describe the human circulatory system",
      "Explain the process of excretion in humans",
    ],
    estimatedPeriods: 12,
    ncertPageRange: { start: 49, end: 80 },
  },
  {
    id: "c10-sci-ch4",
    subjectId: "science",
    classLevel: 10,
    number: 4,
    title: "Light - Reflection and Refraction",
    titleHi: "प्रकाश - परावर्तन तथा अपवर्तन",
    description: "Laws of reflection and refraction, mirrors and lenses, image formation",
    topics: [
      {
        id: "c10-sci-ch4-t1",
        title: "Reflection of Light",
        titleHi: "प्रकाश का परावर्तन",
        subtopics: ["Laws of reflection", "Spherical mirrors", "Image formation by mirrors", "Mirror formula"],
        keywords: ["concave", "convex", "focal length", "radius of curvature", "magnification"],
        bloomsLevel: "apply",
        weightage: 5,
      },
      {
        id: "c10-sci-ch4-t2",
        title: "Refraction of Light",
        titleHi: "प्रकाश का अपवर्तन",
        subtopics: ["Laws of refraction", "Refractive index", "Refraction by lenses", "Lens formula", "Power of lens"],
        keywords: ["Snell's law", "total internal reflection", "convex lens", "concave lens"],
        bloomsLevel: "apply",
        weightage: 5,
      },
    ],
    learningObjectives: [
      "State and apply laws of reflection and refraction",
      "Draw ray diagrams for mirrors and lenses",
      "Use mirror and lens formulas for numerical problems",
      "Understand sign convention for optical instruments",
    ],
    estimatedPeriods: 10,
    ncertPageRange: { start: 81, end: 110 },
  },
  {
    id: "c10-sci-ch5",
    subjectId: "science",
    classLevel: 10,
    number: 5,
    title: "Electricity",
    titleHi: "विद्युत",
    description: "Electric current, Ohm's law, resistance, circuits, power and energy",
    topics: [
      {
        id: "c10-sci-ch5-t1",
        title: "Electric Current and Circuit",
        titleHi: "विद्युत धारा और परिपथ",
        subtopics: ["Electric current", "Electric potential", "Circuit diagrams", "Ohm's law"],
        keywords: ["ampere", "volt", "resistance", "ohm", "ammeter", "voltmeter"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c10-sci-ch5-t2",
        title: "Resistance and Resistivity",
        titleHi: "प्रतिरोध और प्रतिरोधकता",
        subtopics: ["Factors affecting resistance", "Series combination", "Parallel combination", "Resistivity"],
        keywords: ["equivalent resistance", "series", "parallel", "specific resistance"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c10-sci-ch5-t3",
        title: "Heating Effect of Current",
        titleHi: "विद्युत धारा का ऊष्मीय प्रभाव",
        subtopics: ["Joule's law", "Electric power", "Electric energy", "Practical applications"],
        keywords: ["watt", "kilowatt hour", "fuse", "MCB", "electric heater"],
        bloomsLevel: "apply",
        weightage: 3,
      },
    ],
    learningObjectives: [
      "Apply Ohm's law to solve circuit problems",
      "Calculate equivalent resistance in series and parallel",
      "Compute electric power and energy consumption",
      "Draw and interpret circuit diagrams",
    ],
    estimatedPeriods: 10,
    ncertPageRange: { start: 111, end: 140 },
  },
];

// Class 10 Mathematics Chapters (NCERT)
const CLASS_10_MATH: Chapter[] = [
  {
    id: "c10-math-ch1",
    subjectId: "mathematics",
    classLevel: 10,
    number: 1,
    title: "Real Numbers",
    titleHi: "वास्तविक संख्याएँ",
    description: "Euclid's division lemma, Fundamental theorem of arithmetic, irrational and rational numbers",
    topics: [
      {
        id: "c10-math-ch1-t1",
        title: "Euclid's Division Lemma",
        titleHi: "यूक्लिड विभाजन प्रमेयिका",
        subtopics: ["Division algorithm", "HCF using Euclid's algorithm"],
        keywords: ["dividend", "divisor", "quotient", "remainder", "HCF"],
        bloomsLevel: "apply",
        weightage: 3,
      },
      {
        id: "c10-math-ch1-t2",
        title: "Fundamental Theorem of Arithmetic",
        titleHi: "अंकगणित की आधारभूत प्रमेय",
        subtopics: ["Prime factorization", "HCF and LCM using prime factorization"],
        keywords: ["prime", "composite", "unique factorization", "LCM"],
        bloomsLevel: "apply",
        weightage: 3,
      },
      {
        id: "c10-math-ch1-t3",
        title: "Irrational Numbers",
        titleHi: "अपरिमेय संख्याएँ",
        subtopics: ["Proof of irrationality", "Decimal expansions of rational numbers"],
        keywords: ["irrational", "rational", "terminating", "non-terminating"],
        bloomsLevel: "analyze",
        weightage: 2,
      },
    ],
    learningObjectives: [
      "Apply Euclid's division lemma to find HCF",
      "Use Fundamental Theorem of Arithmetic for HCF and LCM",
      "Prove irrationality of numbers like √2, √3",
      "Determine decimal expansion nature of rational numbers",
    ],
    estimatedPeriods: 6,
  },
  {
    id: "c10-math-ch2",
    subjectId: "mathematics",
    classLevel: 10,
    number: 2,
    title: "Polynomials",
    titleHi: "बहुपद",
    description: "Zeros of polynomial, relationship between zeros and coefficients, division algorithm",
    topics: [
      {
        id: "c10-math-ch2-t1",
        title: "Geometrical Meaning of Zeros",
        titleHi: "शून्यकों का ज्यामितीय अर्थ",
        subtopics: ["Graphs of polynomials", "Number of zeros"],
        keywords: ["parabola", "x-intercept", "zero", "root"],
        bloomsLevel: "understand",
        weightage: 2,
      },
      {
        id: "c10-math-ch2-t2",
        title: "Relationship between Zeros and Coefficients",
        titleHi: "शून्यकों और गुणांकों के बीच सम्बन्ध",
        subtopics: ["Sum and product of zeros", "Quadratic polynomials", "Cubic polynomials"],
        keywords: ["alpha", "beta", "sum of zeros", "product of zeros"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c10-math-ch2-t3",
        title: "Division Algorithm for Polynomials",
        titleHi: "बहुपदों के लिए विभाजन एल्गोरिथ्म",
        subtopics: ["Long division of polynomials", "Verifying relationships"],
        keywords: ["dividend", "divisor", "quotient", "remainder"],
        bloomsLevel: "apply",
        weightage: 2,
      },
    ],
    learningObjectives: [
      "Find zeros of a polynomial graphically",
      "Verify relationship between zeros and coefficients",
      "Perform polynomial long division",
      "Find remaining zeros given some zeros",
    ],
    estimatedPeriods: 6,
  },
  {
    id: "c10-math-ch3",
    subjectId: "mathematics",
    classLevel: 10,
    number: 3,
    title: "Pair of Linear Equations in Two Variables",
    titleHi: "दो चरों वाले रैखिक समीकरण युग्म",
    description: "Graphical and algebraic methods to solve linear equations",
    topics: [
      {
        id: "c10-math-ch3-t1",
        title: "Graphical Method",
        titleHi: "आलेखीय विधि",
        subtopics: ["Consistent and inconsistent pairs", "Dependent equations", "Graphical representation"],
        keywords: ["intersecting", "parallel", "coincident", "unique solution", "no solution"],
        bloomsLevel: "understand",
        weightage: 2,
      },
      {
        id: "c10-math-ch3-t2",
        title: "Algebraic Methods",
        titleHi: "बीजगणितीय विधियाँ",
        subtopics: ["Substitution method", "Elimination method", "Cross-multiplication method"],
        keywords: ["substitution", "elimination", "cross multiplication", "simultaneous"],
        bloomsLevel: "apply",
        weightage: 5,
      },
      {
        id: "c10-math-ch3-t3",
        title: "Word Problems",
        titleHi: "शब्द समस्याएँ",
        subtopics: ["Age problems", "Number problems", "Speed-distance problems", "Geometry problems"],
        keywords: ["framing equations", "word problems", "applications"],
        bloomsLevel: "apply",
        weightage: 3,
      },
    ],
    learningObjectives: [
      "Solve pair of linear equations graphically",
      "Apply substitution, elimination and cross-multiplication methods",
      "Determine consistency of linear equations",
      "Formulate and solve real-life word problems",
    ],
    estimatedPeriods: 10,
  },
];

// Class 12 Physics Chapters (NCERT)
const CLASS_12_PHYSICS: Chapter[] = [
  {
    id: "c12-phy-ch1",
    subjectId: "physics",
    classLevel: 12,
    number: 1,
    title: "Electric Charges and Fields",
    titleHi: "वैद्युत आवेश तथा क्षेत्र",
    description: "Coulomb's law, electric field, Gauss's theorem",
    topics: [
      {
        id: "c12-phy-ch1-t1",
        title: "Electric Charges",
        titleHi: "वैद्युत आवेश",
        subtopics: ["Properties of charges", "Coulomb's law", "Forces between multiple charges"],
        keywords: ["coulomb", "quantization", "conservation", "superposition"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c12-phy-ch1-t2",
        title: "Electric Field",
        titleHi: "वैद्युत क्षेत्र",
        subtopics: ["Field due to point charge", "Field lines", "Electric dipole", "Dipole in uniform field"],
        keywords: ["field lines", "dipole moment", "torque", "continuous charge distribution"],
        bloomsLevel: "apply",
        weightage: 4,
      },
      {
        id: "c12-phy-ch1-t3",
        title: "Gauss's Theorem",
        titleHi: "गाउस की प्रमेय",
        subtopics: ["Electric flux", "Gauss's law", "Applications of Gauss's law"],
        keywords: ["flux", "Gaussian surface", "symmetry", "infinite plane", "spherical shell"],
        bloomsLevel: "apply",
        weightage: 4,
      },
    ],
    learningObjectives: [
      "Apply Coulomb's law to find forces between charges",
      "Calculate electric field due to various charge distributions",
      "Use Gauss's theorem to find electric field",
      "Analyze behavior of electric dipole in external field",
    ],
    estimatedPeriods: 10,
  },
  {
    id: "c12-phy-ch2",
    subjectId: "physics",
    classLevel: 12,
    number: 2,
    title: "Electrostatic Potential and Capacitance",
    titleHi: "स्थिरवैद्युत विभव तथा धारिता",
    description: "Electric potential, capacitors, dielectrics",
    topics: [
      {
        id: "c12-phy-ch2-t1",
        title: "Electrostatic Potential",
        titleHi: "स्थिरवैद्युत विभव",
        subtopics: ["Potential due to point charge", "Potential due to dipole", "Equipotential surfaces"],
        keywords: ["potential energy", "electron volt", "equipotential", "work done"],
        bloomsLevel: "apply",
        weightage: 3,
      },
      {
        id: "c12-phy-ch2-t2",
        title: "Capacitance",
        titleHi: "धारिता",
        subtopics: ["Parallel plate capacitor", "Effect of dielectric", "Combination of capacitors", "Energy stored"],
        keywords: ["farad", "dielectric constant", "series", "parallel", "energy density"],
        bloomsLevel: "apply",
        weightage: 4,
      },
    ],
    learningObjectives: [
      "Calculate electrostatic potential at various points",
      "Analyze parallel plate capacitors with and without dielectrics",
      "Find equivalent capacitance in series and parallel",
      "Compute energy stored in capacitors",
    ],
    estimatedPeriods: 8,
  },
];

// Chapter registry
const ALL_CHAPTERS: Chapter[] = [
  ...CLASS_10_SCIENCE,
  ...CLASS_10_MATH,
  ...CLASS_12_PHYSICS,
];

export function getChaptersForSubject(subjectId: string, classLevel: ClassLevel): Chapter[] {
  return ALL_CHAPTERS.filter(
    (ch) => ch.subjectId === subjectId && ch.classLevel === classLevel
  ).sort((a, b) => a.number - b.number);
}

export function getChapterById(id: string): Chapter | undefined {
  return ALL_CHAPTERS.find((ch) => ch.id === id);
}

export function getAllChapters(): Chapter[] {
  return ALL_CHAPTERS;
}

export { CLASS_10_SCIENCE, CLASS_10_MATH, CLASS_12_PHYSICS };
