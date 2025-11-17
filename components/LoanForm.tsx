import React, { useState } from 'react';
import type { User, Book } from '../types';

interface LoanFormProps {
  users: User[];
  availableBooks: Book[];
  onSubmit: (loanData: { userId: string; bookId: string }) => void;
}

export const LoanForm: React.FC<LoanFormProps> = ({ users, availableBooks, onSubmit }) => {
  const [userId, setUserId] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && bookId) {
      onSubmit({ userId, bookId });
    } else {
      alert("Seleziona sia un utente che un libro.");
    }
  };
  
  const selectClass = "mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500/50 sm:text-sm transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-slate-700">Utente</label>
        <select
          id="user"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className={selectClass}
        >
          <option value="">Seleziona un utente</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nome} {user.cognome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="book" className="block text-sm font-medium text-slate-700">Libro Disponibile</label>
        <select
          id="book"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
          className={selectClass}
          disabled={availableBooks.length === 0}
        >
          <option value="">{availableBooks.length > 0 ? 'Seleziona un libro' : 'Nessun libro disponibile'}</option>
          {availableBooks.map(book => (
            <option key={book.id} value={book.id}>
              {book.titolo}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-primary hover:bg-primary-focus text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!userId || !bookId}>
          Crea Prestito
        </button>
      </div>
    </form>
  );
};