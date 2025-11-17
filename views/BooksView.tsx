import React, { useState } from 'react';
import type { LibraryData, Book } from '../types';
import { Modal } from '../components/Modal';
import { BookForm } from '../components/BookForm';
import { PlusIcon } from '../components/icons/PlusIcon';
import { PencilIcon } from '../components/icons/PencilIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { BookIcon } from '../components/icons/BookIcon';

interface BooksViewProps {
  libraryData: LibraryData;
}

export const BooksView: React.FC<BooksViewProps> = ({ libraryData }) => {
  const { books, addBook, updateBook, deleteBook } = libraryData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleOpenModal = (book: Book | null = null) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBook(null);
    setIsModalOpen(false);
  };

  const handleSaveBook = (book: Omit<Book, 'id'> | Book) => {
    if ('id' in book) {
      updateBook(book);
    } else {
      addBook(book);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-5">
          <div className="flex-shrink-0 bg-gradient-to-br from-sky-400 to-primary p-4 rounded-2xl shadow-lg shadow-sky-200">
            <BookIcon className="h-10 w-10 text-white" />
          </div>
          <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Catalogo Libri</h1>
              <p className="text-slate-500 mt-1 text-base">Sfoglia, aggiungi e gestisci ogni libro della tua collezione.</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-cyan-400 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center shadow-lg transition-all sm:self-center flex-shrink-0 w-full sm:w-auto"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Aggiungi Libro
        </button>
      </div>
      
      <div className="space-y-4">
          {books.length > 0 ? books.map(book => (
            <div key={book.id} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border border-l-4 border-primary">
              <div>
                <p className="font-semibold text-slate-900 text-lg">{book.titolo}</p>
                <p className="text-sm text-slate-600">{book.autore} ({book.anno})</p>
                <p className="text-sm font-medium text-primary">{book.genere}</p>
                <p className="text-xs text-slate-400 mt-1">ISBN: {book.isbn}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleOpenModal(book)} className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-sky-600 hover:bg-sky-100 w-16" aria-label={`Modifica ${book.titolo}`}>
                  <PencilIcon className="h-5 w-5" />
                  <span className="text-xs mt-1">Modifica</span>
                </button>
                <button onClick={() => deleteBook(book.id)} className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-100 w-16" aria-label={`Elimina ${book.titolo}`}>
                  <TrashIcon className="h-5 w-5" />
                  <span className="text-xs mt-1">Elimina</span>
                </button>
              </div>
            </div>
          )) : (
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 text-center text-slate-500">
                <p>Nessun libro trovato. Inizia aggiungendone uno!</p>
            </div>
          )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingBook ? 'Modifica Libro' : 'Aggiungi Nuovo Libro'}>
        <BookForm onSubmit={handleSaveBook} book={editingBook} />
      </Modal>
    </div>
  );
};