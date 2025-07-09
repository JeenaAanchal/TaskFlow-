# Real-Time Collaborative Taskflow Board

A real-time, collaborative task management web application built using **React**, **TypeScript**, and **Vite**. The app allows multiple users to manage tasks simultaneously with intelligent assignment and conflict-handling mechanisms.


## 🚀 Project Overview

Taskflow is a team-centric productivity board that enables real-time updates to shared tasks. Key features include:
- Drag-and-drop task management
- Smart user assignment
- Conflict resolution for simultaneous task edits
- Responsive and minimal design


## 🛠 Tech Stack

Layer      Technology                                                 
-----------------------
Frontend     React 18 + TypeScript                                      
Tooling      Vite, ESLint 
Styling      Tailwind CSS (or add here if used) 
Icons        lucide-react 
Linting      ESLint with TypeScript, React Hooks, React Refresh plugins 
Build        Vite 
State Mgmt   React hooks or context (if applicable) 



🔀 Smart Assign
When a new task is created:

The system evaluates user workload.

Assigns the task to the user with the least number of open tasks.




⚔️ Conflict Handling
When two users try to update the same task:

Each task has a version timestamp.

The system compares client and server versions.

If a conflict is found, the user is prompted to merge or overwrite.




📦 Prerequisites
Node.js v18+

npm

(Optional: MongoDB / PostgreSQL / other backend service)

🔧 Frontend Setup
Navigate to the frontend folder:
cd taskflow/project

Install dependencies:

npm install

Start the development server:
npm run dev
Visit: http://localhost:5173

🔧 Backend Setup (if applicable)
Navigate to backend folder:
cd taskflow/backend

Install dependencies:
npm install
Configure environment variables:

Create a .env file and set DB/API keys as needed.

Start the server:

npm start
Backend should run on: http://localhost:5000 (or your configured port)
