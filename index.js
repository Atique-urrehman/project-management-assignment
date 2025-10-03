import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Assuming this imports basic global styles
import App from './App';
import reportWebVitals from './reportWebVitals'; // Included in your structure

// Get the root element from the HTML
const container = document.getElementById('root');
const root = createRoot(container);

// Render the main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();