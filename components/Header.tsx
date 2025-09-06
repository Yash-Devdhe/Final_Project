
import React from 'react';
import { UploadIcon, DownloadIcon, GeminiLogo } from './icons';

interface HeaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
  const handleDownload = () => {
    alert('Report download initiated! (This is a demo feature)');
  };

  return (
    <header className="bg-surface/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border p-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GeminiLogo className="h-8 w-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            E-Commerce Analytics
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-primary/20 text-primary hover:bg-primary/30 font-semibold py-2 px-3 sm:px-4 rounded-lg text-sm transition-all duration-300 flex items-center gap-2"
          >
            <UploadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Upload Data</span>
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={onFileUpload} accept=".csv, .json, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
          
          <button
            onClick={handleDownload}
            className="bg-secondary/20 text-secondary hover:bg-secondary/30 font-semibold py-2 px-3 sm:px-4 rounded-lg text-sm transition-all duration-300 flex items-center gap-2"
          >
            <DownloadIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
