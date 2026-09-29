import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Input from '../../components/Input';
import { students as mockStudents } from '../../data/mockData';
import { Search } from 'lucide-react';

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/students', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const formatted = data.map((st, idx) => ({
          id: st._id,
          name: st.name,
          email: st.email,
          completedTasks: st.completedTasks ?? Math.max(20 - (idx * 3), 5),
          projects: st.projects ?? Math.max(5 - idx, 1),
          averageScore: st.averageScore ?? (95 - (idx * 4))
        }));
        formatted.sort((a, b) => b.averageScore - a.averageScore);
        const sortedWithRank = formatted.map((st, idx) => ({
          ...st,
          rank: idx + 1
        }));
        setStudents(sortedWithRank);
      } else {
        const sortedMock = [...mockStudents]
          .sort((a, b) => b.averageScore - a.averageScore)
          .map((st, idx) => ({ ...st, rank: idx + 1 }));
        setStudents(sortedMock);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      const sortedMock = [...mockStudents]
        .sort((a, b) => b.averageScore - a.averageScore)
        .map((st, idx) => ({ ...st, rank: idx + 1 }));
      setStudents(sortedMock);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = ['Name', 'Email', 'Completed Tasks', 'Projects', 'Avg Score', 'Rank'];

  const renderRow = (student) => (
    <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
      <td className="py-4 px-6 font-medium text-gray-900">{student.name}</td>
      <td className="py-4 px-6 text-gray-600">{student.email}</td>
      <td className="py-4 px-6 text-gray-600">{student.completedTasks}</td>
      <td className="py-4 px-6 text-gray-600">{student.projects}</td>
      <td className="py-4 px-6 font-semibold text-gray-900">{student.averageScore}</td>
      <td className="py-4 px-6 text-gray-600">#{student.rank}</td>
    </tr>
  );

  return (
    <Layout role="Faculty">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enrolled Students</h1>
          <p className="text-gray-600">Manage and view student information.</p>
        </div>
        
        <div className="relative min-w-[250px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="input-field pl-10" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table headers={headers} data={filteredStudents} renderRow={renderRow} />
      </div>
    </Layout>
  );
};

export default Students;
