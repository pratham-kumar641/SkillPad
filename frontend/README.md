# SkillPad

SkillPad is a comprehensive educational and recruitment platform that bridges the gap between students, faculty, and recruiters. It provides dedicated portals for each role to manage tasks, track progress, and showcase skills effectively.

## Features

SkillPad offers specialized dashboards and features for three main user roles:

### 🎓 Student Portal
- **Dashboard**: Overview of current tasks, progress, and performance.
- **Task Management**: View assigned tasks and participate in sprints.
- **Code Runner**: Integrated coding environment to practice and solve programming challenges.
- **Project Submission**: Submit projects and assignments directly through the platform.
- **Progress Tracking**: Monitor academic and skill-based progress over time.
- **Leaderboard**: Gamified leaderboard to see rankings among peers.
- **Profile**: Manage personal and academic details.

### 👨‍🏫 Faculty Portal
- **Dashboard**: Overview of student performance and task metrics.
- **Task Management**: Create, assign, and manage tasks for students.
- **Submissions**: Review and grade student project and task submissions.
- **Student Tracking**: Monitor individual student progress and identify areas for improvement.
- **Analytics**: Detailed analytics and reports on class performance.

### 🏢 Recruiter Portal
- **Dashboard**: Overview of available talent and recruitment metrics.
- **Student Portfolio**: Browse through comprehensive student portfolios and skills.
- **Projects**: View projects submitted by students to assess their practical abilities.
- **Performance Analytics**: Evaluate student performance metrics to find the best fit.

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd SkillPad
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Building for Production

To build the application for production, run:
```bash
npm run build
```

To preview the production build, run:
```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/       # Static assets like images and global styles
├── components/   # Reusable React components
├── data/         # Mock data or data fetching utilities
├── pages/        # Page components grouped by role
│   ├── faculty/  # Faculty portal pages
│   ├── recruiter/# Recruiter portal pages
│   ├── student/  # Student portal pages
│   └── ...       # Auth and landing pages
├── App.jsx       # Main application routing
└── main.jsx      # Application entry point
```

## License

This project is licensed under the MIT License.
