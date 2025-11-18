import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterViewProps {
  onNavigateToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onNavigateToLogin }) => {
  const { register, loginWithGoogle } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validazioni
    if (!username || !email || !password || !confirmPassword) {
      setError('Tutti i campi sono obbligatori');
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('L\'username deve essere lungo almeno 3 caratteri');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Inserisci un indirizzo email valido');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La password deve essere lunga almeno 6 caratteri');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Le password non coincidono');
      setIsLoading(false);
      return;
    }

    const success = await register(username, email, password);
    if (!success) {
      setError('Errore durante la registrazione. Verifica i tuoi dati o prova con un\'altra email.');
    }
    setIsLoading(false);
  };

  const handleGoogleRegister = async () => {
    setError('');
    setIsLoading(true);
    const success = await loginWithGoogle();
    if (!success) {
      setError('Errore durante la registrazione con Google');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center mb-2">
            <img 
              src="/logo.png" 
              alt="Logo Libreria" 
              className="h-32 w-32"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-0.5">Gestionale Libreria</h1>
          <p className="text-slate-600 text-sm">Crea il tuo account</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Scegli un username"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Inserisci la tua email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Crea una password"
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-1">
                Conferma Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Conferma la tua password"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">oppure</span>
            </div>
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-6 rounded-lg border-2 border-slate-300 hover:border-slate-400 shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Registrati con Google
          </button>

          {/* Login Link */}
          <div className="mt-3 text-center">
            <p className="text-slate-600 text-sm">
              Hai già un account?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-primary hover:text-primary-focus font-semibold hover:underline transition-colors"
              >
                Accedi qui
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 text-center text-xs text-slate-500">
          <p>© 2025 Gestionale Libreria. Tutti i diritti riservati.</p>
        </div>
      </div>
    </div>
  );
};
