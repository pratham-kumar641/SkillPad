import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ProjectSubmission = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    githubUrl: '',
    liveUrl: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            projectName: '',
            description: '',
            githubUrl: '',
            liveUrl: ''
          });
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to submit project');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Layout role="Student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Submission</h1>
        <p className="text-gray-600">Submit your completed projects for faculty review.</p>
      </div>

      <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        {error && <p className="mb-4 text-sm text-red-600 font-medium">{error}</p>}
        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project submitted successfully!</h2>
            <p className="text-gray-600">Your faculty will review it soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              id="projectName" 
              label="Project Name" 
              placeholder="e.g. E-Commerce Platform" 
              value={formData.projectName}
              onChange={handleChange}
              required 
            />
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="input-field min-h-[100px] resize-y"
                placeholder="Briefly describe your project"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <Input 
              id="githubUrl" 
              type="url" 
              label="GitHub Repository URL" 
              placeholder="https://github.com/username/project" 
              value={formData.githubUrl}
              onChange={handleChange}
              required 
            />
            
            <Input 
              id="liveUrl" 
              type="url" 
              label="Live Project URL (Optional)" 
              placeholder="https://yourproject.example.com" 
              value={formData.liveUrl}
              onChange={handleChange}
            />
            
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button type="submit">Submit Project</Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ProjectSubmission;
