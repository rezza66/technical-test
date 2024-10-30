import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white">
      <ul className="p-4 mt-2">
        <li className="mb-4">
          <Link to="/manage-users" className="hover:bg-gray-700 p-2 block">Manage Users</Link>
        </li>
        <li className="mb-4">
          <Link to="/manage-products" className="hover:bg-gray-700 p-2 block">Manage Products</Link>
        </li>
        <li className="mb-4">
          <Link to="/manage-categories" className="hover:bg-gray-700 p-2 block">Manage Categories</Link>
        </li>
        <li className="mb-4">
          <Link to="/manage-orders" className="hover:bg-gray-700 p-2 block">Manage Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
