import React, { useMemo } from 'react';
import type { LibraryData } from '../types';
import { BookIcon } from '../components/icons/BookIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { CollectionIcon } from '../components/icons/CollectionIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  libraryData: LibraryData;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    iconWrapperClass: string;
    borderClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconWrapperClass, borderClass }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-5 border border-l-4 ${borderClass}`}>
        <div className={`p-4 rounded-xl shadow-lg ${iconWrapperClass}`}>{icon}</div>
        <div>
            <p className="text-base font-medium text-slate-500">{title}</p>
            <p className="text-4xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

export const DashboardView: React.FC<DashboardViewProps> = ({ libraryData }) => {
  const { users, books, loans } = libraryData;
  
  const activeLoans = loans.filter(loan => loan.dataRestituzione === null).length;

  const loansByMonth = useMemo(() => {
    const months: { [key: string]: number } = {};
    const sortedLoans = [...loans].sort((a, b) => new Date(a.dataPrestito).getTime() - new Date(b.dataPrestito).getTime());
    
    sortedLoans.forEach(loan => {
      // Fix: Corrected a typo where 'a' was used instead of 'loan' to access 'dataPrestito'.
      const month = new Date(loan.dataPrestito).toLocaleString('it-IT', { month: 'short', year: '2-digit' });
      if (!months[month]) {
        months[month] = 0;
      }
      months[month]++;
    });
    return Object.entries(months).map(([name, value]) => ({ name, prestiti: value })).slice(-6);
  }, [loans]);

  return (
    <div className="space-y-10">
      <div className="pb-6 border-b border-slate-200">
          <div className="flex items-center gap-5">
              <div className="flex-shrink-0 bg-gradient-to-br from-sky-600 to-sky-800 p-4 rounded-2xl shadow-lg shadow-sky-200">
                <ChartBarIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                  <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-800 to-sky-900 bg-clip-text text-transparent">Dashboard</h1>
                  <p className="text-slate-500 mt-1 text-base">Una panoramica completa e in tempo reale dello stato della tua libreria.</p>
              </div>
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Libri Totali" value={books.length} icon={<BookIcon className="h-8 w-8 text-white" />} iconWrapperClass="bg-gradient-to-br from-sky-400 to-primary" borderClass="border-primary"/>
        <StatCard title="Utenti Registrati" value={users.length} icon={<UsersIcon className="h-8 w-8 text-white" />} iconWrapperClass="bg-gradient-to-br from-teal-400 to-accent-green" borderClass="border-accent-green"/>
        <StatCard title="Prestiti Attivi" value={activeLoans} icon={<CollectionIcon className="h-8 w-8 text-white" />} iconWrapperClass="bg-gradient-to-br from-amber-400 to-accent-amber" borderClass="border-accent-amber"/>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Prestiti Mensili (Ultimi 6 Mesi)</h3>
        {loansByMonth.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loansByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
              <YAxis allowDecimals={false} tick={{ fill: '#64748b' }} />
              <Tooltip cursor={{fill: 'rgba(249, 115, 22, 0.1)'}} contentStyle={{backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.75rem'}} />
              <Bar dataKey="prestiti" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-slate-500 py-10">Nessun dato sui prestiti disponibile per il grafico.</p>
        )}
      </div>

    </div>
  );
};