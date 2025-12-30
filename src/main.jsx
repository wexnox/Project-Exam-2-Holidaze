import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import AuthProvider from './components/context/AuthProvider.jsx';
import { SettingsProvider } from './components/context/SettingsProvider.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
