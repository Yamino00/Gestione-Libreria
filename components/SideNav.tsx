import React from 'react';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookIcon } from './icons/BookIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CollectionIcon } from './icons/CollectionIcon';
import type { View } from '../types';

interface SideNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activeView, setActiveView }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <ChartBarIcon className="h-6 w-6" /> },
    { view: 'books', label: 'Libri', icon: <BookIcon className="h-6 w-6" /> },
    { view: 'users', label: 'Utenti', icon: <UsersIcon className="h-6 w-6" /> },
    { view: 'loans', label: 'Prestiti', icon: <CollectionIcon className="h-6 w-6" /> },
  ];
  
  const activeClasses: Record<View, string> = {
    dashboard: 'bg-primary-light text-primary-darkest font-bold',
    books: 'bg-primary-light text-primary font-bold',
    users: 'bg-accent-green-light text-accent-green font-bold',
    loans: 'bg-accent-amber-light text-accent-amber font-bold',
  };
  
  const activeIconClasses: Record<View, string> = {
    dashboard: 'text-primary-darkest',
    books: 'text-primary',
    users: 'text-accent-green',
    loans: 'text-accent-amber',
  };

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-slate-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary mr-3">
                <path d="M12 2.25a.75.75 0 01.75.75v11.522c2.544-1.385 5.346-1.396 8.001 0V4.623a.75.75 0 011.5 0v14.002a2.25 2.25 0 01-2.25 2.25H4.001a2.25 2.25 0 01-2.25-2.25V4.623a.75.75 0 011.5 0v13.521c2.655-1.396 5.457-1.385 8.001 0V3a.75.75 0 01.75-.75z" />
            </svg>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
                Gestionale Libreria
            </h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
                {navItems.map(({ view, label, icon }) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-colors duration-150 ${
                    activeView === view
                      ? activeClasses[view]
                      : 'text-slate-500'
                  }`}
                  aria-current={activeView === view ? 'page' : undefined}
                >
                  <div className={`mr-3 flex-shrink-0 h-6 w-6 ${activeView === view ? activeIconClasses[view] : 'text-slate-400'}`}>
                    {icon}
                  </div>
                  {label}
                </button>
              ))}
            </nav>
        </div>
      </div>
    </aside>
  );
};