import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface User {
  id: string;
  username: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Ascolta i cambiamenti nello stato di autenticazione Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          id: firebaseUser.uid,
          username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Utente',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || undefined,
        };
        setUser(userData);
        setFirebaseUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setFirebaseUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Errore durante il login:', error);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Login Google riuscito:', result.user.email);
      return true;
    } catch (error: any) {
      console.error('❌ Errore durante il login con Google:', error);
      console.error('Codice errore:', error.code);
      console.error('Messaggio:', error.message);
      
      // Mostra errore più specifico all'utente
      if (error.code === 'auth/popup-blocked') {
        alert('Popup bloccato! Abilita i popup per questo sito.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log('Popup chiuso dall\'utente');
      } else if (error.code === 'auth/unauthorized-domain') {
        alert('Dominio non autorizzato in Firebase Console. Aggiungi localhost alla lista dei domini autorizzati.');
      } else {
        alert(`Errore: ${error.message}`);
      }
      
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Aggiorna il profilo con il nome utente
      await updateProfile(userCredential.user, {
        displayName: username
      });

      return true;
    } catch (error: any) {
      console.error('Errore durante la registrazione:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated,
    loading,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
