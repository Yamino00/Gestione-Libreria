# Backend per Sistema di Gestione Libreria

Backend API REST per il sistema di gestione libreria, costruito con Express.js, TypeScript e MongoDB Atlas.

## 🚀 Setup

### 1. Installa le dipendenze
```bash
npm install
```

### 2. Configura MongoDB Atlas

1. Crea un account su [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuovo cluster
3. Crea un database user con password
4. Ottieni la connection string
5. Configura il file `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/libreria?retryWrites=true&w=majority
```

Sostituisci `username`, `password` e `cluster` con i tuoi dati.

### 3. Avvia il server

**Modalità sviluppo:**
```bash
npm run dev
```

**Build per produzione:**
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Users
- `GET /api/users` - Ottieni tutti gli utenti
- `POST /api/users` - Crea nuovo utente
- `PUT /api/users/:id` - Aggiorna utente
- `DELETE /api/users/:id` - Elimina utente

### Books
- `GET /api/books` - Ottieni tutti i libri
- `POST /api/books` - Crea nuovo libro
- `PUT /api/books/:id` - Aggiorna libro
- `DELETE /api/books/:id` - Elimina libro

### Loans
- `GET /api/loans` - Ottieni tutti i prestiti
- `POST /api/loans` - Crea nuovo prestito
- `PUT /api/loans/:id/return` - Segna libro come restituito
- `DELETE /api/loans/:id` - Elimina prestito

### Health Check
- `GET /api/health` - Verifica stato del server

## 🏗️ Struttura

```
backend/
├── src/
│   ├── controllers/    # Logica di business
│   ├── models/        # Schema MongoDB/Mongoose
│   ├── routes/        # Definizione routes
│   └── server.ts      # Entry point
├── .env              # Configurazione
├── package.json
└── tsconfig.json
```

## 🔧 Tecnologie

- **Express.js** - Framework web
- **TypeScript** - Type safety
- **Mongoose** - ODM per MongoDB
- **CORS** - Cross-origin requests
- **dotenv** - Gestione variabili ambiente
