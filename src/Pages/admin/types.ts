export type Category = {
	id: number;
	name: string;
	image: string;
	productCount: number;
	description: string;
};

export type Order = {
	id: string;
	customer: string;
	total: string;
	status: 'Yangi' | 'Yetkazilmoqda' | 'Yakunlandi';
};

export type User = {
	id: number;
	fullName: string;
	email: string;
	role: 'admin' | 'user';
};

export type Product = {
	id: number;
	name: string;
	categoryId: number;
	price: number;
	stock: number;
};

export type AdminData = {
	categories: Category[];
	orders: Order[];
	users: User[];
	products: Product[];
};
