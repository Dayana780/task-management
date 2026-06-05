# TaskFlow — Task Management App

A responsive Kanban-style task management app built with React. Create boards, organize tasks with drag & drop, filter by priority/tags, and track activity history.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)

## Features

- **Boards** — Create and manage multiple task boards
- **Kanban columns** — To Do, In Progress, Done
- **Drag & drop** — Move tasks between columns with `@dnd-kit`
- **Filters** — Search, priority, status, tags, and due date
- **Comments** — Add comments on each task
- **Activity log** — Track create, update, delete, and comment events
- **User profile** — View stats and edit display name
- **Responsive UI** — Mobile sidebar, adaptive grids, and touch-friendly layout

## Tech Stack

| Category | Tools |
|----------|-------|
| Frontend | React 19, React Router, Vite |
| Styling | Tailwind CSS, Lucide Icons |
| Forms | React Hook Form |
| Drag & Drop | @dnd-kit |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Dates | Day.js |
| Mock API | JSON Server |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/task-management.git
cd task-management

# Install dependencies
npm install
```

### Run locally

You need **two terminals** — one for the mock API and one for the frontend.

```bash
# Terminal 1 — mock backend (port 3001)
npm run server

# Terminal 2 — frontend (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo login

| Field | Value |
|-------|-------|
| Email | `test@gmail.com` |
| Password | `123456` |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run server` | Start JSON Server mock API |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── features/     # TaskCard, TaskColumn, ActivityLog, CommentSection
│   ├── layout/       # Layout, Sidebar, Header, ProtectedRoute
│   └── ui/           # Button, Modal, AddTaskModal
├── pages/            # Login, Dashboard, BoardDetail, Profile, Activity
├── services/         # API calls (boards, tasks)
├── App.jsx           # Routes
└── main.jsx          # Entry point
```

## Screenshots

> Add screenshots here before publishing to GitHub.

<!-- Example:
![Dashboard](./screenshots/dashboard.png)
![Board](./screenshots/board.png)
-->

## Notes

- Authentication is simulated with `localStorage` (demo only).
- Data is stored in `db.json` and served by JSON Server.
- API base URL: `http://localhost:3001`

## License

This project is open source and available for portfolio use.
