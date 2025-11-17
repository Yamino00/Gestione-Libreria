
import type { User, Book, Loan } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', nome: 'Mario', cognome: 'Rossi', genere: 'Maschio', eta: 34 },
  { id: 'u2', nome: 'Giulia', cognome: 'Bianchi', genere: 'Femmina', eta: 28 },
  { id: 'u3', nome: 'Luca', cognome: 'Verdi', genere: 'Maschio', eta: 45 },
];

export const MOCK_BOOKS: Book[] = [
  { id: 'b1', titolo: 'Il Signore degli Anelli', autore: 'J.R.R. Tolkien', anno: 1954, genere: 'Fantasy', isbn: '978-8845279294' },
  { id: 'b2', titolo: '1984', autore: 'George Orwell', anno: 1949, genere: 'Distopico', isbn: '978-8804668229' },
  { id: 'b3', titolo: 'Cronache del ghiaccio e del fuoco', autore: 'George R.R. Martin', anno: 1996, genere: 'Fantasy', isbn: '978-8804680436' },
  { id: 'b4', titolo: 'Il nome della rosa', autore: 'Umberto Eco', anno: 1980, genere: 'Romanzo Storico', isbn: '978-8845244520' },
];

export const MOCK_LOANS: Loan[] = [
  { id: 'l1', userId: 'u1', bookId: 'b2', dataPrestito: '2023-10-15T10:00:00Z', dataRestituzione: '2023-11-01T12:00:00Z' },
  { id: 'l2', userId: 'u2', bookId: 'b3', dataPrestito: '2023-11-05T15:30:00Z', dataRestituzione: null },
  { id: 'l3', userId: 'u1', bookId: 'b4', dataPrestito: '2023-11-10T09:00:00Z', dataRestituzione: null },
];
