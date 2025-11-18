import { Request, Response } from 'express';
import { AuthUser } from '../models/AuthUser';

// Registrazione
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validazione
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tutti i campi sono obbligatori' 
      });
    }

    if (username.length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: 'L\'username deve essere lungo almeno 3 caratteri' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'La password deve essere lunga almeno 6 caratteri' 
      });
    }

    // Verifica se l'utente esiste già
    const existingUser = await AuthUser.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username o email già esistenti' 
      });
    }

    // Crea nuovo utente (in produzione, hashare la password con bcrypt!)
    const newUser = new AuthUser({
      username,
      email,
      password // TODO: hashare in produzione!
    });

    await newUser.save();

    res.status(201).json({ 
      success: true, 
      message: 'Registrazione completata con successo',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username e password sono obbligatori' 
      });
    }

    // Trova l'utente
    const user = await AuthUser.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenziali non valide' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login effettuato con successo',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
};

// Login con Google (simulato)
export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { googleId, email, username } = req.body;

    let user = await AuthUser.findOne({ googleId });

    if (!user) {
      // Crea nuovo utente Google
      user = new AuthUser({
        username: username || `google_${Date.now()}`,
        email,
        password: `google_${Date.now()}`, // Password random per utenti Google
        googleId
      });
      await user.save();
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login con Google effettuato con successo',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Errore durante il login con Google:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Errore del server' 
    });
  }
};
