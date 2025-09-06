
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  changeUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeUp }) => {
  const changeColor = changeUp === undefined ? 'text-text-secondary' : changeUp ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-surface rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        {changeUp !== undefined && (
          <div className={`flex items-center text-sm font-medium ${changeColor}`}>
            {changeUp ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">{value}</h3>
        <p className="text-sm text-text-secondary mt-1">{title}</p>
      </div>
    </div>
  );
};
