
import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-surface rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="h-72 w-full">
        {children}
      </div>
    </div>
  );
};
