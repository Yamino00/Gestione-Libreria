import React, { useState, useEffect } from 'react';
import type { Book } from '../types';

interface BookFormProps {
  onSubmit: (book: Omit<Book, 'id'> | Book) => void;
  book: Book | null;
}

export const BookForm: React.FC<BookFormProps> = ({ onSubmit, book }) => {
  const [formData, setFormData] = useState({
    titolo: '',
    autore: '',
    anno: '',
    genere: '',
    isbn: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        titolo: book.titolo,
        autore: book.autore,
        anno: book.anno.toString(),
        genere: book.genere,
        isbn: book.isbn,
      });
    } else {
        setFormData({ titolo: '', autore: '', anno: '', genere: '', isbn: '' });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      anno: parseInt(formData.anno, 10)
    };
    if (book) {
      onSubmit({ ...book, ...bookData });
    } else {
      onSubmit(bookData);
    }
  };

  const inputClass = "mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500/50 sm:text-sm transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="titolo" className="block text-sm font-medium text-slate-700">Titolo</label>
        <input type="text" name="titolo" id="titolo" value={formData.titolo} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="autore" className="block text-sm font-medium text-slate-700">Autore</label>
        <input type="text" name="autore" id="autore" value={formData.autore} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="anno" className="block text-sm font-medium text-slate-700">Anno</label>
        <input type="number" name="anno" id="anno" value={formData.anno} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="genere" className="block text-sm font-medium text-slate-700">Genere</label>
        <input type="text" name="genere" id="genere" value={formData.genere} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="isbn" className="block text-sm font-medium text-slate-700">ISBN</label>
        <input type="text" name="isbn" id="isbn" value={formData.isbn} onChange={handleChange} required className={inputClass} />
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-primary hover:bg-primary-focus text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          Salva
        </button>
      </div>
    </form>
  );
};