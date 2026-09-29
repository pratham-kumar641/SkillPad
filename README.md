# SkillPad – Software Engineering Simulation Platform

SkillPad is a full-stack educational and recruitment simulation platform built using the MERN stack (MongoDB, Express, React, Node.js). It connects **Students**, **Faculty**, and **Recruiters** in a unified platform to track engineering tasks, simulate agile sprints, submit software projects, perform faculty evaluations, and display verified portfolios to recruiters.

---

## 🔑 Demo Accounts (For Viva & Demonstration)

| Role | Email | Password |
|---|---|---|
| **Student** | `student@gmail.com` | `123456` |
| **Faculty** | `faculty@gmail.com` | `123456` |
| **Recruiter** | `recruiter@gmail.com` | `123456` |

---

## 🚀 Key Features

### 🎓 1. Student Portal
- **Dashboard**: High-level overview of completed tasks, current sprint progress, and average project scores.
- **Engineering Tasks**: Browse, filter by category (Frontend, Backend, Database, Testing, Debugging), and update task completion status.
- **Sprint Simulation**: View sprint goals, move task cards between *Todo*, *In Progress*, and *Completed*.
- **Code Runner & AI Review**: Execute code using Judge0 API and get automated AI feedback via Gemini AI.
- **Project Submission**: Submit GitHub repository links and live project URLs for faculty review.
- **Progress & Badges**: Track skill progress, task completion metrics, and earned achievement badges.
- **Leaderboard**: See student ranks based on verified project scores and task completion.

### 👨‍🏫 2. Faculty Portal
- **Dashboard**: High-level metrics on class performance, total students, and pending submissions.
- **Task Management**: Create, edit, view, and delete engineering tasks for students.
- **Project Evaluation**: Review submitted student projects, examine code repositories, assign scores (0-100), and write feedback.
- **Student Progress Tracking**: View enrolled students and monitor their overall performance.

### 🏢 3. Recruiter Portal (Read-Only Access)
- **Dashboard**: View top in-demand skills and overall talent pool statistics.
- **Student Portfolios**: View verified student profiles, skill badges, completed tasks, and evaluation scores.
- **Verified Projects**: Explore student GitHub projects that have been reviewed and scored by faculty.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcryptjs password hashing
- **Code Execution / AI**: Judge0 API & Gemini AI integration

---

## 💻 How to Run the Project

### 1. Start the Backend Server
```bash
cd backend
npm install
node seed.js    # Populates MongoDB Atlas with demo accounts & sample data
npm run dev     # Starts backend on http://localhost:5000
```

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev     # Starts frontend on http://localhost:5173
```

---

## 📡 API Endpoints

- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Tasks**: `/api/tasks` (GET, POST, PUT, DELETE, PATCH status)
- **Sprints**: `/api/sprints` (GET, POST, PUT, DELETE)
- **Projects**: `/api/projects` (GET, POST, PUT evaluation, DELETE)
- **Submissions**: `/api/submissions` (GET, POST, PUT)
- **Users**: `/api/users/students`, `/api/users/students/:id`
- **Code & AI**: `/api/code/run`, `/api/code/review`

---

## 📁 Project Structure

```text
SkillPad/
├── backend/
│   ├── config/          # MongoDB database connection
│   ├── controllers/     # Business logic & request handling
│   ├── middleware/      # JWT authentication middleware
│   ├── models/          # Mongoose schemas (User, Task, Sprint, Project, Submission)
│   ├── routes/          # Express route definitions
│   ├── seed.js          # Demo data seeding script
│   └── server.js        # Main Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components (Navbar, Sidebar, Cards, Modals)
    │   ├── context/     # AuthContext for state & token management
    │   ├── data/        # Fallback mock data
    │   ├── pages/       # Page components for Student, Faculty & Recruiter
    │   └── App.jsx      # Main router and app layout
```

---

## 🎓 Viva Explanation Guide

1. **How Auth Works**: The backend hashes passwords using `bcryptjs` and signs a JSON Web Token (JWT) with user ID & role upon login. The token is sent in the `Authorization` header (`Bearer <token>`) for protected requests.
2. **How Role-Based Access Control Works**: Routes on the frontend navigate users to `/${role.toLowerCase()}` dashboards, while backend middleware verifies JWT identity for protected endpoints.
3. **How MongoDB Relationships Work**: Models reference `User` and `Task` via Mongoose `ObjectId` (`ref: 'User'`), using `.populate()` to join details.
