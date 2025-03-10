import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-orange-100 border-t border-orange-200">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-orange-800">
          Recipe Book © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}; 