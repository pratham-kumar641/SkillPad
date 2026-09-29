import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { metrics as mockMetrics, projects as mockProjects } from '../../data/mockData';
import { Users, Code, FileCheck, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(mockMetrics);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacultyDashboard();
  }, []);

  const fetchFacultyDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const [resStudents, resTasks, resProjects] = await Promise.all([
        fetch('http://localhost:5000/api/users/students', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/tasks', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/projects', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const [studentsData, tasksData, projectsData] = await Promise.all([
        resStudents.json(),
        resTasks.json(),
        resProjects.json()
      ]);

      const totalStudents = resStudents.ok && Array.isArray(studentsData) ? studentsData.length : mockMetrics.totalStudents;
      const totalTasks = resTasks.ok && Array.isArray(tasksData) ? tasksData.length : mockMetrics.totalTasks;
      const projectsList = resProjects.ok && Array.isArray(projectsData) ? projectsData : mockProjects;
      
      const pending = projectsList.filter(p => p.status === 'Pending');
      const completed = projectsList.filter(p => p.status === 'Reviewed');

      setStats({
        totalStudents,
        totalTasks,
        pendingSubmissions: pending.length,
        completedProjects: completed.length
      });
      setPendingProjects(pending.slice(0, 3));
    } catch (err) {
      console.error('Error loading faculty dashboard:', err);
      setStats(mockMetrics);
      setPendingProjects(mockProjects.filter(p => p.status === 'Pending').slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="Faculty">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-gray-600">Overview of student progress and pending evaluations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Students" value={loading ? '...' : stats.totalStudents} icon={<Users size={24} />} />
        <Card title="Total Tasks" value={loading ? '...' : stats.totalTasks} icon={<Code size={24} />} />
        <Card title="Pending Submissions" value={loading ? '...' : stats.pendingSubmissions} icon={<FileCheck size={24} />} />
        <Card title="Completed Projects" value={loading ? '...' : stats.completedProjects} icon={<CheckCircle size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Submissions (Action Required)</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {pendingProjects.map(project => (
              <li key={project._id || project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.projectName}</h4>
                    <p className="text-sm text-gray-500 mt-1">Student: {project.studentId?.name || project.studentId || 'Student'}</p>
                    <p className="text-sm text-gray-500">Submitted: {new Date(project.createdAt || project.submittedDate || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
                    {project.status}
                  </span>
                </div>
              </li>
            ))}
            {pendingProjects.length === 0 && (
              <li className="p-6 text-center text-gray-500">No pending submissions.</li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
