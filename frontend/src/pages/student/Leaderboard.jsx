import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import { students as mockStudents } from '../../data/mockData';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const formatted = data.map((st, index) => ({
          id: st._id,
          name: st.name,
          completedTasks: st.completedTasks ?? Math.max(20 - (index * 3), 5),
          projects: st.projects ?? Math.max(5 - index, 1),
          averageScore: st.averageScore ?? (95 - (index * 4))
        }));
        formatted.sort((a, b) => b.averageScore - a.averageScore);
        const ranked = formatted.map((st, index) => ({
          ...st,
          rank: index + 1
        }));
        setStudents(ranked);
      } else {
        const sortedMock = [...mockStudents]
          .sort((a, b) => b.averageScore - a.averageScore)
          .map((st, index) => ({ ...st, rank: index + 1 }));
        setStudents(sortedMock);
      }
    } catch (error) {
      console.error(error);
      const sortedMock = [...mockStudents]
        .sort((a, b) => b.averageScore - a.averageScore)
        .map((st, index) => ({ ...st, rank: index + 1 }));
      setStudents(sortedMock);
    } finally {
      setLoading(false);
    }
  };

  const headers = ['Rank', 'Student Name', 'Tasks Completed', 'Projects', 'Avg Score'];

  const renderRow = (student, index) => {
    return (
      <tr key={student.id || index} className="border-b hover:bg-gray-50 bg-white">
        <td className="py-4 px-6 font-medium text-gray-900">
          {index === 0 ? <Trophy size={20} className="text-yellow-500 inline" /> :
           index === 1 ? <Trophy size={20} className="text-gray-400 inline" /> :
           index === 2 ? <Trophy size={20} className="text-amber-600 inline" /> :
           index + 1}
        </td>
        <td className="py-4 px-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xs">
            {student.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900">{student.name}</span>
        </td>
        <td className="py-4 px-6 text-gray-600">{student.completedTasks}</td>
        <td className="py-4 px-6 text-gray-600">{student.projects}</td>
        <td className="py-4 px-6 font-semibold text-gray-900">{student.averageScore}</td>
      </tr>
    );
  };

  return (
    <Layout role="Student">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600">See how you rank against your peers in tasks and projects.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading leaderboard...</div>
        ) : (
          <Table headers={headers} data={students} renderRow={renderRow} />
        )}
      </div>
    </Layout>
  );
};

export default Leaderboard;
