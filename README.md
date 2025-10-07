# TaskFlow App

TaskFlow is a simple React + Vite application that demonstrates a task lifecycle managed by XState v5.

## Features

- Task lifecycle with XState v5: Created → In Progress → Review → Completed → Archived
- Local persistence using `localStorage`
- CRUD: add, list, delete
- Transition actions per state and a compact transition history per task
- Tailwind-based styling

## Tech Stack

- React 19
- React Router 7
- Vite 7
- XState v5 + @xstate/react
- Tailwind CSS 3

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the app

```bash
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── components/
│   └── Layout.jsx          # App shell
├── pages/
│   └── TaskFlow.jsx        # TaskFlow page
├── taskflow/
│   ├── taskMachine.js      # XState machine
│   ├── mockDB.js           # localStorage persistence helpers
│   └── components/
│       ├── AddTaskForm.jsx
│       ├── TaskCard.jsx
│       └── TaskList.jsx
├── App.jsx                 # Routes (TaskFlow only)
└── main.jsx                # App bootstrap
```

## Notes

- Tasks are stored under the key `taskflow.tasks.v1` in `localStorage`.
- This repo has been simplified to only include TaskFlow and no external API dependencies.