# Recipe App

A modern, responsive web application for discovering and managing recipes. Built with React, TypeScript, and TheMealDB API.

## 🌐 Live Demo

Check out the live application: [Recipe App](https://recipe-app-test-phi.vercel.app/)

## 🌟 Features

- **Recipe Discovery**
  - Browse through a vast collection of recipes
  - View detailed recipe information including ingredients and instructions
  - Filter recipes by category
  - Responsive grid layout for optimal viewing on any device

- **Search & Filter**
  - Debounced search functionality for efficient API calls
  - Category-based filtering
  - Combine search with category filters

- **Pagination & Display Options**
  - Customizable recipes per page (8, 12, 16, or 24 recipes)
  - Intuitive pagination interface
  - Smooth transitions between pages

- **Favorites Management**
  - Save your favorite recipes
  - View all favorites in one place
  - Calculate combined ingredients for multiple recipes
  - View cooking instructions for all saved recipes

## 🛠️ Technologies

- **Frontend Framework**: React with TypeScript
- **State Management**: TanStack Query (React Query)
- **Styling**: 
  - Tailwind CSS
  - React Select for dropdowns
  - Custom animations and transitions
- **API**: TheMealDB
- **Other Libraries**:
  - React Router for navigation
  - Lodash for debouncing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/igor-romasiuk/recipe-app-test
   cd recipe-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📱 Pages

### 1. Recipe List (Home)
- Grid display of all recipes
- Search and filter functionality
- Customizable pagination
- Quick access to recipe details

### 2. Recipe Details
- Comprehensive recipe information
- Ingredients list with measurements
- Step-by-step cooking instructions
- Add/remove from favorites

### 3. Favorites
- Collection of saved recipes
- Combined ingredients calculator
- Aggregated cooking instructions
- Quick recipe management
