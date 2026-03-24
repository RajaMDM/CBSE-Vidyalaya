# CBSE Vidyalaya (विद्यालय)

### AI-Powered Interactive Classroom for CBSE Curriculum

> **Conceived & Built by [RajaMDM](https://github.com/RajaMDM)** — An AI enthusiast and technologist exploring the intersection of artificial intelligence and Indian education. This project demonstrates the power of AI-driven curriculum design, multi-agent orchestration, and personalized learning at scale.

> *Inspired by [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) by Tsinghua University*

---

## What is CBSE Vidyalaya?

CBSE Vidyalaya transforms any CBSE chapter into an **immersive, multi-agent interactive classroom** powered by AI. It's purpose-built for the Indian education system — NCERT-aligned, bilingual (Hindi + English), and tuned for board exam success.

**One click. Full classroom. AI teachers. Board exam ready.**

### Key Features

| Feature | Description |
|---------|-------------|
| **AI Interactive Classroom** | Multi-agent teaching with subject-expert AI teachers (Dr. Sharma for Science, Mrs. Iyer for Math, etc.) |
| **NCERT-Aligned Curriculum** | Complete Classes 1-12 syllabus with chapter-wise content, topics, and weightage |
| **Board Exam Preparation** | CBSE-pattern sample papers (Section A-E), previous year questions, marking schemes |
| **Virtual Laboratory** | Interactive science experiments with apparatus, procedure, observations & viva |
| **Bilingual Support** | Full Hindi (हिन्दी) + English interface and content generation |
| **AI Assessment Engine** | Auto-generated papers with AI grading following CBSE marking scheme |
| **Doubt Resolution** | 24/7 AI tutor (Guru Bot) for instant, patient doubt clearing |
| **CBSE Grading System** | A1-E2 grading with grade points, strengths/weakness analysis |

### AI Teaching Agents

| Agent | Role | Specialty |
|-------|------|-----------|
| Dr. Sharma | Science Teacher | Experiments, real-world applications |
| Mrs. Iyer | Math Teacher | Step-by-step problem solving |
| Ms. Kapoor | English Teacher | Literature, creative expression |
| Pandit Ji | Hindi Teacher | काव्य (Poetry) & कहानियाँ (Stories) |
| Mr. Khan | Social Science | History, Geography, Civics |
| Prof. Menon | Physics | Conceptual clarity, numericals |
| Dr. Patel | Chemistry | Reactions, lab demonstrations |
| Dr. Reddy | Biology | Life sciences, diagrams |
| Coach Verma | Exam Coach | Board exam strategy & tips |
| Priya | Peer Student | Asks relatable questions |
| Guru Bot | Doubt Resolver | 24/7 patient explanations |

---

## Architecture

Built on a modular architecture inspired by OpenMAIC:

```
┌─────────────────────────────────────────────┐
│              CBSE Vidyalaya                  │
├─────────────────────────────────────────────┤
│  Next.js App (Pages + API Routes)           │
├──────────┬──────────┬──────────┬────────────┤
│ Classroom│Assessment│Curriculum│  Chat/     │
│ Engine   │ Engine   │ Browser  │  Doubts    │
├──────────┴──────────┴──────────┴────────────┤
│           Core Library (lib/)               │
├──────┬──────────┬───────────┬───────────────┤
│  AI  │Generation│Orchestr.  │  Assessment   │
│Layer │Pipeline  │(Agents)   │  (Grading)    │
├──────┴──────────┴───────────┴───────────────┤
│  Curriculum Data (NCERT-aligned, Ch 1-12)   │
├─────────────────────────────────────────────┤
│  Storage │ i18n (EN/HI) │ Utils            │
└─────────────────────────────────────────────┘
```

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **AI**: Multi-provider (OpenAI, Anthropic, Google) via unified LLM layer
- **Orchestration**: Multi-agent classroom with role-based AI personas
- **Assessment**: CBSE-pattern paper generation with AI grading
- **Deployment**: Vercel (recommended), Docker, self-hosted

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/RajaMDM/DataManagement.git
cd DataManagement
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Add your API keys (at minimum, one LLM provider)
```

### 3. Run Development Server

```bash
pnpm dev
# Open http://localhost:3000
```

### 4. Deploy

**Vercel (Recommended — Free Tier)**
```bash
npx vercel
# Follow prompts, add environment variables in Vercel dashboard
```

**Docker**
```bash
docker compose up -d
# Available at http://localhost:3000
```

---

## Deployment Guide

### Best Options for Public Hosting (Low/No Cost)

| Platform | Cost | Best For | Setup |
|----------|------|----------|-------|
| **Vercel** | Free (Hobby) | Best for Next.js, auto-deploy from GitHub | `npx vercel` |
| **Railway** | $5/mo credit | Full Docker support, easy | Connect GitHub repo |
| **Render** | Free tier | Docker + static sites | Connect GitHub repo |
| **Fly.io** | Free tier | Docker, edge deployment | `fly launch` |
| **Cloudflare Pages** | Free | Static + edge functions | Limited SSR support |

**Recommended**: **Vercel Free Tier** — zero config for Next.js, automatic HTTPS, preview deployments, Mumbai (BOM1) region for low latency in India.

---

## CBSE Coverage

### Subjects (20+ subjects)
English, Hindi, Sanskrit, Mathematics, Science, Physics, Chemistry, Biology, Social Science, History, Geography, Political Science, Economics, Accountancy, Business Studies, Computer Science, Informatics Practices, Physical Education, Environmental Studies

### Class Levels
- **Primary (1-5)**: English, Hindi, Mathematics, EVS
- **Middle (6-8)**: + Science, Social Science, Sanskrit
- **Secondary (9-10)**: Full CBSE curriculum with board exam prep
- **Senior Secondary (11-12)**: Stream-wise (Science/Commerce/Humanities)

### Assessment Patterns
- Section A: MCQ & Objective (1 mark each)
- Section B: Very Short Answer (2 marks)
- Section C: Short Answer (3 marks)
- Section D: Long Answer (5 marks)
- Section E: Case-Based Questions (4 marks)

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── classroom/         # Interactive classroom
│   │   ├── new/          # Create new classroom
│   │   └── [id]/         # Classroom player
│   ├── curriculum/        # Curriculum explorer
│   ├── assessment/        # Assessment center
│   └── api/              # API routes
│       ├── classroom/    # Classroom CRUD + generation
│       ├── assessment/   # Paper generation
│       ├── chat/         # AI doubt resolution
│       ├── curriculum/   # Curriculum data
│       └── health/       # Health check
├── lib/                   # Core library
│   ├── types.ts          # TypeScript definitions
│   ├── ai/               # Multi-provider LLM layer
│   ├── curriculum/       # CBSE subjects, chapters, labs
│   ├── generation/       # Content generation pipeline
│   ├── orchestration/    # Multi-agent classroom engine
│   ├── assessment/       # Question gen + AI grading
│   ├── storage/          # Storage provider pattern
│   ├── i18n/             # Hindi + English translations
│   └── utils.ts          # Utility functions
├── Dockerfile            # Production Docker image
├── docker-compose.yml    # Docker Compose config
├── vercel.json           # Vercel deployment config
└── .env.example          # Environment template
```

---

## About the Creator

**RajaMDM** is an AI-first technologist who believes in democratizing education through artificial intelligence. This project showcases:

- **AI Architecture Design** — Multi-agent orchestration for interactive learning
- **Full-Stack AI Development** — From LLM integration to production deployment
- **Domain-Specific AI** — Customizing AI systems for Indian education (CBSE/NCERT)
- **Bilingual AI Systems** — Hindi + English content generation and interface

> *"The future of education is personalized, AI-driven, and accessible to every student in India."* — RajaMDM

---

## Contributing

Contributions are welcome! Areas to help:
- Add more chapter data for remaining classes/subjects
- Improve Hindi translations
- Add more lab experiments
- Create interactive HTML simulations
- Add competitive exam (JEE/NEET) content

---

## License

MIT License. Built with passion for Indian education.

**Inspired by [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC)** — Open Multi-Agent Interactive Classroom by Tsinghua University.
