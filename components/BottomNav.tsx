import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BookIcon } from './icons/BookIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CollectionIcon } from './icons/CollectionIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import type { View } from '../types';

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const { logout, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
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
    <>
      {/* User Menu Modal */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setShowUserMenu(false)}
        >
          <div 
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-6 animate-fade-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold text-slate-800">{user?.username}</p>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                setShowUserMenu(false);
              }}
              className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogoutIcon className="mr-2 h-5 w-5" />
              Esci
            </button>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
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
          {/* User Menu Button */}
          <button
            onClick={() => setShowUserMenu(true)}
            className="flex flex-col items-center justify-center w-full transition-colors duration-200 text-slate-500"
          >
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium mt-1">Profilo</span>
          </button>
        </div>
      </nav>
    </>
  );
};