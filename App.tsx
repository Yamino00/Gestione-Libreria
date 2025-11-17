
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { BooksView } from './views/BooksView';
import { UsersView } from './views/UsersView';
import { LoansView } from './views/LoansView';
import { useLibraryData } from './hooks/useLibraryData';
import type { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const libraryData = useLibraryData();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView libraryData={libraryData} />;
      case 'books':
        return <BooksView libraryData={libraryData} />;
      case 'users':
        return <UsersView libraryData={libraryData} />;
      case 'loans':
        return <LoansView libraryData={libraryData} />;
      default:
        return <DashboardView libraryData={libraryData} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
