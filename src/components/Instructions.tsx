import React from 'react';

interface InstructionsProps {
  instructions: string;
}

export const Instructions: React.FC<InstructionsProps> = ({ instructions }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Instructions
      </h2>
      <div className="space-y-4">
        {instructions.split('\r\n').filter(Boolean).map((step, index) => (
          <div key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 