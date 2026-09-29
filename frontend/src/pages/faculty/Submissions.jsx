import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StatusBadge from '../../components/StatusBadge';
import { projects as mockProjects } from '../../data/mockData';

const Submissions = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
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
      console.error('Error fetching projects', error);
      setProjectsList(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (project) => {
    setSelectedProject(project);
    setScore(project.score || '');
    setFeedback(project.feedback || '');
    setIsModalOpen(true);
  };

  const submitEvaluation = async () => {
    if (!selectedProject) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/projects/${selectedProject._id || selectedProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          score: Number(score),
          feedback,
          status: 'Reviewed'
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setProjectsList(prev => prev.map(p => (p._id === updated._id || p.id === selectedProject.id) ? { ...p, score: updated.score, feedback: updated.feedback, status: 'Reviewed' } : p));
      } else {
        // Fallback local update
        setProjectsList(prev => prev.map(p => (p.id === selectedProject.id || p._id === selectedProject._id) ? { ...p, score: Number(score), feedback, status: 'Reviewed' } : p));
      }
    } catch (error) {
      console.error(error);
      setProjectsList(prev => prev.map(p => (p.id === selectedProject.id || p._id === selectedProject._id) ? { ...p, score: Number(score), feedback, status: 'Reviewed' } : p));
    } finally {
      setIsModalOpen(false);
    }
  };

  const headers = ['Student Name', 'Project Name', 'Status', 'Score', 'Action'];

  const renderRow = (project) => {
    const studentName = project.studentId?.name || project.studentName || 'Student User';
    return (
      <tr key={project._id || project.id} className="bg-white border-b hover:bg-gray-50">
        <td className="py-4 px-6 font-medium text-gray-900">{studentName}</td>
        <td className="py-4 px-6 text-gray-600">{project.projectName}</td>
        <td className="py-4 px-6">
          <StatusBadge status={project.status} />
        </td>
        <td className="py-4 px-6 font-semibold text-gray-900">
          {project.score !== null && project.score !== undefined ? project.score : '-'}
        </td>
        <td className="py-4 px-6">
          <Button variant="outline" className="text-xs py-1.5 px-3" onClick={() => handleReview(project)}>
            Review
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Layout role="Faculty">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Submissions & Review</h1>
        <p className="text-gray-600">Review student submitted projects, assign scores and provide feedback.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading submissions...</div>
        ) : (
          <Table headers={headers} data={projectsList} renderRow={renderRow} />
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Review Project Submission"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Student</p>
                <p className="font-medium text-gray-900">{selectedProject.studentId?.name || selectedProject.studentName || 'Student'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Project</p>
                <p className="font-medium text-gray-900">{selectedProject.projectName}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Description</p>
              <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">{selectedProject.description}</p>
            </div>

            <div className="flex gap-4">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline text-sm font-medium"
                >
                  🔗 View GitHub Repository
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline text-sm font-medium"
                >
                  🌐 View Live Demo
                </a>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Faculty Evaluation</h4>
              <Input 
                id="score" 
                type="number" 
                label="Score (0 - 100)" 
                min="0" max="100"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  className="input-field min-h-[100px]"
                  placeholder="Enter evaluation feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={submitEvaluation}>Save Evaluation</Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Submissions;
