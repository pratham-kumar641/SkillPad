import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend Development',
    difficulty: 'Medium',
    deadline: ''
  });

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem('token');
      
      
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        const task = data.find(t => t._id === id);
        if (task) {
          
          let formattedDate = '';
          if (task.deadline) {
            const dateObj = new Date(task.deadline);
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toISOString().split('T')[0];
            }
          }
          
          setFormData({
            title: task.title || '',
            description: task.description || '',
            category: task.category || 'Frontend Development',
            difficulty: task.difficulty || 'Medium',
            deadline: formattedDate
          });
        }
      }
    } catch (error) {
      console.error('Error fetching task', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/faculty/tasks');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update task');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Layout role="Faculty">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
        <p className="text-gray-600">Modify the engineering task details.</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            id="title" 
            label="Task Title" 
            placeholder="e.g. Build a REST API" 
            value={formData.title}
            onChange={handleChange}
            required 
          />
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description & Requirements
            </label>
            <textarea
              id="description"
              className="input-field min-h-[150px] resize-y"
              placeholder="Detail the task requirements and expected output..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                id="category"
                className="input-field" 
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="Database">Database</option>
                <option value="Testing">Testing</option>
                <option value="Debugging">Debugging</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select 
                id="difficulty"
                className="input-field" 
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          
          <Input 
            id="deadline" 
            type="date"
            label="Deadline" 
            value={formData.deadline}
            onChange={handleChange}
            required 
          />
          
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => navigate('/faculty/tasks')}>
              Cancel
            </Button>
            <Button type="submit">Update Task</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditTask;
