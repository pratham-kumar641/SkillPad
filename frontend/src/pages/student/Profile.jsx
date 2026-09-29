import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { User, Mail, Briefcase, Award } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', role: 'Student', skills: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
      });
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Note: To persist changes, an API call to update user profile would go here.
    setUser({ ...user, name: formData.name, email: formData.email });
    localStorage.setItem('user', JSON.stringify({ ...user, name: formData.name, email: formData.email }));
  };

  return (
    <Layout role="Student">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information.</p>
        </div>
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
              <User size={64} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{formData.name}</h2>
            <p className="text-gray-500 mb-4">{user.role}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {(user.skills || ['React', 'Node.js', 'MongoDB']).map(skill => (
                <span key={skill} className="bg-primary-50 text-primary-700 text-xs px-2.5 py-1 rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-gray-500" />
              Personal Information
            </h3>
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900">{user.role}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={20} className="text-gray-500" />
              Performance Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Tasks</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">85</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Avg Score</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">#4</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Rank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
