export const students = [
  { id: 1, name: "Pratham", email: "pratham@example.com", role: "Student", skills: ["Frontend Development", "Backend Development"], projects: 2, completedTasks: 15, averageScore: 85, rank: 1 },
  { id: 2, name: "Pranjal", email: "Pranjal31@example.com", role: "Student", skills: ["Testing", "Debugging"], projects: 1, completedTasks: 10, averageScore: 78, rank: 2 },
  { id: 3, name: "Prayag", email: "prayag12@example.com", role: "Student", skills: ["Database", "Backend Development"], projects: 3, completedTasks: 20, averageScore: 92, rank: 3 },
];

export const tasks = [
  { id: 1, title: "Build a REST API", description: "Create a simple Node.js/Express REST API with CRUD operations.", category: "Backend Development", difficulty: "Medium", status: "Todo", deadline: "2026-09-01" },
  { id: 2, title: "React Login Page", description: "Design and implement a responsive login page using React and Tailwind.", category: "Frontend Development", difficulty: "Easy", status: "In Progress", deadline: "2026-08-25" },
  { id: 3, title: "Database Schema Design", description: "Design a relational database schema for an e-commerce platform.", category: "Database", difficulty: "Hard", status: "Todo", deadline: "2026-09-05" },
  { id: 4, title: "Write Unit Tests", description: "Write Jest unit tests for the provided utility functions.", category: "Testing", difficulty: "Medium", status: "Completed", deadline: "2026-08-20" },
  { id: 5, title: "Fix Authentication Bug", description: "Debug and resolve the JWT token expiration issue in the login flow.", category: "Debugging", difficulty: "Medium", status: "Todo", deadline: "2026-08-30" },
];

export const sprints = [
  { id: 1, name: "Sprint 1: Foundation", goal: "Set up the basic infrastructure and user authentication.", startDate: "2026-08-15", endDate: "2026-08-30", progress: 65 }
];

export const projects = [
  { id: 1, studentId: 1, projectName: "E-Commerce Frontend", description: "A responsive e-commerce storefront.", githubUrl: "https://github.com/example/ecommerce", liveUrl: "https://ecommerce.example.com", submittedDate: "2026-08-20", status: "Reviewed", score: 88, feedback: "Great responsive design. Good use of components." },
  { id: 2, studentId: 2, projectName: "Chat App", description: "Real-time chat application using WebSockets.", githubUrl: "https://github.com/example/chatapp", liveUrl: "https://chatapp.example.com", submittedDate: "2026-08-22", status: "Pending", score: null, feedback: null },
];

export const metrics = {
  totalStudents: 120,
  totalTasks: 45,
  pendingSubmissions: 12,
  completedProjects: 85,
  averageScore: 82,
  taskCompletionRate: 75
};
