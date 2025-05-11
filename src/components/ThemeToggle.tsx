
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
        "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
        "text-gray-700 dark:text-gray-200",
        "ring-offset-white dark:ring-offset-gray-900",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        "shadow-sm"
      )}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? 
        <Sun className="h-5 w-5 text-amber-300" /> : 
        <Moon className="h-5 w-5 text-indigo-600" />
      }
    </button>
  );
};

export default ThemeToggle;
