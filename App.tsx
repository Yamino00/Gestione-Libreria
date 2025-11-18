import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { DashboardView } from './views/DashboardView';
import { BooksView } from './views/BooksView';
import { UsersView } from './views/UsersView';
import { LoansView } from './views/LoansView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { useLibraryData } from './hooks/useLibraryData';
import type { View } from './types';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuth();
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

  // Mostra Login o Registrazione se non autenticato
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginView onNavigateToRegister={() => setAuthView('register')} />;
    } else {
      return <RegisterView onNavigateToLogin={() => setAuthView('login')} />;
    }
  }

  // Mostra l'app principale se autenticato
  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;