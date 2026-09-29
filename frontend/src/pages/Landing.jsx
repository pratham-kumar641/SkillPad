import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import { BookOpen, Code, Trophy, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />


      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to <span className="text-primary-600">SkillPad</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Software Engineering Simulation Platform. <br />
          <span className="font-semibold">Learn Like an Engineer, Not Just a Student.</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="w-full sm:w-auto text-lg px-8 py-3">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3">Login</Button>
          </Link>
        </div>
      </section>


      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to simulate a real engineering environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              title=""
              value="Simulated Sprints"
              icon={<BookOpen size={24} />}
              className="text-center items-center flex flex-col"
            />
            <Card
              title=""
              value="Engineering Tasks"
              icon={<Code size={24} />}
              className="text-center items-center flex flex-col"
            />
            <Card
              title=""
              value="Leaderboards"
              icon={<Trophy size={24} />}
              className="text-center items-center flex flex-col"
            />
            <Card
              title=""
              value="Faculty Analytics"
              icon={<Users size={24} />}
              className="text-center items-center flex flex-col"
            />
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Students</h3>
              <p className="text-gray-600">Experience real-world software engineering workflows, complete tasks, and build your portfolio.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Faculty</h3>
              <p className="text-gray-600">Manage tasks, review student submissions, and track class progress with detailed analytics.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Recruiters</h3>
              <p className="text-gray-600">Discover top talent by reviewing verified project portfolios and performance metrics.</p>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Landing;
