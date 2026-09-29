import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import StudentTasks from './pages/student/Tasks';
import TaskDetails from './pages/student/TaskDetails';
import Sprint from './pages/student/Sprint';
import CodeRunner from './pages/student/CodeRunner';
import ProjectSubmission from './pages/student/ProjectSubmission';
import Progress from './pages/student/Progress';
import Leaderboard from './pages/student/Leaderboard';
import StudentProfile from './pages/student/Profile';

import FacultyDashboard from './pages/faculty/Dashboard';
import ManageTasks from './pages/faculty/ManageTasks';
import CreateTask from './pages/faculty/CreateTask';
import EditTask from './pages/faculty/EditTask';
import Submissions from './pages/faculty/Submissions';
import Students from './pages/faculty/Students';
import Analytics from './pages/faculty/Analytics';
import FacultyProfile from './pages/faculty/Profile';

import RecruiterDashboard from './pages/recruiter/Dashboard';
import StudentPortfolio from './pages/recruiter/StudentPortfolio';
import Projects from './pages/recruiter/Projects';
import Performance from './pages/recruiter/Performance';
import RecruiterProfile from './pages/recruiter/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/tasks" element={<StudentTasks />} />
        <Route path="/student/tasks/:id" element={<TaskDetails />} />
        <Route path="/student/sprint" element={<Sprint />} />
        <Route path="/student/code-runner" element={<CodeRunner />} />
        <Route path="/student/project-submission" element={<ProjectSubmission />} />
        <Route path="/student/progress" element={<Progress />} />
        <Route path="/student/leaderboard" element={<Leaderboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/tasks" element={<ManageTasks />} />
        <Route path="/faculty/tasks/create" element={<CreateTask />} />
        <Route path="/faculty/tasks/edit/:id" element={<EditTask />} />
        <Route path="/faculty/submissions" element={<Submissions />} />
        <Route path="/faculty/students" element={<Students />} />
        <Route path="/faculty/analytics" element={<Analytics />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />
        
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiter/students" element={<StudentPortfolio />} />
        <Route path="/recruiter/projects" element={<Projects />} />
        <Route path="/recruiter/performance" element={<Performance />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
