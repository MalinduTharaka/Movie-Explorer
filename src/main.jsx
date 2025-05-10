// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeModeProvider, ThemeModeContext } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';

function AppWrapper() {
  return (
    <ThemeModeProvider>
      <ThemeModeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <MovieProvider>
                <App />
              </MovieProvider>
            </BrowserRouter>
          </ThemeProvider>
        )}
      </ThemeModeContext.Consumer>
    </ThemeModeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);
