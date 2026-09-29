import React from 'react';
import StatusBadge from './StatusBadge';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, role = 'student' }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/${role}/tasks/${task._id || task.id}`);
  };

  return (
    <div className="card p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <StatusBadge status={task.status} />
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center gap-2 mb-4 text-xs font-medium">
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{task.category}</span>
        <span className={`px-2 py-1 rounded-md ${
          task.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : 
          task.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 
          'bg-red-50 text-red-700'
        }`}>
          {task.difficulty}
        </span>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</span>
        <Button variant="outline" className="text-xs py-1.5 px-3" onClick={handleView}>
          View Task
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
