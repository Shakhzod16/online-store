import { useEffect, useMemo, useState } from 'react';
import { FaHeart, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../assets/components/Footer';
import Header from '../assets/components/Header';
import type { StoreProduct } from '../types/store';

const PRODUCTS_API = 'https://api.escuelajs.co/api/v1/products';

const formatPrice = (price: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(price);

const getProductImage = (product: StoreProduct) =>
	product.images[0] || product.category.image;

const ProductsPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [products, setProducts] = useState<StoreProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(
		searchParams.get('category') || 'all',
	);
	const [priceLimit, setPriceLimit] = useState(0);

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

	const maxPrice = useMemo(() => {
		if (products.length === 0) {
			return 0;
		}

		return Math.max(...products.map(product => product.price));
	}, [products]);

	useEffect(() => {
		if (maxPrice > 0) {
			setPriceLimit(current => (current === 0 ? maxPrice : Math.min(current, maxPrice)));
		}
	}, [maxPrice]);

	const categories = useMemo(
		() => Array.from(new Set(products.map(product => product.category.name))),
		[products],
	);

	useEffect(() => {
		const categoryFromUrl = searchParams.get('category');

		if (categoryFromUrl && categories.includes(categoryFromUrl)) {
			setSelectedCategory(categoryFromUrl);
			return;
		}

		if (!categoryFromUrl) {
			setSelectedCategory('all');
		}
	}, [categories, searchParams]);

	const filteredProducts = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return products.filter(product => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				product.title.toLowerCase().includes(normalizedSearch) ||
				product.description.toLowerCase().includes(normalizedSearch);
			const matchesCategory =
				selectedCategory === 'all' || product.category.name === selectedCategory;
			const matchesPrice = product.price <= priceLimit;

			return matchesSearch && matchesCategory && matchesPrice;
		});
	}, [priceLimit, products, searchTerm, selectedCategory]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);

		if (category === 'all') {
			setSearchParams({});
			return;
		}

		setSearchParams({ category });
	};

	return (
		<div className='min-h-screen w-full bg-[#fbfaf8]'>
			<Header />

			<main className='mx-auto max-w-430 px-4 pt-32 pb-16 sm:px-8 lg:px-24'>
				<h1 className='text-4xl font-semibold tracking-tight text-[#221713] sm:text-5xl'>
					Mahsulotlar
				</h1>

				<div className='mt-10 grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]'>
					<aside className='h-fit rounded-[28px] border border-[#e6ddd4] bg-white p-6 shadow-[0_10px_30px_rgba(40,28,20,0.05)]'>
						<div>
							<h2 className='text-xl font-semibold text-[#221713]'>Qidirish</h2>
							<div className='relative mt-4'>
								<FaSearch className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a09388]' />
								<input
									type='text'
									value={searchTerm}
									onChange={event => setSearchTerm(event.target.value)}
									placeholder='Mahsulot nomi...'
									className='h-12 w-full rounded-2xl border border-[#e7ddd3] bg-[#fffdfa] pr-4 pl-11 text-base text-[#221713] outline-none transition focus:border-[#f08d21]'
								/>
							</div>
						</div>

						<div className='mt-10'>
							<h2 className='text-xl font-semibold text-[#221713]'>Kategoriya</h2>
							<div className='mt-4 space-y-2'>
								<button
									type='button'
									onClick={() => handleCategoryChange('all')}
									className={`w-full rounded-2xl border px-4 py-3 text-left text-lg transition ${
										selectedCategory === 'all'
											? 'border-[#2d221d] bg-[#f08d21] font-medium text-white'
											: 'border-transparent text-[#73675f] hover:bg-[#f8f2eb]'
									}`}>
									Barchasi
								</button>

								{categories.map(category => (
									<button
										key={category}
										type='button'
										onClick={() => handleCategoryChange(category)}
										className={`w-full rounded-2xl border px-4 py-3 text-left text-lg transition ${
											selectedCategory === category
												? 'border-[#2d221d] bg-[#f08d21] font-medium text-white'
												: 'border-transparent text-[#73675f] hover:bg-[#f8f2eb]'
										}`}>
										{category}
									</button>
								))}
							</div>
						</div>

						<div className='mt-10'>
							<h2 className='text-xl font-semibold text-[#221713]'>
								Narx: {formatPrice(0)} - {formatPrice(priceLimit)}
							</h2>
							<input
								type='range'
								min={0}
								max={maxPrice || 0}
								step={1}
								value={priceLimit}
								onChange={event => setPriceLimit(Number(event.target.value))}
								className='mt-6 h-2 w-full cursor-pointer accent-[#f08d21]'
							/>
						</div>
					</aside>

					<section>
						{error ? (
							<div className='rounded-2xl border border-[#eadfce] bg-[#fff7ef] px-6 py-5 text-lg text-[#8d5d22]'>
								{error}
							</div>
						) : isLoading ? (
							<div className='grid gap-5 md:grid-cols-2 2xl:grid-cols-3'>
								{Array.from({ length: 9 }).map((_, index) => (
									<div
										key={index}
										className='h-[430px] animate-pulse rounded-[24px] bg-[#ece5de]'
									/>
								))}
							</div>
						) : (
							<>
								<p className='mb-5 text-base text-[#84786d]'>
									{filteredProducts.length} ta mahsulot topildi
								</p>

								{filteredProducts.length === 0 ? (
									<div className='rounded-[28px] border border-[#e6ddd4] bg-white px-6 py-10 text-center text-lg text-[#73675f]'>
										Filter bo'yicha mahsulot topilmadi.
									</div>
								) : (
									<div className='grid gap-5 md:grid-cols-2 2xl:grid-cols-3'>
										{filteredProducts.map(product => (
											<article
												key={product.id}
												className='overflow-hidden rounded-[24px] border border-[#e5ddd5] bg-white shadow-[0_10px_28px_rgba(40,28,20,0.05)] transition-shadow hover:shadow-[0_14px_36px_rgba(40,28,20,0.1)]'>
												<Link to={`/products/${product.id}`} className='block'>
													<div className='relative h-84 overflow-hidden'>
														<img
															src={getProductImage(product)}
															alt={product.title}
															className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
														/>

														<button
															type='button'
															className='absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#9b928a] backdrop-blur-sm transition-colors hover:text-[#f02121]'
															aria-label={`${product.title} yoqtirilganlarga qo'shish`}
															onClick={event => event.preventDefault()}>
															<FaHeart />
														</button>
													</div>

													<div className='flex items-end justify-between gap-4 px-5 py-5'>
														<div>
															<p className='text-sm text-[#9b928a]'>{product.category.name}</p>
															<h3 className='mt-1 line-clamp-2 text-2xl font-semibold tracking-tight text-[#221713]'>
																{product.title}
															</h3>
															<p className='mt-5 text-2xl font-semibold text-[#221713]'>
																{formatPrice(product.price)}
															</p>
														</div>
													</div>
												</Link>

												<div className='px-5 pb-5'>
													<button
														type='button'
														className='ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#241d1a] text-white transition-colors hover:bg-[#f08d21]'
														aria-label={`${product.title} savatchaga qo'shish`}>
														<FaShoppingCart className='text-sm' />
													</button>
												</div>
											</article>
										))}
									</div>
								)}
							</>
						)}
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default ProductsPage;
