import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se l'utente è già autenticato al caricamento
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Errore nel parsing dell\'utente salvato:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Ottieni gli utenti registrati
      const usersData = localStorage.getItem('registeredUsers');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verifica le credenziali
      const foundUser = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Errore durante il login:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      // Simulazione login Google (in produzione usare Google OAuth)
      // Per ora creiamo un utente di esempio
      const googleUser: User = {
        id: 'google_' + Date.now(),
        username: 'utente_google',
        email: 'utente@gmail.com',
      };
      
      setUser(googleUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(googleUser));
      return true;
    } catch (error) {
      console.error('Errore durante il login con Google:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Ottieni gli utenti registrati
      const usersData = localStorage.getItem('registeredUsers');
      const users = usersData ? JSON.parse(usersData) : [];

      // Verifica se username o email esistono già
      const usernameExists = users.some((u: any) => u.username === username);
      const emailExists = users.some((u: any) => u.email === email);

      if (usernameExists || emailExists) {
        return false;
      }

      // Crea nuovo utente
      const newUser = {
        id: 'user_' + Date.now(),
        username,
        email,
        password, // In produzione, hashare la password!
      };

      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      // Auto-login dopo registrazione
      const userData: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
