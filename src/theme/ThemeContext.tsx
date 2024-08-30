// src/theme/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import {ColorValue, useColorScheme} from 'react-native';

export interface Theme {
  shadow: ColorValue | undefined;
  subText: ColorValue | undefined;
  background: ColorValue | undefined;
  text: ColorValue | undefined;
  textSecondary: ColorValue | undefined;
  primary: ColorValue | undefined;
  card: ColorValue | undefined;
  border: ColorValue | undefined;
  primaryBtn: ColorValue | undefined;
  SecondaryBtn: ColorValue | undefined;
  primaryText: ColorValue | undefined;
  primaryLightText: ColorValue | undefined;
  disable: ColorValue | undefined;
  white: ColorValue | undefined;
  light: ColorValue | undefined;
  error : ColorValue | undefined;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const LightTheme: Theme = {
  background: '#FFFFFF',
  text: '#1A1A1A',
  primaryText: '#FF8000',
  primaryLightText: '#FFF7EE',
  primary: '#FF8000',
  primaryBtn: '#FF8000',
  SecondaryBtn: '#FFF7EE',
  card: '#ffffff',
  border: '#DDDDDD',
  textSecondary: '#7C7D89',
  light: '#EBEBEB',
  disable: '#F6F6F6',
  white: '#fff',
  subText: '#8e8e93',
  shadow: '#8e8e93',
  error: '#FF4D4F',
};

const DarkTheme: Theme = {
  background: '#000000',
  text: '#FFFFFF',
  primaryText: '#FF8000',
  primaryLightText: '#333333',
  primary: '#FF8000',
  primaryBtn: '#FF8000',
  SecondaryBtn: '#FFF7EE',
  card: '#1F1F1F',
  border: '#333333',
  textSecondary: '#A1A1A1',
  light: '#EBEBEB',
  disable: '#3C3C3C',
  white: '#FFFFFF',
  subText: '#8e8e93',
  shadow: '#8e8e93',
  error:'#FF4D4F'
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  const theme = useMemo(
    () => (isDarkMode ? DarkTheme : LightTheme),
    [isDarkMode],
  );

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
