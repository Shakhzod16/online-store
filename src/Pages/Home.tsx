import { useEffect, useState } from 'react';
import Banner from '../assets/components/Banner';
import Categorys from '../assets/components/Categorys';
import Footer from '../assets/components/Footer';
import Header from '../assets/components/Header';
import Hero from '../assets/components/Hero';
import Products from '../assets/components/Products';
import type { StoreProduct } from '../types/store';

const PRODUCTS_API = 'https://api.escuelajs.co/api/v1/products';

const Home = () => {
	const [products, setProducts] = useState<StoreProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const controller = new AbortController();

		const loadProducts = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await fetch(PRODUCTS_API, {
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error(`Request failed: ${response.status}`);
				}

				const data: StoreProduct[] = await response.json();
				setProducts(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}

				setError("Mahsulotlarni yuklab bo'lmadi.");
			} finally {
				setIsLoading(false);
			}
		};

		void loadProducts();

		return () => controller.abort();
	}, []);

	return (
		<div className='w-full bg-[#fbfaf8]'>
			<Header />

			<main className='w-full pt-26.5'>
				<Hero />

				<div className='mx-auto max-w-430 px-4 py-12 sm:px-8 lg:px-24'>
					<Categorys products={products} isLoading={isLoading} error={error} />
					<Products products={products} isLoading={isLoading} error={error} />
					<Banner />
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Home;
