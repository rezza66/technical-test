import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from 'lucide-react';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); 
  return (
    <div className="sticky top-0 bg-white shadow-md py-3 px-4 md:px-20 z-50">
      <div className="flex items-center justify-between">

        <div className="logo">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            eduwork
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-medium" : "text-gray-700 font-medium hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-medium" : "text-gray-700 font-medium hover:text-blue-500"
            }
          >
            About
          </NavLink>
        </div>


        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/auth" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
