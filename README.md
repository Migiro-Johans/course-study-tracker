# 📚 Course & Study Tracker

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-capstone--project-yellow)

A provider‑agnostic course and study tracker built as a **bootcamp capstone project**. This web app allows students to organize, plan, and track their learning across platforms like **Udemy**, **Coursera**, **ALX**, **YouTube**, and others.

> **Author:** Nyogora Migiro  
> **Start Date:** September 22, 2025  
> **Duration:** 4 Weeks

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [API & Database](#api--database)
- [React Components](#react-components)
- [Project Roadmap](#project-roadmap)
- [Validation Rules](#validation-rules)
- [Success Criteria](#success-criteria)
- [Stretch Goals](#stretch-goals)
- [License](#license)

---

## 📘 Introduction

This project helps users:

- Add and track online courses and lessons
- Plan and complete weekly study sessions
- View visual progress of learning hours and completion
- Use AI to summarize study notes, generate flashcards, and quizzes

---

## ✨ Features

- 🔐 Secure login using **Google Auth** via Supabase
- 📚 Add courses with provider info and goal hours
- 🎓 Add lessons with estimated time and URLs
- 📅 Plan weekly study sessions
- ✅ Mark sessions and lessons as complete
- 📈 Track progress with progress bars and weekly hour totals
- 🤖 AI Study Helper (powered by OpenAI) for:
  - Summarizing notes
  - Generating MCQs
  - Creating flashcards
- 💾 Persistent data via Supabase; minimal localStorage used for UI

---

## 🛠 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS *(optional)*
- **Backend**: Supabase (Auth + Postgres)
- **AI Integration**: OpenAI API
- **Deployment**: Vercel (suggested)

---

## 🖼️ Screenshots

> Add screenshots of your UI here (from `assets/` folder)

| Dashboard View | Planner View |
|----------------|--------------|
| ![Dashboard](./assets/dashboard.png) | ![Planner](./assets/planner.png) |

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/course-study-tracker.git
cd course-study-tracker
Install dependencies:

bash
Copy code
npm install
Create a .env file based on the .env.example provided.

Start the development server:

bash
Copy code
npm run dev
🚀 Usage
Log in using your Google/Gmail account

Add your courses and lessons

Plan study sessions for the week

Use the AI Study Helper to turn notes into quizzes or flashcards

Mark sessions/lessons as completed and track progress visually

⚙️ Configuration
Create a .env file with the following:

env
Copy code
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_api_key
See .env.example for reference.

📁 Folder Structure
graphql
Copy code
src/
├── components/       # Reusable UI components
├── pages/            # Pages: Dashboard, Courses, Planner
├── api/              # API routes for OpenAI helper
├── utils/            # Helper functions
├── supabase/         # Supabase client config
├── App.jsx           # Main layout and routing
└── main.jsx          # Vite entry point
🗃 API & Database
Auth
Provider: Supabase Auth (Google)

Redirect URLs:

Production: https://your-app.vercel.app

Development: http://localhost:5173

Tables
profiles, courses, lessons, sessions, ai_notes

RLS Policies
Ensures user data isolation:

sql
Copy code
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid())
External API
/api/ai/summarize

/api/ai/quiz

/api/ai/flashcards

🧩 React Components
Auth: LoginWithGoogle, ProtectedRoute

Shell: AppShell with tabs and user avatar

Courses: CourseList, CourseForm, CourseDetail, LessonList

Planner: SessionForm, SessionList

Dashboard: WeeklySummary, CourseProgressList

AI Helper: AIStudyHelper

UI Helpers: Modal, Toast

📅 Project Roadmap
Week	Deliverables
1	Auth setup, Supabase DB & RLS, basic shell layout
2	CRUD for Courses & Lessons
3	Planner & progress computation
4	AI helper, polish, README, and styling

✅ Validation Rules
Course title: Required

plannedMin, actualMin: Must be positive integers

Dates: Use YYYY-MM-DD format (e.g., 2025-10-01)

🎯 Success Criteria
To pass this capstone:

✅ Add at least 1 course with 5 lessons

✅ Use the AI helper to summarize notes

✅ Generate 5 MCQs and flashcards and save them

✅ Plan 3+ sessions, complete 2+, and persist data after reload

🚀 Stretch Goals
If MVP is stable, consider:

🔍 Sort/filter sessions (Today, This Week, Done)

📤 Export sessions to CSV

🔄 Move more UI state from localStorage → Supabase

📝 License
This project is licensed under the MIT License.
See LICENSE for more information.

yaml
Copy code

---

## 📦 Accompanying Files You Should Add

1. **`.env.example`**
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
OPENAI_API_KEY=