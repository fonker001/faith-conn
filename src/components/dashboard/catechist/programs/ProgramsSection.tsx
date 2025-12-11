'use client';

import { CatechismProgram } from '../types';
import ProgramCard from './ProgramCard';
import { useState } from 'react';

export default function ProgramsSection({ programs }: { programs: CatechismProgram[] }) {
  const [programsList, setProgramsList] = useState(programs);

  const handleDelete = (id: string) => {
    // In real app: call API to delete
    console.log('Deleting program:', id);
    setProgramsList(prev => prev.filter(p => p.id !== id));
  };

  if (programsList.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No programs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {programsList.map((program) => (
        <ProgramCard 
          key={program.id} 
          program={program} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
}