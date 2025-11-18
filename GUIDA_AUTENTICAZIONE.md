# 🔐 Guida Rapida - Autenticazione

## 🚀 Avvio dell'Applicazione

### Prima volta?

1. **Avvia il progetto**:
   ```bash
   npm run dev
   ```

2. **Apri il browser** su `http://localhost:5173`

3. Vedrai la **pagina di Login** come prima schermata

## 📝 Registrazione Nuovo Utente

1. Clicca su **"Registrati qui"** nella pagina di login
2. Compila il form con:
   - **Username** (minimo 3 caratteri, univoco)
   - **Email** (formato valido, univoco)
   - **Password** (minimo 6 caratteri)
   - **Conferma Password** (deve coincidere)
3. Clicca su **"Registrati"**
4. Verrai automaticamente loggato e reindirizzato alla dashboard

### Alternative:
- Clicca su **"Registrati con Google"** per usare il tuo account Google (demo)

## 🔑 Login

1. Inserisci **username** e **password**
2. Clicca su **"Accedi"**
3. Sarai reindirizzato alla dashboard principale

### Alternative:
- Usa **"Accedi con Google"** (demo)

## 🚪 Logout

### Desktop:
- Scorri in fondo alla **sidebar** (barra laterale sinistra)
- Clicca su **"Esci"**

### Mobile:
- Apri il tab **"Profilo"** nella bottom navigation
- Clicca su **"Esci"** nel menu che appare

## ⚡ Funzionalità

- ✅ Sessione salvata automaticamente
- ✅ Non serve rifare login ogni volta
- ✅ Validazione in tempo reale
- ✅ Messaggi di errore chiari
- ✅ Design responsive (desktop & mobile)

## 🎯 Demo Rapida

Per testare velocemente:

1. **Registra** un account con:
   - Username: `admin`
   - Email: `admin@libreria.it`
   - Password: `123456`

2. **Fai logout** e riprova il login con le stesse credenziali

## 🔒 Note sulla Sicurezza

⚠️ **Versione Demo**: I dati sono salvati localmente nel browser (localStorage)

Per produzione sarà necessario:
- Password hashate (bcrypt)
- JWT tokens
- Backend MongoDB integrato
- Google OAuth reale

---

✨ **Buon utilizzo del Gestionale Libreria!**
