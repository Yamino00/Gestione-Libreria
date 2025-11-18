import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Inizializza Firebase Admin (sarà fatto in server.ts)
// Questa funzione verifica il token JWT di Firebase

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
  };
}

export const verifyFirebaseToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token di autenticazione mancante' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      };
      next();
    } catch (error) {
      console.error('Errore nella verifica del token:', error);
      return res.status(401).json({ message: 'Token non valido o scaduto' });
    }
  } catch (error) {
    console.error('Errore nel middleware di autenticazione:', error);
    return res.status(500).json({ message: 'Errore del server' });
  }
};

// Middleware opzionale: verifica token ma non blocca se mancante
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          name: decodedToken.name,
        };
      } catch (error) {
        // Token non valido ma non blocchiamo la richiesta
        console.warn('Token non valido:', error);
      }
    }
    next();
  } catch (error) {
    next();
  }
};
