import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* root component */}
    <App />
    {/* other components are sidenav header footer etc. */}
    {/* and all the other components reside in the root component */}
    {/* and then the root component is put inside the div with the id of root. */}
  </React.StrictMode>
);

reportWebVitals();
