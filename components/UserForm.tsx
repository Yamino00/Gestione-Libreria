import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface UserFormProps {
  onSubmit: (user: Omit<User, 'id'> | User) => void;
  user: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    eta: '',
    genere: 'Maschio' as 'Maschio' | 'Femmina' | 'Altro',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        cognome: user.cognome,
        eta: user.eta.toString(),
        genere: user.genere,
      });
    } else {
        setFormData({ nome: '', cognome: '', eta: '', genere: 'Maschio' });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      eta: parseInt(formData.eta, 10),
    };
    if (user) {
      onSubmit({ ...user, ...userData });
    } else {
      onSubmit(userData);
    }
  };

  const inputClass = "mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-500/50 sm:text-sm transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome</label>
        <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="cognome" className="block text-sm font-medium text-slate-700">Cognome</label>
        <input type="text" name="cognome" id="cognome" value={formData.cognome} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="eta" className="block text-sm font-medium text-slate-700">Età</label>
        <input type="number" name="eta" id="eta" value={formData.eta} onChange={handleChange} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="genere" className="block text-sm font-medium text-slate-700">Genere</label>
        <select name="genere" id="genere" value={formData.genere} onChange={handleChange} className={inputClass}>
          <option>Maschio</option>
          <option>Femmina</option>
          <option>Altro</option>
        </select>
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-primary hover:bg-primary-focus text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          Salva
        </button>
      </div>
    </form>
  );
};