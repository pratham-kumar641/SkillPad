import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import { projects as mockProjects, students as mockStudents } from '../../data/mockData';
import { ExternalLink, GitBranch, Search } from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setProjectsList(data);
      } else {
        setProjectsList(mockProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjectsList(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  
  const verifiedProjects = projectsList.filter(p => p.status === 'Reviewed');
  
  const filteredProjects = verifiedProjects.filter(p => 
    p.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentInfo = (project) => {
    if (project.studentId && typeof project.studentId === 'object') {
      return {
        name: project.studentId.name || 'Student',
        email: project.studentId.email || ''
      };
    }
    const student = mockStudents.find(s => s.id === project.studentId);
    return student || { name: project.studentName || 'Student', email: '' };
  };

  const headers = ['Project Name', 'Author', 'Score', 'Links'];

  const renderRow = (project) => {
    const student = getStudentInfo(project);
    return (
      <tr key={project._id || project.id} className="bg-white border-b hover:bg-gray-50">
        <td className="py-4 px-6">
          <p className="font-medium text-gray-900">{project.projectName}</p>
          <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{project.description}</p>
        </td>
        <td className="py-4 px-6">
          <p className="font-medium text-gray-900">{student.name}</p>
          <p className="text-xs text-gray-500">{student.email}</p>
        </td>
        <td className="py-4 px-6 font-semibold text-gray-900">
          <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">
            {project.score !== null && project.score !== undefined ? project.score : 'N/A'}/100
          </span>
        </td>
        <td className="py-4 px-6">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900" title="GitHub Repository">
                <GitBranch size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600" title="Live Demo">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Layout role="Recruiter">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verified Projects</h1>
          <p className="text-gray-600">Explore high-quality student projects evaluated by faculty.</p>
        </div>
        
        <div className="relative min-w-[250px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="input-field pl-10" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table headers={headers} data={filteredProjects} renderRow={renderRow} />
      </div>
    </Layout>
  );
};

export default Projects;
