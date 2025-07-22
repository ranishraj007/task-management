// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-blue-800 text-white w-64 p-4 fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
    >
      <button
        className="md:hidden mb-4 text-white focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Close Sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
                }`
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/board"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
                }`
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              Task Board
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;