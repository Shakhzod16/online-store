import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

import { HashRouter } from 'react-router-dom';

import 'rodal/lib/rodal.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter>
			<ThemeProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</ThemeProvider>
		</HashRouter>
	</React.StrictMode>,
);
