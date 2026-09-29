import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 py-3 lg:px-6 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to={role ? `/${role.toLowerCase()}` : '/'} className="flex items-center gap-2">
              <div className="bg-primary-600 text-white p-1.5 rounded-lg font-bold text-xl leading-none">
                SP
              </div>
              <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-800">
                SkillPad
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {role ? (
              <>
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    {role} View
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
