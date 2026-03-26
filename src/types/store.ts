export interface StoreCategory {
	id: number;
	name: string;
	image: string;
	slug: string;
}

export interface StoreProduct {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	category: StoreCategory;
}

export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	categoryName: string;
	quantity: number;
}
