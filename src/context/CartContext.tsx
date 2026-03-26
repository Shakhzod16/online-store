import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, StoreProduct } from '../types/store';

interface CartContextValue {
	items: CartItem[];
	cartCount: number;
	cartTotal: number;
	addToCart: (product: StoreProduct, quantity?: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	removeFromCart: (productId: number) => void;
	clearCart: () => void;
}

const CART_STORAGE_KEY = 'online-store-cart';

const CartContext = createContext<CartContextValue | null>(null);

const getProductImage = (product: StoreProduct) => product.images[0] || product.category.image;

const getStoredCartItems = (): CartItem[] => {
	const savedCart = localStorage.getItem(CART_STORAGE_KEY);

	if (!savedCart) {
		return [];
	}

	try {
		const parsedCart = JSON.parse(savedCart) as CartItem[];
		return Array.isArray(parsedCart) ? parsedCart : [];
	} catch {
		localStorage.removeItem(CART_STORAGE_KEY);
		return [];
	}
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [items, setItems] = useState<CartItem[]>(() => getStoredCartItems());

	useEffect(() => {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
	}, [items]);

	useEffect(() => {
		const handleStorage = (event: StorageEvent) => {
			if (event.key !== CART_STORAGE_KEY) {
				return;
			}

			setItems(getStoredCartItems());
		};

		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	const value = useMemo<CartContextValue>(() => {
		const cartCount = items.length;
		const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

		return {
			items,
			cartCount,
			cartTotal,
			addToCart: (product, quantity = 1) => {
				setItems(currentItems => {
					const existingItem = currentItems.find(item => item.id === product.id);

					if (existingItem) {
						return currentItems.map(item =>
							item.id === product.id
								? { ...item, quantity: item.quantity + quantity }
								: item,
						);
					}

					return [
						...currentItems,
						{
							id: product.id,
							title: product.title,
							price: product.price,
							image: getProductImage(product),
							categoryName: product.category.name,
							quantity,
						},
					];
				});
			},
			updateQuantity: (productId, quantity) => {
				setItems(currentItems =>
					currentItems
						.map(item => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
						.filter(item => item.quantity > 0),
				);
			},
			removeFromCart: productId => {
				setItems(currentItems => currentItems.filter(item => item.id !== productId));
			},
			clearCart: () => setItems([]),
		};
	}, [items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useCart must be used within CartProvider');
	}

	return context;
};
