// ============================================
// CBSE Lab Experiments - Science Practicals
// ============================================

import type { LabSimulation, ClassLevel, QuizQuestion } from "@/lib/types";

export interface LabExperiment {
  id: string;
  subjectId: string;
  classLevel: ClassLevel;
  chapterId: string;
  title: string;
  titleHi: string;
  aim: string;
  materialsRequired: string[];
  theory: string;
  procedure: string[];
  observations: string;
  result: string;
  precautions: string[];
  vivaQuestions: QuizQuestion[];
}

export const CBSE_LAB_EXPERIMENTS: LabExperiment[] = [
  // Class 10 Science Lab Experiments
  {
    id: "lab-c10-sci-01",
    subjectId: "science",
    classLevel: 10,
    chapterId: "c10-sci-ch1",
    title: "Study of Chemical Reactions - Types of Reactions",
    titleHi: "रासायनिक अभिक्रियाओं का अध्ययन - अभिक्रियाओं के प्रकार",
    aim: "To perform and observe the following reactions and classify them: combination, decomposition, displacement, and double displacement.",
    materialsRequired: [
      "Iron nails", "Copper sulphate solution", "Test tubes", "Bunsen burner",
      "Lead nitrate solution", "Potassium iodide solution", "Quick lime", "Water",
      "Ferrous sulphate crystals",
    ],
    theory: "Chemical reactions involve the transformation of reactants into products. They can be classified based on the nature of change: combination (A + B → AB), decomposition (AB → A + B), displacement (A + BC → AC + B), and double displacement (AB + CD → AD + CB).",
    procedure: [
      "Take a clean iron nail and dip it in copper sulphate solution. Observe the color change after 20 minutes.",
      "Heat ferrous sulphate crystals in a dry test tube. Observe the color change and smell the gas.",
      "Mix lead nitrate and potassium iodide solutions. Observe the precipitate.",
      "Add quick lime (CaO) to water in a beaker. Touch the beaker and note the temperature change.",
    ],
    observations: "1. Iron nail becomes brownish, CuSO4 solution becomes greenish (displacement). 2. Green crystals turn white, brown fumes released (decomposition). 3. Yellow precipitate of PbI2 formed (double displacement). 4. Beaker becomes hot (exothermic combination).",
    result: "Different types of chemical reactions were observed and classified successfully.",
    precautions: [
      "Handle chemicals with care, especially lead nitrate (toxic)",
      "Do not touch hot test tubes directly",
      "Perform heating experiments away from face",
      "Dispose of lead compounds as per safety guidelines",
      "Wear safety goggles and lab coat",
    ],
    vivaQuestions: [
      {
        id: "viva-lab01-q1",
        type: "short_answer_2",
        question: "Why does the color of copper sulphate solution change when an iron nail is dipped in it?",
        correctAnswer: "Iron is more reactive than copper. It displaces copper from copper sulphate solution. The blue color of CuSO4 fades as Fe replaces Cu, forming green ferrous sulphate (FeSO4).",
        explanation: "This is a displacement reaction: Fe + CuSO4 → FeSO4 + Cu",
        marks: 2,
        difficulty: "medium",
        bloomsLevel: "understand",
        chapterId: "c10-sci-ch1",
        topicId: "c10-sci-ch1-t2",
      },
      {
        id: "viva-lab01-q2",
        type: "short_answer_2",
        question: "What type of reaction is the formation of PbI2 precipitate? Write the balanced equation.",
        correctAnswer: "It is a double displacement reaction. Pb(NO3)2 + 2KI → PbI2↓ + 2KNO3",
        explanation: "In double displacement, cations and anions of two compounds exchange to form two new compounds.",
        marks: 2,
        difficulty: "medium",
        bloomsLevel: "apply",
        chapterId: "c10-sci-ch1",
        topicId: "c10-sci-ch1-t2",
      },
    ],
  },
  {
    id: "lab-c10-sci-02",
    subjectId: "science",
    classLevel: 10,
    chapterId: "c10-sci-ch2",
    title: "Finding pH of Various Solutions",
    titleHi: "विभिन्न विलयनों का pH ज्ञात करना",
    aim: "To find the pH of dilute HCl, dilute NaOH, lemon juice, water, dilute sodium bicarbonate solution using pH paper/universal indicator.",
    materialsRequired: [
      "pH paper strips", "Universal indicator", "Dilute HCl", "Dilute NaOH",
      "Lemon juice", "Distilled water", "Sodium bicarbonate solution",
      "Test tubes", "Dropper", "Color chart",
    ],
    theory: "pH is a measure of hydrogen ion concentration in a solution. pH scale ranges from 0 to 14. pH < 7 indicates acidic, pH = 7 indicates neutral, and pH > 7 indicates basic nature of the solution.",
    procedure: [
      "Take five test tubes and label them A to E.",
      "Pour 2 ml each of dilute HCl, dilute NaOH, lemon juice, water, and NaHCO3 solution.",
      "Dip pH paper strip in each solution and compare color with the chart.",
      "Alternatively, add 2-3 drops of universal indicator to each and note the color.",
      "Record the pH value for each solution.",
    ],
    observations: "HCl: pH ≈ 1 (strongly acidic), NaOH: pH ≈ 13 (strongly basic), Lemon juice: pH ≈ 2.5 (acidic), Water: pH ≈ 7 (neutral), NaHCO3: pH ≈ 8.5 (mildly basic).",
    result: "The pH values of different solutions were determined using pH paper and universal indicator.",
    precautions: [
      "Use dilute solutions only",
      "Do not taste or touch chemicals",
      "Use fresh pH paper strips for each test",
      "Compare colors immediately as they may change over time",
      "Handle acids and bases carefully",
    ],
    vivaQuestions: [
      {
        id: "viva-lab02-q1",
        type: "short_answer_2",
        question: "Why is pH important in our digestive system?",
        correctAnswer: "Our stomach produces HCl (pH ≈ 1.5-2) for digestion. Excess acid causes acidity. Antacids (basic) neutralize excess acid. The pH of different parts of the digestive system is optimized for specific enzymes.",
        explanation: "Enzymes work best at specific pH levels - pepsin at pH 2, trypsin at pH 8.",
        marks: 2,
        difficulty: "medium",
        bloomsLevel: "apply",
        chapterId: "c10-sci-ch2",
        topicId: "c10-sci-ch2-t2",
      },
    ],
  },
  {
    id: "lab-c10-sci-03",
    subjectId: "science",
    classLevel: 10,
    chapterId: "c10-sci-ch4",
    title: "Image Formation by a Convex Lens",
    titleHi: "उत्तल लेंस द्वारा प्रतिबिम्ब बनना",
    aim: "To determine the focal length of a convex lens by obtaining the image of a distant object and to study image formation at different positions.",
    materialsRequired: [
      "Convex lens", "Lens holder", "Optical bench", "Screen",
      "Candle", "Matchbox", "Metre scale", "V-shaped lens holder",
    ],
    theory: "A convex lens converges parallel rays at the principal focus. The focal length is the distance between the optical centre and the focus. The lens formula is 1/v - 1/u = 1/f, where u is object distance, v is image distance, and f is focal length.",
    procedure: [
      "Mount the convex lens on the optical bench using a holder.",
      "Focus sunlight (distant object) through the lens onto the screen.",
      "Adjust screen position until a sharp, bright spot is obtained. Measure the distance - this is the approximate focal length.",
      "Place a candle at different positions: beyond 2F, at 2F, between F and 2F, at F, and between F and optical centre.",
      "For each position, adjust the screen to get a sharp image and record u, v, and image characteristics.",
    ],
    observations: "Object beyond 2F: real, inverted, diminished image between F and 2F. Object at 2F: real, inverted, same size at 2F. Object between F and 2F: real, inverted, magnified beyond 2F. Object at F: image at infinity. Object between F and O: virtual, erect, magnified on same side.",
    result: "Focal length of the convex lens = ___ cm. Image formation at various positions verified as per lens theory.",
    precautions: [
      "Use a thin convex lens for accurate results",
      "Ensure the optical bench is level",
      "Avoid parallax error while measuring distances",
      "Handle the lens carefully to avoid scratches",
      "Keep the candle flame steady",
    ],
    vivaQuestions: [
      {
        id: "viva-lab03-q1",
        type: "short_answer_2",
        question: "What happens when the object is placed at the focus of a convex lens?",
        correctAnswer: "When the object is placed at the focus (F), the refracted rays emerge parallel to the principal axis. The image is formed at infinity. It is real, inverted, and highly magnified.",
        explanation: "This principle is used in spotlights and searchlights.",
        marks: 2,
        difficulty: "easy",
        bloomsLevel: "understand",
        chapterId: "c10-sci-ch4",
        topicId: "c10-sci-ch4-t2",
      },
    ],
  },
];

export function getLabExperimentsForChapter(chapterId: string): LabExperiment[] {
  return CBSE_LAB_EXPERIMENTS.filter((lab) => lab.chapterId === chapterId);
}

export function getLabExperimentsForClass(
  subjectId: string,
  classLevel: ClassLevel
): LabExperiment[] {
  return CBSE_LAB_EXPERIMENTS.filter(
    (lab) => lab.subjectId === subjectId && lab.classLevel === classLevel
  );
}
