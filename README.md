# TaskFlow — Task Management App

A modern, responsive Kanban-style task management application built with **React**.

TaskFlow allows users to create and manage boards, organize tasks with drag & drop, filter and search tasks, add comments, and track activity history through a clean and responsive interface.

## ✨ Features

- **Boards** — Create, update, and delete multiple task boards
- **Kanban Workflow** — Organize tasks across To Do, In Progress, and Done columns
- **Drag & Drop** — Move tasks between columns using `@dnd-kit`
- **Task Management** — Create, update, and delete tasks
- **Advanced Filtering** — Search and filter by priority, status, tags, and due date
- **Task Comments** — Add comments to individual tasks
- **Activity History** — Track task creation, updates, status changes, deletions, and comments
- **User Profile** — View task statistics and update the display name
- **Authentication Demo** — Simulated login using `localStorage`
- **Responsive Design** — Optimized for desktop, tablet, and mobile screens
- **Toast Notifications** — User-friendly feedback for actions and errors

## 🛠️ Tech Stack

| Category         | Technologies                 |
| ---------------- | ---------------------------- |
| Frontend         | React 19, React Router, Vite |
| Styling          | Tailwind CSS 3               |
| Icons            | Lucide React                 |
| Forms            | React Hook Form              |
| Drag & Drop      | @dnd-kit                     |
| HTTP Client      | Axios                        |
| State Management | Zustand                      |
| Validation       | Zod                          |
| Notifications    | React Hot Toast, Sonner      |
| Date Handling    | Day.js, date-fns             |
| Mock Backend     | JSON Server                  |

## 📂 Project Structure

```text
src/
├── components/
│   ├── features/
│   │   ├── TaskCard
│   │   ├── TaskColumn
│   │   ├── ActivityLog
│   │   └── CommentSection
│   │
│   ├── layout/
│   │   ├── Layout
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── ProtectedRoute
│   │
│   └── ui/
│       ├── Button
│       ├── Modal
│       └── AddTaskModal
│
├── pages/
│   ├── Login
│   ├── Dashboard
│   ├── BoardDetail
│   ├── Profile
│   └── Activity
│
├── services/
│   ├── api
│   ├── boards
│   └── tasks
│
├── App.jsx
└── main.jsx

db.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Dayana780/task-management.git
```

Navigate to the project:

```bash
cd task-management
```

Install dependencies:

```bash
npm install
```

### Run Locally

TaskFlow currently uses **JSON Server** as a mock backend, so you need two terminals.

**Terminal 1 — Start the mock API:**

```bash
npm run server
```

The API will run on:

```text
http://localhost:3001
```

**Terminal 2 — Start the React application:**

```bash
npm run dev
```

The application will run on:

```text
http://localhost:5173
```

Open the local URL in your browser.

## 🔐 Demo Login

TaskFlow currently uses simulated authentication for demonstration purposes.

| Field    | Value            |
| -------- | ---------------- |
| Email    | `test@gmail.com` |
| Password | `123456`         |

> This authentication system is intended for demonstration purposes only and is not a production authentication system.

## 📜 Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite development server |
| `npm run server`  | Start the JSON Server mock API    |
| `npm run build`   | Create a production build         |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

## 🖼️ Screenshots

Screenshots of the main application interface will be added here.

Recommended screenshots:

- Dashboard
- Board detail / Kanban view
- Task modal
- Activity history
- Profile

Example:

```md
![Dashboard](./screenshots/dashboard.png)

![Board](./screenshots/board.png)

![Task Modal](./screenshots/task-modal.png)
```

## 🔌 API & Data

TaskFlow currently uses **JSON Server** as a lightweight mock REST API.

Application data is stored in:

```text
db.json
```

The frontend communicates with the API through Axios.

Local API base URL:

```text
http://localhost:3001
```

Available resources include:

```text
/boards
/tasks
/activities
```

## 🔒 Authentication

Authentication is currently simulated on the frontend using `localStorage`.

After successful demo login, a temporary token is stored locally and the user is redirected to the dashboard.

This implementation is intentionally lightweight because the project is designed as a **frontend portfolio project** rather than a production authentication system.

## 📱 Responsive Design

The interface is designed to work across different screen sizes, including:

- Desktop
- Laptop
- Tablet
- Mobile

The application includes an adaptive sidebar, responsive task layouts, and touch-friendly interactions.

## 🎯 Project Goals

This project was built to demonstrate practical frontend development skills including:

- Building reusable React components
- Managing application state
- Working with REST APIs
- Implementing drag & drop interactions
- Form handling and validation
- Responsive UI development
- Client-side routing
- Authentication flow concepts
- CRUD operations
- Creating a structured and maintainable React application

## 📌 Current Status

**Frontend:** Complete
**Mock API:** JSON Server
**Authentication:** Demo / simulated
**Production Backend:** Not implemented

The current version is intended as a portfolio demonstration project.

## 📄 License

This project is open source and available for portfolio and educational use.

---

Built with ❤️ using **React, Vite, and Tailwind CSS**.

**Dayana Ehsanian**
