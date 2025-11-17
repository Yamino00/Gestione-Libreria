import React, { useState } from 'react';
import type { LibraryData, Loan } from '../types';
import { Modal } from '../components/Modal';
import { LoanForm } from '../components/LoanForm';
import { PlusIcon } from '../components/icons/PlusIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { CollectionIcon } from '../components/icons/CollectionIcon';

interface LoansViewProps {
  libraryData: LibraryData;
}

export const LoansView: React.FC<LoansViewProps> = ({ libraryData }) => {
  const { loans, users, books, addLoan, returnLoan } = libraryData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBookTitle = (bookId: string) => books.find(b => b.id === bookId)?.titolo || 'Libro non trovato';
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.nome} ${user.cognome}` : 'Utente non trovato';
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });

  const availableBooks = books.filter(book => !loans.some(loan => loan.bookId === book.id && loan.dataRestituzione === null));

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-5">
            <div className="flex-shrink-0 bg-gradient-to-br from-amber-400 to-accent-amber p-4 rounded-2xl shadow-lg shadow-amber-200">
              <CollectionIcon className="h-10 w-10 text-white" />
            </div>
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-accent-amber to-red-500 bg-clip-text text-transparent">Registro Prestiti</h1>
                <p className="text-slate-500 mt-1 text-base">Monitora tutti i libri in prestito e registra le restituzioni con un click.</p>
            </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent-amber hover:bg-red-500 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center shadow-lg transition-all sm:self-center flex-shrink-0 w-full sm:w-auto"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuovo Prestito
        </button>
      </div>

      <div className="space-y-4">
          {loans.length > 0 ? [...loans].reverse().map(loan => (
            <div key={loan.id} className={`bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-l-4 ${loan.dataRestituzione ? 'border-emerald-500' : 'border-amber-400'}`}>
              <div className="flex-grow">
                <p className="font-semibold text-slate-900 text-lg">{getBookTitle(loan.bookId)}</p>
                <p className="text-sm text-slate-600">Prestato a: <span className="font-medium">{getUserName(loan.userId)}</span></p>
                <p className="text-xs text-slate-500 mt-1">
                  Data: {formatDate(loan.dataPrestito)} - {loan.dataRestituzione ? `Restituito: ${formatDate(loan.dataRestituzione)}` : <span className="font-semibold text-amber-600">In corso</span>}
                </p>
              </div>
              {!loan.dataRestituzione && (
                <button
                  onClick={() => returnLoan(loan.id)}
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-semibold py-2 px-3 rounded-lg flex items-center text-sm transition-all shadow-sm hover:shadow-md mt-2 sm:mt-0 self-start sm:self-center"
                  aria-label={`Segna come restituito il libro ${getBookTitle(loan.bookId)}`}
                >
                  <CheckCircleIcon className="h-5 w-5 mr-1.5"/>
                  Restituisci
                </button>
              )}
            </div>
          )) : (
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 text-center text-slate-500">
                <p>Nessun prestito registrato.</p>
            </div>
          )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registra Nuovo Prestito">
        <LoanForm
          users={users}
          availableBooks={availableBooks}
          onSubmit={(loanData) => {
            addLoan(loanData);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};