
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, Menu, Settings, X, User, BarChart2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-2 rounded-lg mr-3">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Bengkel Management
              </h1>
            </Link>
          </div>
          
          <div className={`absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50 md:hidden transition-transform duration-200 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="px-4 py-3 space-y-1">
              <Link to="/dashboard" className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Dashboard
              </Link>
              <Link to="/queue" className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Antrian
              </Link>
              <Link to="/vehicles" className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Kendaraan
              </Link>
              <Link to="/reports" className="block py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Laporan
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Dashboard</Link>
            <Link to="/queue" className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Antrian</Link>
            <Link to="/vehicles" className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Kendaraan</Link>
            <Link to="/reports" className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Laporan</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
