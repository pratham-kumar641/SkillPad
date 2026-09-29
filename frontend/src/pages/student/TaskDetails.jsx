import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { ArrowLeft, Clock, Tag, AlertCircle } from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const tasks = await response.json();
          const foundTask = tasks.find(t => t._id === id || t.id == id);
          setTask(foundTask);
        }
      } catch (err) {
        console.error('Error fetching task', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <Layout role="Student"><p>Loading task...</p></Layout>;
  if (!task) return <Layout role="Student"><p>Task not found.</p></Layout>;

  return (
    <Layout role="Student">
      <button 
        onClick={() => navigate('/student/tasks')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Tasks
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{task.title}</h1>
            <StatusBadge status={task.status} />
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Tag size={16} className="mr-1.5" />
              Category: <span className="font-medium text-gray-900 ml-1">{task.category}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle size={16} className="mr-1.5" />
              Difficulty: <span className="font-medium text-gray-900 ml-1">{task.difficulty}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1.5" />
              Deadline: <span className="font-medium text-gray-900 ml-1">{new Date(task.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-700 mb-6">{task.description}</p>
          </div>
          
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button onClick={() => navigate('/student/code-runner', { state: { taskId: task._id } })} className="px-8">
              Start Assignment & Code
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetails;
