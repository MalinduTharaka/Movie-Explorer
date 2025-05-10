// src/context/ThemeContext.jsx
import { createContext, useState, useMemo } from 'react';
import { getTheme } from '../styles/theme';

export const ThemeModeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}
