import React, { useState } from 'react';
import type { LibraryData, User } from '../types';
import { Modal } from '../components/Modal';
import { UserForm } from '../components/UserForm';
import { PlusIcon } from '../components/icons/PlusIcon';
import { PencilIcon } from '../components/icons/PencilIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { UsersIcon } from '../components/icons/UsersIcon';

interface UsersViewProps {
  libraryData: LibraryData;
}

export const UsersView: React.FC<UsersViewProps> = ({ libraryData }) => {
  const { users, addUser, updateUser, deleteUser } = libraryData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (user: Omit<User, 'id'> | User) => {
    if ('id' in user) {
      updateUser(user);
    } else {
      addUser(user);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
       <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-5">
            <div className="flex-shrink-0 bg-gradient-to-br from-teal-400 to-accent-green p-4 rounded-2xl shadow-lg shadow-teal-200">
                <UsersIcon className="h-10 w-10 text-white" />
            </div>
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-accent-green to-emerald-600 bg-clip-text text-transparent">Anagrafica Utenti</h1>
                <p className="text-slate-500 mt-1 text-base">Gestisci i profili dei tuoi lettori, dalle nuove iscrizioni agli aggiornamenti.</p>
            </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-accent-green hover:bg-emerald-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center shadow-lg transition-all sm:self-center flex-shrink-0 w-full sm:w-auto"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Aggiungi Utente
        </button>
      </div>
      
      <div className="space-y-4">
          {users.length > 0 ? users.map(user => (
            <div key={user.id} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center border border-l-4 border-accent-green">
              <div>
                <p className="font-semibold text-slate-900 text-lg">{user.nome} {user.cognome}</p>
                <p className="text-sm text-slate-600">{user.eta} anni, {user.genere}</p>
              </div>
              <div className="flex space-x-2">
                 <button onClick={() => handleOpenModal(user)} className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-sky-600 hover:bg-sky-100 w-16" aria-label={`Modifica ${user.nome} ${user.cognome}`}>
                  <PencilIcon className="h-5 w-5" />
                  <span className="text-xs mt-1">Modifica</span>
                </button>
                <button onClick={() => deleteUser(user.id)} className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-100 w-16" aria-label={`Elimina ${user.nome} ${user.cognome}`}>
                  <TrashIcon className="h-5 w-5" />
                  <span className="text-xs mt-1">Elimina</span>
                </button>
              </div>
            </div>
          )) : (
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 text-center text-slate-500">
                <p>Nessun utente trovato. Inizia aggiungendone uno!</p>
            </div>
          )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingUser ? 'Modifica Utente' : 'Aggiungi Nuovo Utente'}>
        <UserForm onSubmit={handleSaveUser} user={editingUser} />
      </Modal>
    </div>
  );
};