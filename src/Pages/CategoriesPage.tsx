import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../assets/components/Footer';
import Header from '../assets/components/Header';
import type { StoreProduct } from '../types/store';

const PRODUCTS_API = 'https://api.escuelajs.co/api/v1/products';

const getProductImage = (product: StoreProduct) =>
	product.images[0] || product.category.image;

const CategoriesPage = () => {
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

				setError("Kategoriyalarni yuklab bo'lmadi.");
			} finally {
				setIsLoading(false);
			}
		};

		void loadProducts();

		return () => controller.abort();
	}, []);

	const categories = useMemo(
		() =>
			Array.from(
				products.reduce(
					(map, product) => {
						const existing = map.get(product.category.id);

						if (existing) {
							existing.count += 1;
							return map;
						}

						map.set(product.category.id, {
							id: product.category.id,
							title: product.category.name,
							count: 1,
							image: getProductImage(product),
						});

						return map;
					},
					new Map<
						number,
						{ id: number; title: string; count: number; image: string }
					>(),
				),
			).map(([, category]) => category),
		[products],
	);

	return (
		<div className='min-h-screen w-full bg-[#fbfaf8]'>
			<Header />

			<main className='mx-auto max-w-430 px-4 pt-32 pb-16 sm:px-8 lg:px-24'>
				<h1 className='text-4xl font-semibold tracking-tight text-[#221713] sm:text-5xl'>
					Kategoriyalar
				</h1>

				{error ? (
					<div className='mt-10 rounded-2xl border border-[#eadfce] bg-[#fff7ef] px-6 py-5 text-lg text-[#8d5d22]'>
						{error}
					</div>
				) : isLoading ? (
					<div className='mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className='min-h-[320px] animate-pulse rounded-[24px] bg-[#ece5de]'
							/>
						))}
					</div>
				) : (
					<div className='mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
						{categories.map(category => (
							<Link
								key={category.id}
								to={`/products?category=${encodeURIComponent(category.title)}`}
								className='group relative block min-h-[320px] overflow-hidden rounded-[24px]'>
								<img
									src={category.image}
									alt={category.title}
									className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>

								<div className='absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent' />

								<div className='absolute right-0 bottom-0 left-0 p-5 text-white sm:p-7'>
									<h2 className='text-3xl font-semibold tracking-tight'>
										{category.title}
									</h2>
									<p className='mt-2 text-lg text-white/85'>
										{category.count} mahsulot
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
};

export default CategoriesPage;
