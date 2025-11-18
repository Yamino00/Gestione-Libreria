# 📚 Sistema di Gestione Libreria

Un'applicazione web completa per la gestione di una libreria, con funzionalità per la gestione di utenti, libri e prestiti. Include statistiche avanzate e un backend RESTful con MongoDB Atlas.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Express](https://img.shields.io/badge/Express-4.18.2-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## ✨ Caratteristiche

- **Dashboard Interattiva** - Panoramica in tempo reale con statistiche e grafici
- **Gestione Libri** - CRUD completo per il catalogo librario
- **Gestione Utenti** - Anagrafica utenti con codice fiscale
- **Registro Prestiti** - Tracciamento prestiti attivi e storici
- **Backend REST API** - Server Express.js con MongoDB Atlas
- **Design Responsive** - Interfaccia moderna e adattiva per desktop e mobile
- **Grafici Avanzati** - Visualizzazione prestiti mensili con Recharts

## 🏗️ Architettura

### Frontend
- **React 19** con TypeScript
- **Vite** come build tool e dev server
- **Recharts** per la visualizzazione dati
- **CSS Utility Classes** (Tailwind-style)

### Backend
- **Express.js** - Framework web REST
- **MongoDB Atlas** - Database cloud NoSQL
- **Mongoose** - ODM per MongoDB
- **TypeScript** - Type safety completo
- **CORS** - Gestione cross-origin requests

## 📁 Struttura del Progetto

```
Gestione-Libreria/
├── components/          # Componenti React riutilizzabili
│   ├── icons/          # Icone SVG personalizzate
│   ├── BookForm.tsx    # Form gestione libri
│   ├── UserForm.tsx    # Form gestione utenti
│   ├── LoanForm.tsx    # Form gestione prestiti
│   └── ...
├── views/              # Viste principali
│   ├── DashboardView.tsx
│   ├── BooksView.tsx
│   ├── UsersView.tsx
│   └── LoansView.tsx
├── hooks/              # Custom React hooks
│   └── useLibraryData.ts
├── backend/            # Server Express.js
│   └── src/
│       ├── models/     # Schema Mongoose
│       ├── controllers/# Logica business
│       ├── routes/     # API endpoints
│       └── server.ts   # Entry point
├── types.ts            # Type definitions
└── App.tsx            # Componente root

```

## 🚀 Quick Start

### Prerequisiti

- Node.js (v18 o superiore)
- Account MongoDB Atlas (gratuito)
- npm o yarn

### 1. Clona il Repository

```bash
git clone https://github.com/Yamino00/Gestione-Libreria.git
cd Gestione-Libreria
```

### 2. Configura MongoDB Atlas

1. Crea un account su [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuovo cluster (tier gratuito disponibile)
3. Configura Database Access (username e password)
4. Configura Network Access (aggiungi il tuo IP o 0.0.0.0/0 per sviluppo)
5. Ottieni la connection string dal pulsante "Connect"

### 3. Configura il Backend

```bash
cd backend
npm install
```

Crea il file `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libreria?retryWrites=true&w=majority
```

Avvia il backend:
```bash
npm run dev
```

### 4. Configura il Frontend

Torna alla root del progetto:
```bash
cd ..
npm install
```

Crea il file `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

Avvia il frontend:
```bash
npm run dev
```

### 5. Apri l'Applicazione

Naviga su `http://localhost:5173` nel tuo browser.

## 📡 API Endpoints

### Utenti
- `GET /api/users` - Lista tutti gli utenti
- `POST /api/users` - Crea nuovo utente
- `PUT /api/users/:id` - Aggiorna utente
- `DELETE /api/users/:id` - Elimina utente

### Libri
- `GET /api/books` - Lista tutti i libri
- `POST /api/books` - Aggiungi nuovo libro
- `PUT /api/books/:id` - Aggiorna libro
- `DELETE /api/books/:id` - Elimina libro

### Prestiti
- `GET /api/loans` - Lista tutti i prestiti
- `POST /api/loans` - Registra nuovo prestito
- `PUT /api/loans/:id/return` - Segna libro come restituito
- `DELETE /api/loans/:id` - Elimina prestito

### Health Check
- `GET /api/health` - Stato del server

## 🗄️ Schema Database

### Collezione: `utenti`
```json
{
  "_id": "ObjectId",
  "nome": "string",
  "cognome": "string",
  "genere": "string",
  "eta": "number",
  "codiceFiscale": "string (optional)"
}
```

### Collezione: `libri`
```json
{
  "_id": "ObjectId",
  "titolo": "string",
  "autore": "string",
  "anno": "number",
  "genere": "string",
  "isbn": "string (unique)"
}
```

### Collezione: `prestiti`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: utenti)",
  "bookId": "ObjectId (ref: libri)",
  "dataPrestito": "Date",
  "dataRestituzione": "Date | null"
}
```

## 🛠️ Script Disponibili

### Frontend
```bash
npm run dev      # Avvia dev server
npm run build    # Build per produzione
npm run preview  # Anteprima build
```

### Backend
```bash
npm run dev      # Avvia con hot-reload (tsx watch)
npm run build    # Compila TypeScript
npm start        # Avvia server compilato
```

## 🎨 Funzionalità Principali

### Dashboard
- Statistiche in tempo reale (totale libri, utenti, prestiti attivi)
- Grafico a barre dei prestiti mensili
- Design con card colorate e icone

### Gestione Catalogo
- Visualizzazione completa dei libri
- Aggiunta/modifica/eliminazione tramite modal
- Informazioni dettagliate: titolo, autore, anno, genere, ISBN

### Anagrafica Utenti
- Gestione completa degli utenti
- Supporto per codice fiscale
- Eliminazione cascata (rimuove anche i prestiti associati)

### Registro Prestiti
- Tracciamento prestiti attivi e completati
- Registrazione automatica data prestito
- Funzione di restituzione con un click
- Visualizzazione storica

## 🔒 Sicurezza

- Credenziali MongoDB protette in file `.env` (esclusi da Git)
- Validazione dati lato server con Mongoose
- Gestione errori centralizzata
- CORS configurato per ambiente di sviluppo

## 🤝 Contribuire

Contributi, issues e feature requests sono benvenuti!

1. Fork il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/NuovaFeature`)
3. Commit le modifiche (`git commit -m 'Aggiunta NuovaFeature'`)
4. Push al branch (`git push origin feature/NuovaFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è open source.

## 👤 Autore

**Federico Leccese**
- GitHub: [@Yamino00](https://github.com/Yamino00)

## 🙏 Riconoscimenti

- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/)

---

⭐ Se questo progetto ti è stato utile, lascia una stella su GitHub!