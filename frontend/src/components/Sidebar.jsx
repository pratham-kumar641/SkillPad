import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code, 
  Target, 
  TerminalSquare, 
  Upload, 
  TrendingUp, 
  Trophy, 
  UserCircle,
  Users,
  Briefcase,
  FileCheck,
  BarChart3,
  Search
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const getLinks = () => {
    switch (role) {
      case 'Student':
        return [
          { name: 'Dashboard', path: '/student', icon: <LayoutDashboard size={20} /> },
          { name: 'Engineering Tasks', path: '/student/tasks', icon: <Code size={20} /> },
          { name: 'Sprint', path: '/student/sprint', icon: <Target size={20} /> },
          { name: 'Code Runner', path: '/student/code-runner', icon: <TerminalSquare size={20} /> },
          { name: 'Project Submission', path: '/student/project-submission', icon: <Upload size={20} /> },
          { name: 'Progress', path: '/student/progress', icon: <TrendingUp size={20} /> },
          { name: 'Leaderboard', path: '/student/leaderboard', icon: <Trophy size={20} /> },
          { name: 'Profile', path: '/student/profile', icon: <UserCircle size={20} /> },
        ];
      case 'Faculty':
        return [
          { name: 'Dashboard', path: '/faculty', icon: <LayoutDashboard size={20} /> },
          { name: 'Manage Tasks', path: '/faculty/tasks', icon: <Code size={20} /> },
          { name: 'Create Task', path: '/faculty/tasks/create', icon: <Target size={20} /> },
          { name: 'Submissions', path: '/faculty/submissions', icon: <FileCheck size={20} /> },
          { name: 'Students', path: '/faculty/students', icon: <Users size={20} /> },
          { name: 'Analytics', path: '/faculty/analytics', icon: <BarChart3 size={20} /> },
        ];
      case 'Recruiter':
        return [
          { name: 'Dashboard', path: '/recruiter', icon: <LayoutDashboard size={20} /> },
          { name: 'Student Portfolio', path: '/recruiter/students', icon: <Search size={20} /> },
          { name: 'Projects', path: '/recruiter/projects', icon: <Briefcase size={20} /> },
          { name: 'Performance', path: '/recruiter/performance', icon: <BarChart3 size={20} /> },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="fixed top-0 left-0 z-20 flex flex-col w-64 h-screen pt-16 font-normal duration-75 lg:flex transition-width bg-white border-r border-gray-200">
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1 bg-white">
            <ul className="pb-2 space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    end={link.path === `/${role.toLowerCase()}`}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-base font-normal rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    <div className="text-gray-500 w-6 h-6 flex items-center justify-center">
                      {link.icon}
                    </div>
                    <span className="ml-3">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
