import React from 'react';
import Layout from '../../components/Layout';
import { User, Mail, BookOpen } from 'lucide-react';

const Profile = () => {
  return (
    <Layout role="Faculty">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Profile</h1>
        <p className="text-gray-600">Manage your faculty account details.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0">
            <User size={40} className="text-gray-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Dr. Jane Smith</h2>
            <p className="text-primary-600 font-medium">Senior Professor, Computer Science</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email Address</p>
              <p className="text-gray-900">jane.smith@university.edu</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Department</p>
              <p className="text-gray-900">Department of Computer Science & Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
