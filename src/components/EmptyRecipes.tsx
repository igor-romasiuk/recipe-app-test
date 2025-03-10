import React from 'react';
import { motion } from 'framer-motion';

interface EmptyRecipesProps {
  searchQuery: string;
  selectedCategory: string;
}

export const EmptyRecipes: React.FC<EmptyRecipesProps> = ({
  searchQuery,
  selectedCategory,
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-16 w-16 text-gray-400 mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </motion.svg>
      <motion.h3 
        className="text-xl font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        No recipes found
      </motion.h3>
      <motion.p 
        className="text-gray-600 text-center max-w-md px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {searchQuery 
          ? `No recipes found for "${searchQuery}"${selectedCategory ? ` in ${selectedCategory}` : ''}`
          : "Try adjusting your search or filter to find what you're looking for"}
      </motion.p>
    </motion.div>
  );
}; 