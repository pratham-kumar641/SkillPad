import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          setTasks(tasks.filter(t => t._id !== id));
        }
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const headers = ['Task', 'Category', 'Difficulty', 'Deadline', 'Status', 'Actions'];

  const renderRow = (task) => (
    <tr key={task._id} className="bg-white border-b hover:bg-gray-50">
      <td className="py-4 px-6 font-medium text-gray-900">{task.title}</td>
      <td className="py-4 px-6 text-gray-600">{task.category}</td>
      <td className="py-4 px-6 text-gray-600">{task.difficulty}</td>
      <td className="py-4 px-6 text-gray-600">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
      <td className="py-4 px-6">
        <StatusBadge status={task.status} />
      </td>
      <td className="py-4 px-6">
        <div className="flex gap-2">
          <button className="text-gray-500 hover:text-primary-600 transition-colors">
            <Eye size={18} />
          </button>
          <button 
            className="text-gray-500 hover:text-blue-600 transition-colors"
            onClick={() => navigate(`/faculty/tasks/edit/${task._id}`)}
          >
            <Edit size={18} />
          </button>
          <button 
            className="text-gray-500 hover:text-red-600 transition-colors"
            onClick={() => handleDelete(task._id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <Layout role="Faculty">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Tasks</h1>
          <p className="text-gray-600">View, edit, and delete engineering tasks.</p>
        </div>
        <Button onClick={() => navigate('/faculty/tasks/create')}>
          Create New Task
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table headers={headers} data={tasks} renderRow={renderRow} />
      </div>
    </Layout>
  );
};

export default ManageTasks;
