import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, role }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar role={role} />
      <div className="flex flex-1 pt-16">
        {role && <Sidebar role={role} />}
        <main className={`flex-1 ${role ? 'lg:ml-64 p-4 lg:p-8' : 'p-0'}`}>
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
