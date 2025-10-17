## Course Study Tracker

Track your study progress across courses, plan sessions for the week, and optionally summarize notes using AI.

Built with Vite + React + Tailwind CSS and Supabase for auth and data.

## Tech Stack
- React 19, React Router
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/postcss` + PostCSS + Autoprefixer)
- Supabase JS v2 (auth + database)

## Features
- Authentication via Supabase OAuth (Google)
- Dashboard overview with weekly planned vs. actual time and course progress bars
- Courses
	- Create/delete courses with provider, URL, and goal hours
	- Course detail page with optional manual progress override
	- Lessons list per course with add/toggle done and link support
- Planner
	- Plan sessions for the week (course, date, planned minutes)
	- Mark sessions done and record actual minutes
- AI (optional)
	- Paste study notes and generate a short summary (mocked locally)
	- When deployed with an API key, use `api/ai/summarize` to call OpenAI

## Prerequisites
- Node.js 18 or newer
- A Supabase project (for full functionality)

## Setup
1) Install dependencies
- npm install

2) Configure environment variables
- Copy `.env.example` to `.env.local` and fill in:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
	- Optional `OPENAI_API_KEY` for AI summarize route when deployed

Note: Without Supabase envs, the app runs with a safe local stub so you can view the UI, but data will be empty and protected pages will redirect to `/login`.

3) Start dev server
- npm run dev
- Open the printed URL (http://localhost:5173 by default)

## Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview the build locally
- `npm run lint` — Run ESLint

## Supabase schema (suggested)

Tables and columns used by the UI:

1) courses
- id (uuid or bigint) primary key
- title text
- provider text
- course_url text
- goal_hours integer
- manual_progress integer (0–100, nullable)
- created_at timestamp default now()

2) lessons
- id primary key
- course_id references courses.id
- title text
- lesson_url text
- est_minutes integer
- done boolean default false
- created_at timestamp default now()

3) sessions
- id primary key
- course_id references courses.id
- date date
- planned_minutes integer
- done boolean default false
- actual_minutes integer (nullable)
- created_at timestamp default now()

4) ai_notes (optional)
- id primary key
- note_type text (e.g., 'summary')
- source_text text
- result_json jsonb
- created_at timestamp default now()

Make sure row-level security (RLS) policies allow read/write for authenticated users as needed, or implement policies per your requirements.

## AI Summarization
- Local dev uses a mock response in `src/components/AI/AIStudyHelper.jsx`.
- For real summaries in deployment:
	- Provide `OPENAI_API_KEY` to your hosting provider (do not expose it in client-side `.env.local`).
	- Deploy the serverless function `api/ai/summarize.js` (Vercel-style handler).
	- Update the client to call `/api/ai/summarize` (uncomment in `AIStudyHelper.jsx`).

## Development Notes
- Tailwind v4 is enabled via `postcss.config.js` using `@tailwindcss/postcss`.
- Global styles live in `src/index.css`.
- Router entry is `src/main.jsx` with routes in `src/App.jsx` and `src/pages/*`.
- Supabase client in `src/lib/supabase.js` includes a stub fallback for missing env vars.

## Troubleshooting
- Vite cannot find CLI (ERR_MODULE_NOT_FOUND):
	- Delete `node_modules/vite`, then `npm install`.
	- Ensure `node_modules/vite/dist/node/cli.js` exists.
- Tailwind PostCSS plugin error:
	- Install `@tailwindcss/postcss` and update `postcss.config.js` to `plugins: [tailwind(), autoprefixer()]`.
- Redirect to /login repeatedly:
	- Ensure Supabase env variables are set and restart dev server.
- OAuth redirect after login:
	- In Supabase dashboard, add your dev URL (http://localhost:5173) to Redirect URLs and enable Google provider.

## Deployment
- Any static hosting that supports Vite build output plus serverless for AI, e.g., Vercel:
	- Set environment variables in the platform.
	- Deploy the `api/ai/summarize.js` function.
	- Build with `npm run build`.

## License
MIT

