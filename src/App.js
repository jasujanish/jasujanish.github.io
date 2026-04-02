import './App.css';
import React from 'react';
import { Link } from "react-router-dom";
import { createHashRouter, RouterProvider } from 'react-router-dom';
import NishchayPage from './components/nishchay_page.js';

// Not found page (in case of invalid route)
function NotFoundPage() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-fade text-stone-800 p-8">
    <Link
      to="/"
      className="text-stone-800 hover:text-blue-800 hover:cursor-pointer transition-all duration-300 text-[clamp(2rem,8vw,5rem)]"
    >          
          Page Not Found <br></br>
          Return Home
        </Link>
    </div>
  );
}

export default function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <NishchayPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },

  ]);
  return (<RouterProvider router={router} />);
}
