import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { sprints } from '../../data/mockData';
import { CheckCircle, FolderOpen, Target, TrendingUp } from 'lucide-react';

const Progress = () => {
  const currentSprint = sprints[0];
  const skills = [
    { name: 'Frontend Development', progress: 85 },
    { name: 'Backend Development', progress: 60 },
    { name: 'Database', progress: 75 },
    { name: 'Testing', progress: 40 },
    { name: 'Debugging', progress: 90 },
  ];

  return (
    <Layout role="Student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-600">Track your performance and skill development.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Tasks Completed" value="15" icon={<CheckCircle size={24} />} />
        <Card title="Projects Completed" value="2" icon={<FolderOpen size={24} />} />
        <Card title="Sprint Progress" value={`${currentSprint.progress}%`} icon={<Target size={24} />} />
        <Card title="Average Score" value="85" icon={<TrendingUp size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Acquisition</h2>
          <div className="space-y-6">
            {skills.map(skill => (
              <ProgressBar key={skill.name} progress={skill.progress} label={skill.name} />
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sprint 1 Master</h4>
                <p className="text-sm text-gray-600">Completed all assigned tasks in Sprint 1 ahead of schedule.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">First Project</h4>
                <p className="text-sm text-gray-600">Successfully submitted and passed review for your first project.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
