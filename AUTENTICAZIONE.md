# Sistema di Autenticazione - Gestionale Libreria

## 🔐 Funzionalità Implementate

### 1. **Pagina di Login**
- Username e password
- Validazione dei campi
- Messaggi di errore personalizzati
- Pulsante "Accedi con Google"
- Link alla pagina di registrazione

### 2. **Pagina di Registrazione**
- Campi: Username, Email, Password, Conferma Password
- Validazione completa:
  - Username minimo 3 caratteri
  - Email formato valido
  - Password minimo 6 caratteri
  - Verifica unicità username ed email
  - Controllo corrispondenza password
- Pulsante "Registrati con Google"
- Link alla pagina di login

### 3. **Protezione delle Route**
- L'applicazione principale è accessibile solo dopo il login
- La prima pagina visualizzata è sempre il login
- Gli utenti non autenticati vengono reindirizzati automaticamente

### 4. **Gestione Utente**
- Visualizzazione profilo utente nella sidebar (desktop)
- Menu profilo nella bottom navigation (mobile)
- Pulsante di logout
- Persistenza della sessione (localStorage)

### 5. **Design Coerente**
- Utilizza gli stessi colori della dashboard principale:
  - Primary: `#0EA5E9` (sky-500)
  - Sfondo: gradiente slate-sky
  - Pulsanti e componenti coerenti con il resto dell'app

## 🎨 Caratteristiche UI/UX

- **Responsive Design**: Ottimizzato per desktop e mobile
- **Animazioni fluide**: Transizioni e feedback visivi
- **Icone SVG**: Logo della libreria personalizzato
- **Google OAuth UI**: Pulsante stilizzato con logo Google ufficiale
- **Validazione real-time**: Feedback immediato all'utente

## 📱 Esperienza Mobile

- Menu profilo con overlay
- Bottom navigation con 5 tab (Dashboard, Libri, Utenti, Prestiti, Profilo)
- Interfaccia ottimizzata per touch

## 🔧 Implementazione Tecnica

### Frontend
- **Context API**: Gestione stato autenticazione globale
- **localStorage**: Persistenza sessione utente
- **React Hooks**: useState, useEffect, useContext
- **TypeScript**: Type safety completo

### Backend (Preparato)
- **MongoDB Model**: Schema AuthUser con validazioni
- **API Endpoints**:
  - `POST /api/auth/register` - Registrazione
  - `POST /api/auth/login` - Login
  - `POST /api/auth/google-login` - Login Google
- **Validazioni server-side**: Controllo unicità e formato dati

## 🚀 Come Utilizzare

### 1. Primo Accesso
1. Aprire l'applicazione
2. Verrà mostrata la pagina di Login
3. Cliccare su "Registrati qui"
4. Compilare il form di registrazione
5. Accesso automatico dopo la registrazione

### 2. Accessi Successivi
1. Inserire username e password
2. Cliccare su "Accedi"
3. La sessione viene salvata automaticamente

### 3. Logout
- **Desktop**: Cliccare sul pulsante "Esci" in fondo alla sidebar
- **Mobile**: Aprire il menu profilo e cliccare su "Esci"

## 📝 Note Importanti

### Sicurezza (Da Implementare in Produzione)
⚠️ **Attenzione**: L'implementazione attuale è a scopo dimostrativo. Per un ambiente di produzione:

1. **Password Hashing**: Implementare bcrypt per hashare le password
2. **JWT Tokens**: Utilizzare JSON Web Tokens invece di localStorage
3. **HTTPS**: Usare solo connessioni sicure
4. **Google OAuth Reale**: Implementare l'integrazione vera con Google OAuth 2.0
5. **Rate Limiting**: Proteggere gli endpoint da attacchi brute-force
6. **Validazione Input**: Sanitizzazione e validazione lato server più robusta

### Storage Attuale
- I dati sono salvati in **localStorage** per scopi dimostrativi
- In produzione, usare il backend MongoDB Atlas

## 🎯 Prossimi Sviluppi

- [ ] Implementare bcrypt per password hashing
- [ ] Integrare JWT per token-based authentication
- [ ] Configurare Google OAuth 2.0 reale
- [ ] Aggiungere funzionalità "Password dimenticata"
- [ ] Implementare 2FA (Two-Factor Authentication)
- [ ] Aggiungere gestione profilo utente
- [ ] Log delle sessioni di accesso

## 📚 Struttura File

```
src/
├── context/
│   └── AuthContext.tsx          # Context per autenticazione
├── views/
│   ├── LoginView.tsx            # Pagina login
│   └── RegisterView.tsx         # Pagina registrazione
├── components/
│   ├── icons/
│   │   └── LogoutIcon.tsx       # Icona logout
│   ├── SideNav.tsx              # Sidebar con profilo e logout
│   └── BottomNav.tsx            # Bottom nav con menu profilo
└── App.tsx                      # Gestione route autenticazione

backend/src/
├── models/
│   └── AuthUser.ts              # Schema MongoDB
├── controllers/
│   └── authController.ts        # Logic autenticazione
├── routes/
│   └── authRoutes.ts            # Endpoint API
└── server.ts                    # Configurazione server
```

---

✨ **Sistema di autenticazione implementato con successo!**
