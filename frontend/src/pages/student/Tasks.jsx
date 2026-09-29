import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import TaskCard from '../../components/TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Frontend Development', 'Backend Development', 'Database', 'Testing', 'Debugging'];

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

  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === filter);

  return (
    <Layout role="Student">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Engineering Tasks</h1>
          <p className="text-gray-600">Complete tasks to earn points and improve your skills.</p>
        </div>
        
        <div>
          <select 
            className="input-field min-w-[200px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} role="student" />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No tasks found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
