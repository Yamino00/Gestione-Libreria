import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCB9khKJCEpMEcQX15CgH0EpMEa2MeQS28",
  authDomain: "libreria-projectwork.firebaseapp.com",
  projectId: "libreria-projectwork",
  storageBucket: "libreria-projectwork.firebasestorage.app",
  messagingSenderId: "956777203790",
  appId: "1:956777203790:web:a3b6a78483d30223739b1f"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firebase Auth
export const auth = getAuth(app);

// Configura Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
