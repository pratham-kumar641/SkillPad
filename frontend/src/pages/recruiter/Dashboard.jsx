import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { metrics } from '../../data/mockData';
import { Users, Briefcase, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
  return (
    <Layout role="Recruiter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <p className="text-gray-600">Discover top talent and review verified student projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Students" value={metrics.totalStudents} icon={<Users size={24} />} />
        <Card title="Projects Submitted" value={metrics.completedProjects} icon={<Briefcase size={24} />} />
        <Card title="Average Score" value={`${metrics.averageScore}/100`} icon={<TrendingUp size={24} />} />
        <Card title="Top Skills" value="5" icon={<Award size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top In-Demand Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">React.js</span>
            <span className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium">Node.js</span>
            <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-medium">MongoDB</span>
            <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium">System Design</span>
            <span className="bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium">Testing</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            These skills represent the most completed task categories across the current batch.
          </p>
        </div>

        <div className="bg-primary-600 rounded-xl shadow-sm p-6 text-white text-center flex flex-col justify-center items-center">
          <h3 className="text-xl font-bold mb-2">Ready to Hire?</h3>
          <p className="text-primary-100 mb-6 text-sm">
            Browse through student portfolios to find the right candidate for your team.
          </p>
          <a href="/recruiter/students" className="bg-white text-primary-600 px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors w-full">
            Browse Students
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
