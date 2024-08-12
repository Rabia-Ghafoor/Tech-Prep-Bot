// app/layout.js
import './globals.css'; // Import your global styles here
import React from 'react';

export const metadata = {
  title: 'Customer Support Chat App',
  description: 'A chatbot for customer support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add additional <meta> tags here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
