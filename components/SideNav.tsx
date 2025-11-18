import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookIcon } from './icons/BookIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CollectionIcon } from './icons/CollectionIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import type { View } from '../types';

interface SideNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activeView, setActiveView }) => {
  const { logout, user } = useAuth();
  
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
  
  const hoverClasses: Record<View, string> = {
    dashboard: 'hover:bg-primary-light hover:text-primary-darkest',
    books: 'hover:bg-primary-light hover:text-primary',
    users: 'hover:bg-accent-green-light hover:text-accent-green',
    loans: 'hover:bg-accent-amber-light hover:text-accent-amber',
  };
  
  const activeIconClasses: Record<View, string> = {
    dashboard: 'text-primary-darkest',
    books: 'text-primary',
    users: 'text-accent-green',
    loans: 'text-accent-amber',
  };

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-slate-200 pt-3 pb-4 overflow-y-auto">
        <div className="flex flex-col items-center flex-shrink-0 px-2 mb-1">
            <img 
              src="/logo.png" 
              alt="Logo Libreria" 
              className="h-24 w-24 mb-2"
            />
            <h1 className="text-xl font-bold tracking-tight text-slate-800 text-center">
                Gestionale Libreria
            </h1>
        </div>
        <div className="mt-1 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1" aria-label="Sidebar">
                {navItems.map(({ view, label, icon }) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-colors duration-150 ${
                    activeView === view
                      ? activeClasses[view]
                      : `text-slate-500 ${hoverClasses[view]}`
                  }`}
                  aria-current={activeView === view ? 'page' : undefined}
                >
                  <div className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150 ${
                    activeView === view 
                      ? activeIconClasses[view] 
                      : `text-slate-400 group-hover:${activeIconClasses[view]}`
                  }`}>
                    {icon}
                  </div>
                  {label}
                </button>
              ))}
            </nav>
        </div>
        
        {/* User info and Logout */}
        <div className="flex-shrink-0 px-4 py-4 border-t border-slate-200">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-700">{user?.username}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-left transition-colors duration-150 text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogoutIcon className="mr-3 h-5 w-5" />
            Esci
          </button>
        </div>
      </div>
    </aside>
  );
};