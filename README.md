# MediManager Frontend

A React-based frontend for a medical store management system, built with Vite, TypeScript, and Tailwind CSS. Integrates with a Spring Boot backend API to manage medicines and billing.

## Features
- View, add, edit, and delete medicines
- Filter medicines by name, low stock, or expiring soon
- Create bills with dynamic total calculation
- View bill history and details
- Responsive design with Tailwind CSS
- Notifications with React Toastify

## Prerequisites
- Node.js (v18 or higher)
- Backend API running at `http://localhost:8080`

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser

## Dependencies
- React
- React Router
- Axios
- React Toastify
- Tailwind CSS
- Lucide React (icons)
- date-fns (date utilities)

## Folder Structure
- `src/components`: Reusable UI components
- `src/pages`: Page components
- `src/lib`: API utilities and types
- `src/styles`: Global styles and Tailwind configuration