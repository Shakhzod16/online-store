import { createContext } from 'react';
import type { CartItem, StoreProduct } from '../types/store';

export interface CartContextValue {
	items: CartItem[];
	cartCount: number;
	cartTotal: number;
	addToCart: (product: StoreProduct, quantity?: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	removeFromCart: (productId: number) => void;
	clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
