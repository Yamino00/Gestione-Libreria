import React from 'react';
import { SideNav } from './SideNav';
import { BottomNav } from './BottomNav';
import type { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setActiveView: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  return (
    <div className="min-h-screen">
      <SideNav activeView={activeView} setActiveView={setActiveView} />
      <div className="md:pl-64">
        <main className="p-6 sm:p-8 lg:p-10 pb-24 md:pb-8">
            {children}
        </main>
      </div>
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};