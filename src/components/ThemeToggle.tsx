
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full transition-all duration-300 ease-in-out",
        isDarkMode ? 
          "bg-gray-700 hover:bg-gray-600 text-amber-300" : 
          "bg-gray-100 hover:bg-gray-200 text-indigo-600",
        "ring-offset-white dark:ring-offset-gray-900",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        "shadow-sm"
      )}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? 
        <Sun className="h-5 w-5" /> : 
        <Moon className="h-5 w-5" />
      }
    </button>
  );
};

export default ThemeToggle;
