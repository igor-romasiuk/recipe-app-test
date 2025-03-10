import React, { useRef } from 'react';

interface SearchBarProps {
  inputValue: string;
  isSearching: boolean;
  isFetching: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  isSearching,
  isFetching,
  onSearchChange,
  onSearchClear,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-1 relative">
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          value={inputValue}
          placeholder="Search recipes..."
          onChange={onSearchChange}
          className="w-full p-3 pl-10 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {inputValue && (
          <button
            onClick={onSearchClear}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      {(isSearching || isFetching) && (
        <div className="absolute right-14 top-3.5">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
        </div>
      )}
    </div>
  );
}; 