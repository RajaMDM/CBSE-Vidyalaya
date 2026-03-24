// ============================================
// Bilingual Support - Hindi & English
// ============================================

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // App
    "app.name": "CBSE Vidyalaya",
    "app.tagline": "AI-Powered Interactive Classroom for CBSE",
    "app.description": "Get an immersive, multi-agent learning experience aligned with CBSE curriculum",

    // Navigation
    "nav.home": "Home",
    "nav.classrooms": "My Classrooms",
    "nav.assessments": "Assessments",
    "nav.curriculum": "Curriculum",
    "nav.settings": "Settings",
    "nav.lab": "Virtual Lab",

    // Home
    "home.welcome": "Welcome to CBSE Vidyalaya",
    "home.subtitle": "Your AI-powered CBSE classroom",
    "home.create_classroom": "Create New Classroom",
    "home.quick_start": "Quick Start",
    "home.select_class": "Select Your Class",
    "home.select_subject": "Select Subject",
    "home.select_chapter": "Select Chapter",
    "home.start_learning": "Start Learning",
    "home.board_exam_prep": "Board Exam Preparation",
    "home.practice_papers": "Practice Papers",
    "home.ncert_solutions": "NCERT Solutions",
    "home.virtual_lab": "Virtual Lab",

    // Classroom
    "classroom.title": "Classroom",
    "classroom.playing": "Playing",
    "classroom.paused": "Paused",
    "classroom.scene": "Scene",
    "classroom.of": "of",
    "classroom.ask_doubt": "Ask a Doubt",
    "classroom.type_message": "Type your question...",
    "classroom.send": "Send",
    "classroom.whiteboard": "Whiteboard",
    "classroom.chat": "Chat",
    "classroom.notes": "Notes",
    "classroom.quiz_time": "Quiz Time!",
    "classroom.submit_answer": "Submit Answer",
    "classroom.next_question": "Next Question",
    "classroom.show_explanation": "Show Explanation",
    "classroom.score": "Score",

    // Assessment
    "assessment.title": "Assessment",
    "assessment.sample_paper": "Sample Paper",
    "assessment.unit_test": "Unit Test",
    "assessment.half_yearly": "Half Yearly",
    "assessment.annual": "Annual Exam",
    "assessment.pre_board": "Pre-Board",
    "assessment.generate": "Generate Paper",
    "assessment.marks": "Marks",
    "assessment.time": "Time",
    "assessment.minutes": "minutes",
    "assessment.section": "Section",
    "assessment.question": "Question",
    "assessment.your_answer": "Your Answer",
    "assessment.submit": "Submit Paper",
    "assessment.result": "Result",
    "assessment.grade": "Grade",
    "assessment.percentage": "Percentage",
    "assessment.total_marks": "Total Marks",
    "assessment.strengths": "Strengths",
    "assessment.improvements": "Areas for Improvement",
    "assessment.recommendations": "Recommendations",

    // Curriculum
    "curriculum.class": "Class",
    "curriculum.subject": "Subject",
    "curriculum.chapter": "Chapter",
    "curriculum.topics": "Topics",
    "curriculum.periods": "Periods",
    "curriculum.weightage": "Weightage",
    "curriculum.learning_objectives": "Learning Objectives",

    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.difficulty": "Difficulty Level",
    "settings.foundation": "Foundation",
    "settings.standard": "Standard",
    "settings.advanced": "Advanced",
    "settings.board_exam_focus": "Board Exam Focus",
    "settings.include_ncert": "Include NCERT Examples",
    "settings.include_pyq": "Include Previous Year Questions",
    "settings.lab_simulation": "Lab Simulation",
    "settings.ai_provider": "AI Provider",
    "settings.model": "Model",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.retry": "Try Again",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.close": "Close",
    "common.search": "Search",
  },

  hi: {
    // App
    "app.name": "CBSE विद्यालय",
    "app.tagline": "CBSE के लिए AI-संचालित इंटरैक्टिव कक्षा",
    "app.description": "CBSE पाठ्यक्रम के अनुसार एक गहन, बहु-एजेंट शिक्षण अनुभव प्राप्त करें",

    // Navigation
    "nav.home": "मुख्य पृष्ठ",
    "nav.classrooms": "मेरी कक्षाएँ",
    "nav.assessments": "मूल्यांकन",
    "nav.curriculum": "पाठ्यक्रम",
    "nav.settings": "सेटिंग्स",
    "nav.lab": "वर्चुअल प्रयोगशाला",

    // Home
    "home.welcome": "CBSE विद्यालय में आपका स्वागत है",
    "home.subtitle": "आपकी AI-संचालित CBSE कक्षा",
    "home.create_classroom": "नई कक्षा बनाएँ",
    "home.quick_start": "त्वरित प्रारंभ",
    "home.select_class": "अपनी कक्षा चुनें",
    "home.select_subject": "विषय चुनें",
    "home.select_chapter": "अध्याय चुनें",
    "home.start_learning": "पढ़ना शुरू करें",
    "home.board_exam_prep": "बोर्ड परीक्षा की तैयारी",
    "home.practice_papers": "अभ्यास प्रश्नपत्र",
    "home.ncert_solutions": "NCERT समाधान",
    "home.virtual_lab": "वर्चुअल प्रयोगशाला",

    // Classroom
    "classroom.title": "कक्षा",
    "classroom.playing": "चल रहा है",
    "classroom.paused": "रुका हुआ",
    "classroom.scene": "दृश्य",
    "classroom.of": "का",
    "classroom.ask_doubt": "संदेह पूछें",
    "classroom.type_message": "अपना प्रश्न लिखें...",
    "classroom.send": "भेजें",
    "classroom.whiteboard": "श्वेतपट",
    "classroom.chat": "चैट",
    "classroom.notes": "नोट्स",
    "classroom.quiz_time": "प्रश्नोत्तरी का समय!",
    "classroom.submit_answer": "उत्तर जमा करें",
    "classroom.next_question": "अगला प्रश्न",
    "classroom.show_explanation": "व्याख्या दिखाएँ",
    "classroom.score": "अंक",

    // Assessment
    "assessment.title": "मूल्यांकन",
    "assessment.sample_paper": "नमूना प्रश्नपत्र",
    "assessment.unit_test": "इकाई परीक्षा",
    "assessment.half_yearly": "अर्धवार्षिक",
    "assessment.annual": "वार्षिक परीक्षा",
    "assessment.pre_board": "प्री-बोर्ड",
    "assessment.generate": "प्रश्नपत्र बनाएँ",
    "assessment.marks": "अंक",
    "assessment.time": "समय",
    "assessment.minutes": "मिनट",
    "assessment.section": "खंड",
    "assessment.question": "प्रश्न",
    "assessment.your_answer": "आपका उत्तर",
    "assessment.submit": "प्रश्नपत्र जमा करें",
    "assessment.result": "परिणाम",
    "assessment.grade": "ग्रेड",
    "assessment.percentage": "प्रतिशत",
    "assessment.total_marks": "कुल अंक",
    "assessment.strengths": "मजबूत पक्ष",
    "assessment.improvements": "सुधार के क्षेत्र",
    "assessment.recommendations": "सिफारिशें",

    // Curriculum
    "curriculum.class": "कक्षा",
    "curriculum.subject": "विषय",
    "curriculum.chapter": "अध्याय",
    "curriculum.topics": "विषय",
    "curriculum.periods": "पीरियड",
    "curriculum.weightage": "भारांक",
    "curriculum.learning_objectives": "अधिगम उद्देश्य",

    // Settings
    "settings.title": "सेटिंग्स",
    "settings.language": "भाषा",
    "settings.difficulty": "कठिनाई स्तर",
    "settings.foundation": "आधारभूत",
    "settings.standard": "मानक",
    "settings.advanced": "उन्नत",
    "settings.board_exam_focus": "बोर्ड परीक्षा फोकस",
    "settings.include_ncert": "NCERT उदाहरण शामिल करें",
    "settings.include_pyq": "पिछले वर्ष के प्रश्न शामिल करें",
    "settings.lab_simulation": "प्रयोगशाला अनुकरण",
    "settings.ai_provider": "AI प्रदाता",
    "settings.model": "मॉडल",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हो गया",
    "common.retry": "पुनः प्रयास करें",
    "common.back": "वापस",
    "common.next": "आगे",
    "common.previous": "पीछे",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.delete": "हटाएँ",
    "common.edit": "संपादित करें",
    "common.close": "बंद करें",
    "common.search": "खोजें",
  },
} as const;

export type Language = keyof typeof translations;

export function t(key: TranslationKey, lang: Language = "en"): string {
  return translations[lang][key] || translations.en[key] || key;
}
