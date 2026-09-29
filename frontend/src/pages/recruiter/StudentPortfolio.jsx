import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { students as mockStudents, projects as mockProjects } from '../../data/mockData';
import { Search, User, ExternalLink, GitBranch, Briefcase } from 'lucide-react';

const StudentPortfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsAndProjects();
  }, []);

  const fetchStudentsAndProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const [resStudents, resProjects] = await Promise.all([
        fetch('http://localhost:5000/api/users/students', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/projects', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const dataStudents = await resStudents.json();
      const dataProjects = await resProjects.json();

      let studentList = mockStudents;
      if (resStudents.ok && dataStudents.length > 0) {
        studentList = dataStudents.map((st, idx) => ({
          id: st._id,
          name: st.name,
          email: st.email,
          skills: st.skills || ['React.js', 'Node.js', 'MongoDB', 'JavaScript'],
          averageScore: 85 + (idx * 3),
          rank: idx + 1
        }));
      }

      setStudents(studentList);
      setSelectedStudent(studentList[0]);

      if (resProjects.ok && dataProjects.length > 0) {
        setProjects(dataProjects);
      } else {
        setProjects(mockProjects);
      }
    } catch (err) {
      console.error(err);
      setStudents(mockStudents);
      setSelectedStudent(mockStudents[0]);
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentProjects = selectedStudent 
    ? projects.filter(p => (p.studentId?._id === selectedStudent.id || p.studentId === selectedStudent.id) && p.status === 'Reviewed')
    : [];

  return (
    <Layout role="Recruiter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Portfolios</h1>
        <p className="text-gray-600">Read-only view of student skills, verified projects, and performance.</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading portfolios...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="input-field pl-10 w-full" 
                  placeholder="Search students..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[500px] p-2 space-y-1">
              {filteredStudents.map(student => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    selectedStudent?.id === student.id ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-medium ${selectedStudent?.id === student.id ? 'text-primary-900' : 'text-gray-900'}`}>
                      {student.name}
                    </h4>
                    <p className="text-xs text-gray-500">Score: {student.averageScore} | Rank: #{student.rank}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Details */}
          {selectedStudent && (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 border-b border-gray-100 pb-8">
                <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm flex-shrink-0">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedStudent.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <p>Email: <span className="font-medium text-gray-900">{selectedStudent.email}</span></p>
                    <p>Avg Score: <span className="font-semibold text-gray-900">{selectedStudent.averageScore}/100</span></p>
                    <p>Rank: <span className="font-semibold text-gray-900">#{selectedStudent.rank}</span></p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Verified Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills?.map(skill => (
                        <span key={skill} className="bg-primary-50 text-primary-700 border border-primary-100 text-xs px-2.5 py-1 rounded-md font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-gray-500" />
                  Verified Projects
                </h3>
                
                {studentProjects.length > 0 ? (
                  <div className="space-y-4">
                    {studentProjects.map(project => (
                      <div key={project._id || project.id} className="border border-gray-200 rounded-lg p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{project.projectName}</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">
                            Score: {project.score}/100
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                        
                        {project.feedback && (
                          <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-4 italic">
                            <span className="font-semibold not-italic">Faculty Feedback:</span> {project.feedback}
                          </div>
                        )}

                        <div className="flex gap-4">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                              <GitBranch size={16} className="mr-1.5" />
                              Repository
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                              <ExternalLink size={16} className="mr-1.5" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                    <p className="text-gray-500">No reviewed projects available for this student yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default StudentPortfolio;
