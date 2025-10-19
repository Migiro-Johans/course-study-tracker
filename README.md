#  Course & Study Tracker

A Study Tracker web app that helps learners **plan, organize, and track** their study courses.

Built with **React + Vite + Tailwind CSS**, this app connects to the **OpenAI Responses API** to generate structured lesson plans, weekly study schedules, summaries, and flash questions for any course.

---

##  Features

###  User Flow
1. **Landing Page** – Quick intro to the app and call to action to get started.
2. **Join Page** – User joins the platform (no authentication required for now).
3. **Dashboard** – Add a course (title + provider) and view your list of courses.
4. **AI-Generated Plan** – Upon adding a course, the app uses OpenAI to:
   - Summarize the course  
   - Create structured lessons  
   - Generate flash questions  
   - Build a weekly learning plan
5. **Planner Page** – Displays your week-by-week sessions in a table format, with options to mark sessions as:
   - ✅ Completed  
   - 🕓 In Progress  
   - ⏳ Not Started
6. **Notes Page** – Displays AI summaries and flash questions with an interactive answer-and-reveal flow.
7. **Profile Page** – Displays:
   - User name and avatar upload
   - Progress summary (completed / in-progress / not started)
   - Backlog of missed sessions with “Reschedule to current or next week” options

---

## 🧠 Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) | Modern, fast development stack |
| **Routing** | [React Router v6](https://reactrouter.com/) | Handles all page navigation |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first responsive CSS |
| **AI Integration** | [OpenAI Responses API](https://platform.openai.com/docs/api-reference/responses) | Generates plans, summaries, flashcards |
| **State Management** | React Hooks (`useState`, `useEffect`, `useMemo`) | Lightweight local state |
| **Persistence** | `localStorage` | Stores user courses, progress, and profile |
| **Build Tool** | Vite | Fast hot-reload, optimized builds |
| **Deployment** | Vercel / Netlify / Render | Static frontend hosting |

---

## 🧩 Folder Structure

course-study-tracker/
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── index.html
└── src/
├── main.jsx # App entry, routes setup
├── App.jsx # Layout + Navigation + Outlet
├── index.css # Tailwind base styles
├── lib/
│ └── openai.js # OpenAI API helper
├── ui/
│ ├── AddCourseForm.jsx # Add new course
│ ├── CourseCard.jsx # Course display + plan generation
│ ├── Button.jsx
│ └── Input.jsx
└── pages/
├── Landing.jsx
├── Join.jsx
├── Dashboard.jsx
├── Planner.jsx
├── Notes.jsx
└── Profile.jsx # Avatar, progress, backlog


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/course-study-tracker.git
cd course-study-tracker

2️⃣ Install dependencies
npm install

3️⃣ Environment variable

Create a .env file at the root with your OpenAI key:

VITE_OPENAI_API_KEY=sk-<your-key-here>

4️⃣ Run the dev server
npm run dev


Visit: http://localhost:5173

💡 Usage Guide

Open the app and click Join.

On the Dashboard, click Add Course → enter course name and provider.

Wait a few seconds as the AI generates your plan.

View and manage your plan under Planner and Notes.

Visit Profile to:

Update your name and avatar.

View total completed/in-progress sessions.

See backlog of missed sessions and reschedule them.

🧰 Tech Notes

The OpenAI integration is handled via src/lib/openai.js:

Uses the responses endpoint.

Automatically formats text as JSON when needed.

All user data (courses, profile) is saved locally via localStorage.

The app is frontend-only and does not require a backend.

Responsive design using Tailwind for mobile and desktop.

🔐 Environment Variables
Variable	Description
VITE_OPENAI_API_KEY	Your OpenAI API key for generating course data
🛠️ Scripts
Command	Description
npm run dev	Start local dev server
npm run build	Build for production
npm run preview	Preview production build locally
🌍 Deployment

Easily deploy to:

Vercel
 – best for Vite/React

Netlify
 – drag-and-drop deployment

Render
 or any static host

Make sure to set your environment variable:

VITE_OPENAI_API_KEY = sk-************

📈 Roadmap

 Add progress charts (per course & total)

 Export planner to PDF

 “Reschedule All Backlog” action

 User authentication (Supabase / Firebase)

 Team or group learning mode

 Cloud sync for persistent progress

🤝 Contributing

Contributions are welcome!

Fork the project

Create a feature branch (git checkout -b feature/new-feature)

Commit your changes (git commit -m 'Add new feature')

Push to your branch (git push origin feature/new-feature)

Create a Pull Request

🧑‍💻 Author

Nyogora Migiro (Migiro Johans)
🌍 LinkedIn : https://www.linkedin.com/in/migiro-johans/
 Focus: Information Technology, AI, Software Development & Systems Administration

🪪 License

MIT License © 2025 Nyogora Migiro
Free to use, modify, and distribute with attribution.

Enjoy building smarter study habits with AI 📚⚡
