import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { metrics } from '../../data/mockData';
import { BarChart3, TrendingUp, Award, Clock } from 'lucide-react';

const Performance = () => {
  return (
    <Layout role="Recruiter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Performance Insights</h1>
        <p className="text-gray-600">Analytics on the current cohort of students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Avg Batch Score" value={`${metrics.averageScore}/100`} icon={<TrendingUp size={24} />} />
        <Card title="Task Completion" value={`${metrics.taskCompletionRate}%`} icon={<BarChart3 size={24} />} />
        <Card title="Available Candidates" value="45" icon={<Award size={24} />} />
        <Card title="Avg Time to Hire" value="14 days" icon={<Clock size={24} />} />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Readiness Index</h2>
        <p className="text-gray-600 mb-8 max-w-2xl">
          This index shows how well-prepared the current batch is across various engineering disciplines, based on their completed tasks and project scores.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <ProgressBar progress={88} label="Frontend Development Readiness" colorClass="bg-blue-500" />
          <ProgressBar progress={72} label="Backend Development Readiness" colorClass="bg-green-500" />
          <ProgressBar progress={75} label="Database Architecture Readiness" colorClass="bg-purple-500" />
          <ProgressBar progress={60} label="DevOps & Deployment Readiness" colorClass="bg-orange-500" />
          <ProgressBar progress={68} label="Testing & QA Readiness" colorClass="bg-yellow-500" />
          <ProgressBar progress={82} label="Algorithms & Data Structures Readiness" colorClass="bg-indigo-500" />
        </div>
      </div>
    </Layout>
  );
};

export default Performance;
