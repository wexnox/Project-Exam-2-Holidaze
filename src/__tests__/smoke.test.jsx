import { render, screen } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import App from '../App.jsx';
import AuthProvider from '../components/context/AuthProvider.jsx';
import { SettingsProvider } from '../components/context/SettingsProvider.jsx';

describe('Smoke', () => {
  test('testing framework is wired', () => {
    expect(true).toBe(true);
  });

  test('can render app without crashing', () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <MemoryRouter>
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </MemoryRouter>
        </AuthProvider>
      </HelmetProvider>,
    );
  });
});
