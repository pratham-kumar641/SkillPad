import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import TaskCard from '../../components/TaskCard';
import ProgressBar from '../../components/ProgressBar';
import { sprints } from '../../data/mockData';
import { CheckCircle, Clock, FolderOpen, Target } from 'lucide-react';

const Dashboard = () => {
  const currentSprint = sprints[0];
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        
        // Fetch Tasks
        const tasksRes = await fetch('http://localhost:5000/api/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData);
        }

        // Fetch Projects (submissions)
        const projRes = await fetch('http://localhost:5000/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (projRes.ok) {
          let projData = await projRes.json();
          if (user) {
            projData = projData.filter(p => p.studentId === user.id || (p.studentId && p.studentId._id === user.id));
          }
          setProjects(projData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.length - completedTasks;
  const recentTasks = tasks.slice(0, 3);
  const recentProjects = projects.slice(0, 2);

  return (
    <Layout role="Student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here is your current progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Tasks Completed" value={loading ? "..." : completedTasks} icon={<CheckCircle size={24} />} />
        <Card title="Tasks Pending" value={loading ? "..." : pendingTasks} icon={<Clock size={24} />} />
        <Card title="Current Sprint" value={currentSprint.name} icon={<Target size={24} />} />
        <Card title="Projects Submitted" value={loading ? "..." : projects.length} icon={<FolderOpen size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Tasks</h2>
            {recentTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentTasks.map(task => (
                  <TaskCard key={task._id || task.id} task={task} role="student" />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No tasks assigned yet.</p>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Project Submissions</h2>
            {recentProjects.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {recentProjects.map(project => (
                    <li key={project._id || project.id} className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.projectName}</h4>
                        <p className="text-sm text-gray-500">Submitted on: {new Date(project.createdAt || project.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status || 'Submitted'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">No projects submitted yet.</p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Sprint Progress</h2>
            <ProgressBar progress={currentSprint.progress} label={currentSprint.name} />
            <p className="text-sm text-gray-500 mt-2">Goal: {currentSprint.goal}</p>
            <p className="text-sm text-gray-500">Ends on: {currentSprint.endDate}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Average Score</h2>
            <div className="flex items-center justify-center h-32">
              <div className="text-5xl font-bold text-primary-600">
                85<span className="text-2xl text-gray-400">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
