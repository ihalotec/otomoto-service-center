
import React from 'react';
import { Bell, ChevronDown, Menu, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Menu className="h-6 w-6 cursor-pointer md:hidden" />
          <h1 className="text-2xl font-bold">Bengkel Mobil & Motor</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-indigo-200 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-indigo-200 transition-colors">Antrian</a>
          <a href="#" className="hover:text-indigo-200 transition-colors">Kendaraan</a>
          <a href="#" className="hover:text-indigo-200 transition-colors">Laporan</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Bell className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <Settings className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="font-semibold">A</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
