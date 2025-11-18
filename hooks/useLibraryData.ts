
import { useState, useEffect } from 'react';
import type { User, Book, Loan, LibraryData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const useLibraryData = (): LibraryData => {
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  // Fetch initial data
  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchLoans();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data.map((u: any) => ({ ...u, id: u._id })));
    } catch (error) {
      console.error('Errore nel recupero degli utenti:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      const data = await response.json();
      setBooks(data.map((b: any) => ({ ...b, id: b._id })));
    } catch (error) {
      console.error('Errore nel recupero dei libri:', error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch(`${API_URL}/loans`);
      const data = await response.json();
      setLoans(data.map((l: any) => ({ 
        ...l, 
        id: l._id,
        userId: l.userId._id || l.userId,
        bookId: l.bookId._id || l.bookId
      })));
    } catch (error) {
      console.error('Errore nel recupero dei prestiti:', error);
    }
  };

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const newUser = await response.json();
      setUsers(prev => [...prev, { ...newUser, id: newUser._id }]);
    } catch (error) {
      console.error('Errore nell\'aggiunta dell\'utente:', error);
    }
  };

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`${API_URL}/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const updated = await response.json();
      setUsers(prev => prev.map(user => user.id === updatedUser.id ? { ...updated, id: updated._id } : user));
    } catch (error) {
      console.error('Errore nell\'aggiornamento dell\'utente:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(user => user.id !== userId));
      setLoans(prev => prev.filter(loan => loan.userId !== userId));
    } catch (error) {
      console.error('Errore nell\'eliminazione dell\'utente:', error);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
      const newBook = await response.json();
      setBooks(prev => [...prev, { ...newBook, id: newBook._id }]);
    } catch (error) {
      console.error('Errore nell\'aggiunta del libro:', error);
    }
  };

  const updateBook = async (updatedBook: Book) => {
    try {
      const response = await fetch(`${API_URL}/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });
      const updated = await response.json();
      setBooks(prev => prev.map(book => book.id === updatedBook.id ? { ...updated, id: updated._id } : book));
    } catch (error) {
      console.error('Errore nell\'aggiornamento del libro:', error);
    }
  };

  const deleteBook = async (bookId: string) => {
    try {
      await fetch(`${API_URL}/books/${bookId}`, { method: 'DELETE' });
      setBooks(prev => prev.filter(book => book.id !== bookId));
      setLoans(prev => prev.filter(loan => loan.bookId !== bookId));
    } catch (error) {
      console.error('Errore nell\'eliminazione del libro:', error);
    }
  };

  const addLoan = async (loan: Omit<Loan, 'id' | 'dataRestituzione' | 'dataPrestito'>) => {
    try {
      const response = await fetch(`${API_URL}/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loan)
      });
      const newLoan = await response.json();
      setLoans(prev => [...prev, { 
        ...newLoan, 
        id: newLoan._id,
        userId: newLoan.userId._id || newLoan.userId,
        bookId: newLoan.bookId._id || newLoan.bookId
      }]);
    } catch (error) {
      console.error('Errore nell\'aggiunta del prestito:', error);
    }
  };

  const returnLoan = async (loanId: string) => {
    try {
      const response = await fetch(`${API_URL}/loans/${loanId}/return`, {
        method: 'PUT'
      });
      const updated = await response.json();
      setLoans(prev => prev.map(loan => 
        loan.id === loanId ? { 
          ...updated, 
          id: updated._id,
          userId: updated.userId._id || updated.userId,
          bookId: updated.bookId._id || updated.bookId
        } : loan
      ));
    } catch (error) {
      console.error('Errore nella restituzione del libro:', error);
    }
  };
    
  const deleteLoan = async (loanId: string) => {
    try {
      await fetch(`${API_URL}/loans/${loanId}`, { method: 'DELETE' });
      setLoans(prev => prev.filter(loan => loan.id !== loanId));
    } catch (error) {
      console.error('Errore nell\'eliminazione del prestito:', error);
    }
  };

  return { 
    users, books, loans, 
    addUser, updateUser, deleteUser,
    addBook, updateBook, deleteBook,
    addLoan, returnLoan, deleteLoan
  };
};