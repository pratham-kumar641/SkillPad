import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { metrics } from '../../data/mockData';
import { Users, TrendingUp, Target, Award } from 'lucide-react';

const Analytics = () => {
  return (
    <Layout role="Faculty">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Class Analytics</h1>
        <p className="text-gray-600">Overall performance metrics for your batch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Average Class Score" value={`${metrics.averageScore}/100`} icon={<TrendingUp size={24} />} />
        <Card title="Task Completion Rate" value={`${metrics.taskCompletionRate}%`} icon={<Target size={24} />} />
        <Card title="Active Students" value={metrics.totalStudents - 5} icon={<Users size={24} />} />
        <Card title="Top Performers" value="12" icon={<Award size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Skill Distribution</h2>
          <div className="space-y-6">
            <ProgressBar progress={85} label="Frontend Development" colorClass="bg-blue-500" />
            <ProgressBar progress={65} label="Backend Development" colorClass="bg-green-500" />
            <ProgressBar progress={70} label="Database Design" colorClass="bg-purple-500" />
            <ProgressBar progress={45} label="Testing & QA" colorClass="bg-yellow-500" />
            <ProgressBar progress={55} label="Debugging" colorClass="bg-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center items-center h-full min-h-[300px]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary-500 mb-4">
              <span className="text-3xl font-bold text-gray-900">{metrics.taskCompletionRate}%</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Overall Completion</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              The class is performing slightly above average compared to the previous semester. 
              Backend development shows room for improvement.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
