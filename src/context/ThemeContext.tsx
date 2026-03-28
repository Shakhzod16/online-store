import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type ThemeContextValue, type ThemeMode } from './theme-context';

const THEME_STORAGE_KEY = 'online-store-theme';

const getPreferredTheme = (): ThemeMode => {
	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	if (savedTheme === 'light' || savedTheme === 'dark') {
		return savedTheme;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeMode>(() => getPreferredTheme());

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleThemeChange = (event: MediaQueryListEvent) => {
			const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

			if (savedTheme === 'light' || savedTheme === 'dark') {
				return;
			}

			setTheme(event.matches ? 'dark' : 'light');
		};

		mediaQuery.addEventListener('change', handleThemeChange);
		return () => mediaQuery.removeEventListener('change', handleThemeChange);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			toggleTheme: () => setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light')),
		}),
		[theme],
	);

		return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
	};
