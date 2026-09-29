import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProgressBar from '../../components/ProgressBar';
import TaskCard from '../../components/TaskCard';

const Sprint = () => {
  const currentSprint = { name: "Current Tasks", goal: "Complete all assigned tasks", progress: 0 };
  const [sprintTasks, setSprintTasks] = useState([]);

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
        setSprintTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setSprintTasks(prev =>
          prev.map(task =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const getTasksByStatus = (status) => {
    return sprintTasks.filter(task => task.status === status);
  };

  return (
    <Layout role="Student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{currentSprint.name}</h1>
        <p className="text-gray-600 mt-1">{currentSprint.goal}</p>
        <div className="mt-4 max-w-md">
          <ProgressBar progress={currentSprint.progress} label="Sprint Progress" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[500px]">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
            Todo
            <span className="bg-gray-200 text-gray-700 text-xs py-0.5 px-2 rounded-full">
              {getTasksByStatus('Todo').length}
            </span>
          </h3>
          <div className="space-y-4">
            {getTasksByStatus('Todo').map(task => (
              <div key={task._id} className="relative group">
                <TaskCard task={task} />
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <button
                    onClick={() => moveTask(task._id, 'In Progress')}
                    className="text-xs bg-white text-primary-600 border border-primary-200 px-2 py-1 rounded shadow-sm hover:bg-primary-50"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="bg-blue-50/30 p-4 rounded-lg border border-blue-100 min-h-[500px]">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
            In Progress
            <span className="bg-blue-100 text-blue-700 text-xs py-0.5 px-2 rounded-full">
              {getTasksByStatus('In Progress').length}
            </span>
          </h3>
          <div className="space-y-4">
            {getTasksByStatus('In Progress').map(task => (
              <div key={task._id} className="relative group">
                <TaskCard task={task} />
                <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
                  <button
                    onClick={() => moveTask(task._id, 'Todo')}
                    className="text-xs bg-white text-gray-600 border border-gray-200 px-2 py-1 rounded shadow-sm hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => moveTask(task._id, 'Completed')}
                    className="text-xs bg-white text-green-600 border border-green-200 px-2 py-1 rounded shadow-sm hover:bg-green-50"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="bg-green-50/30 p-4 rounded-lg border border-green-100 min-h-[500px]">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
            Completed
            <span className="bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full">
              {getTasksByStatus('Completed').length}
            </span>
          </h3>
          <div className="space-y-4">
            {getTasksByStatus('Completed').map(task => (
              <div key={task._id} className="relative group">
                <TaskCard task={task} />
                <div className="absolute top-2 right-2 hidden group-hover:block">
                  <button
                    onClick={() => moveTask(task._id, 'In Progress')}
                    className="text-xs bg-white text-gray-600 border border-gray-200 px-2 py-1 rounded shadow-sm hover:bg-gray-50"
                  >
                    Undo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sprint;
