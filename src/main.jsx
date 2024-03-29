import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext.jsx';
import { SettingsContextProvider } from './components/context/SettingsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <SettingsContextProvider>
                    <App />
                </SettingsContextProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>,
);
