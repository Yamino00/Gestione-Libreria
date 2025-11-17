import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookIcon } from './icons/BookIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CollectionIcon } from './icons/CollectionIcon';
import type { View } from '../types';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <ChartBarIcon className="h-7 w-7" /> },
    { view: 'books', label: 'Libri', icon: <BookIcon className="h-7 w-7" /> },
    { view: 'users', label: 'Utenti', icon: <UsersIcon className="h-7 w-7" /> },
    { view: 'loans', label: 'Prestiti', icon: <CollectionIcon className="h-7 w-7" /> },
  ];

  const getActiveTextColor = (view: View) => {
    switch(view) {
        case 'dashboard':
            return 'text-primary-darkest';
        case 'books':
            return 'text-primary';
        case 'users':
            return 'text-accent-green';
        case 'loans':
            return 'text-accent-amber';
        default:
            return 'text-primary';
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 shadow-lg md:hidden z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ view, label, icon }) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
              activeView === view ? getActiveTextColor(view) : 'text-slate-500'
            }`}
            aria-current={activeView === view ? 'page' : undefined}
          >
            {icon}
            <span className="text-xs font-medium mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};