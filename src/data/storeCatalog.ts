import type { StoreProduct } from '../types/store';

export const storeProducts: StoreProduct[] = [
	{
		id: 1,
		title: "Klassik ko'ylak",
		price: 89,
		description: "Yumshoq matodan tikilgan, kundalik va ofis uslubi uchun mos klassik ko'ylak.",
		images: [
			'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 1,
			name: 'Kiyimlar',
			image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80',
			slug: 'kiyimlar',
		},
	},
	{
		id: 2,
		title: 'Yozgi futbolka',
		price: 49,
		description: "Issiq kunlar uchun nafas oladigan matoli, yengil va zamonaviy futbolka.",
		images: [
			'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 1,
			name: 'Kiyimlar',
			image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
			slug: 'kiyimlar',
		},
	},
	{
		id: 3,
		title: 'Sport krasovka',
		price: 129,
		description: "Har kuni yurish va mashg'ulotlar uchun qulay taglikka ega sport krasovka.",
		images: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 2,
			name: 'Poyabzallar',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
			slug: 'poyabzallar',
		},
	},
	{
		id: 4,
		title: 'Charm tufli',
		price: 149,
		description: "Klassik ko'rinish va mustahkam charm bilan tayyorlangan premium tufli.",
		images: [
			'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 2,
			name: 'Poyabzallar',
			image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
			slug: 'poyabzallar',
		},
	},
	{
		id: 5,
		title: 'Smart soat',
		price: 199,
		description: "Kunlik faollik, yurak urishi va bildirishnomalarni kuzatadigan aqlli soat.",
		images: [
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 3,
			name: 'Aksessuarlar',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
			slug: 'aksessuarlar',
		},
	},
	{
		id: 6,
		title: 'Sayohat sumkasi',
		price: 119,
		description: "Safarlar uchun keng sig'imli, yengil va suvga chidamli sumka.",
		images: [
			'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 3,
			name: 'Aksessuarlar',
			image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
			slug: 'aksessuarlar',
		},
	},
	{
		id: 7,
		title: 'Bluetooth quloqchin',
		price: 159,
		description: "Sifatli ovoz, shovqinni pasaytirish va uzoq batareya bilan quloqchin.",
		images: [
			'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 4,
			name: 'Elektronika',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
			slug: 'elektronika',
		},
	},
	{
		id: 8,
		title: 'Mini kolonka',
		price: 139,
		description: "Kichik o'lchamdagi, ammo kuchli ovoz beruvchi portativ bluetooth kolonka.",
		images: [
			'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 4,
			name: 'Elektronika',
			image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
			slug: 'elektronika',
		},
	},
	{
		id: 9,
		title: 'Yoga gilami',
		price: 59,
		description: "Sirpanmaydigan yuzaga ega, mashg'ulotlar uchun qulay yoga gilami.",
		images: [
			'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 5,
			name: 'Sport',
			image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
			slug: 'sport',
		},
	},
	{
		id: 10,
		title: 'Sport butilka',
		price: 24,
		description: "Mashg'ulot va sayohatlar uchun mustahkam, qayta ishlatiladigan sport butilka.",
		images: [
			'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 5,
			name: 'Sport',
			image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
			slug: 'sport',
		},
	},
	{
		id: 11,
		title: 'Oshxona blenderi',
		price: 179,
		description: "Kokteyl, pyure va souslar uchun bir necha tezlikli oshxona blenderi.",
		images: [
			'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1585515656473-fb4d9b95afec?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 6,
			name: "Uy-ro'zg'or",
			image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',
			slug: 'uy-rozgor',
		},
	},
	{
		id: 12,
		title: 'Dekor chiroq',
		price: 69,
		description: "Uy interyeriga iliq va zamonaviy kayfiyat beradigan dekorativ chiroq.",
		images: [
			'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
			'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80',
		],
		category: {
			id: 6,
			name: "Uy-ro'zg'or",
			image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
			slug: 'uy-rozgor',
		},
	},
];

export const getStoreProductById = (productId: number) =>
	storeProducts.find(product => product.id === productId) ?? null;
