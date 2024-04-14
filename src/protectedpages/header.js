import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../routes/Context";
import { HomeIcon } from '@heroicons/react/solid'; // Assuming you're using Heroicons for icons

const Header = () => {
  const { logout, isValidToken } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!isValidToken()) {
      navigate('/admin', { replace: true });
    }
  }, []);

  const handleLogout = () => {
    toggleMenu();
    logout();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavItemClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center text-white">
              <HomeIcon className="h-6 w-6 mr-2" />
              <span className="font-semibold">Pixel Perfect</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/home" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/add-order" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Order</Link>
              <Link to="/create-user" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create User</Link>
              <Link to="/orders" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Orders</Link>
              <Link to="/edit-user" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Edit User</Link>
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-controls="mobile-menu"
              aria-expanded={showMenu}
            >
              <svg
                className={`${showMenu ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${showMenu ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${showMenu ? 'block' : 'hidden'} md:hidden bg-gray-900 fixed inset-0 z-50 overflow-y-auto`}>
        <div className="flex justify-center items-center h-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/add-order" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Add Order</Link>
            <Link to="/create-user" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Create User</Link>
            <Link to="/orders" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Orders</Link>
            <Link to="/edit-user" onClick={handleNavItemClick} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Edit User</Link>
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={handleLogout}>Logout</button>
            <button onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Header;
