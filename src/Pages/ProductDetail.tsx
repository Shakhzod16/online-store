import { useEffect, useMemo, useState } from 'react';
import { FaHeart, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
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

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<StoreProduct | null>(null);
	const [selectedImage, setSelectedImage] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) {
			setError("Mahsulot topilmadi.");
			setIsLoading(false);
			return;
		}

		const controller = new AbortController();

		const loadProduct = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await fetch(`${PRODUCTS_API}/${id}`, {
					signal: controller.signal,
				});

				if (!response.ok) {
					throw new Error(`Request failed: ${response.status}`);
				}

				const data: StoreProduct = await response.json();
				setProduct(data);
				setSelectedImage(data.images[0] || data.category.image);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}

				setError("Mahsulot ma'lumotlarini yuklab bo'lmadi.");
			} finally {
				setIsLoading(false);
			}
		};

		void loadProduct();

		return () => controller.abort();
	}, [id]);

	const galleryImages = useMemo(() => {
		if (!product) {
			return [];
		}

		const images = product.images.filter(Boolean);
		return images.length > 0 ? images : [product.category.image];
	}, [product]);

	useEffect(() => {
		if (galleryImages.length > 0 && !galleryImages.includes(selectedImage)) {
			setSelectedImage(galleryImages[0]);
		}
	}, [galleryImages, selectedImage]);

	return (
		<div className='min-h-screen w-full bg-[#fbfaf8]'>
			<Header />

			<main className='mx-auto max-w-430 px-4 pt-32 pb-16 sm:px-8 lg:px-24'>
				<Link
					to='/'
					className='inline-flex items-center text-sm font-medium text-[#8f8378] transition-colors hover:text-[#f08d21]'>
					Mahsulotlarga qaytish
				</Link>

				{error ? (
					<div className='mt-8 rounded-3xl border border-[#eadfce] bg-[#fff7ef] px-6 py-5 text-lg text-[#8d5d22]'>
						{error}
					</div>
				) : isLoading ? (
					<div className='mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]'>
						<div className='h-[520px] animate-pulse rounded-[28px] bg-[#ece5de]' />
						<div className='space-y-4'>
							<div className='h-5 w-28 animate-pulse rounded bg-[#ece5de]' />
							<div className='h-12 w-64 animate-pulse rounded bg-[#ece5de]' />
							<div className='h-6 w-44 animate-pulse rounded bg-[#ece5de]' />
							<div className='h-28 w-full animate-pulse rounded bg-[#ece5de]' />
						</div>
					</div>
				) : product ? (
					<section className='mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start'>
						<div>
							<div className='overflow-hidden rounded-[28px] border border-[#e9e0d7] bg-white'>
								<img
									src={selectedImage}
									alt={product.title}
									className='h-[520px] w-full object-cover'
								/>
							</div>

							<div className='mt-4 grid grid-cols-4 gap-3'>
								{galleryImages.map(image => (
									<button
										key={image}
										type='button'
										onClick={() => setSelectedImage(image)}
										className={`overflow-hidden rounded-2xl border transition ${
											selectedImage === image
												? 'border-[#f08d21] ring-2 ring-[#f4c58e]'
												: 'border-[#e5ddd5] hover:border-[#cdb39a]'
										}`}>
										<img
											src={image}
											alt={product.title}
											className='h-28 w-full object-cover'
										/>
									</button>
								))}
							</div>
						</div>

						<div className='rounded-[28px] border border-[#eee5dc] bg-white p-6 shadow-[0_12px_40px_rgba(36,29,26,0.06)] sm:p-8'>
							<p className='text-sm font-medium tracking-[0.24em] text-[#a08e7e] uppercase'>
								{product.category.name}
							</p>
							<h1 className='mt-3 text-4xl font-semibold tracking-tight text-[#221713]'>
								{product.title}
							</h1>
							<p className='mt-4 text-lg leading-8 text-[#746960]'>
								{product.description}
							</p>
							<p className='mt-6 text-4xl font-semibold text-[#221713]'>
								{formatPrice(product.price)}
							</p>

							<div className='mt-8'>
								<p className='mb-3 text-sm font-medium text-[#8a7b6f]'>Miqdor</p>
								<div className='inline-flex items-center overflow-hidden rounded-2xl border border-[#e5ddd5]'>
									<button
										type='button'
										onClick={() => setQuantity(current => Math.max(1, current - 1))}
										className='flex h-12 w-12 items-center justify-center text-[#73675f] transition-colors hover:bg-[#f7f2ec]'>
										<FaMinus className='text-xs' />
									</button>
									<span className='flex h-12 min-w-14 items-center justify-center border-x border-[#e5ddd5] px-4 font-semibold text-[#221713]'>
										{quantity}
									</span>
									<button
										type='button'
										onClick={() => setQuantity(current => current + 1)}
										className='flex h-12 w-12 items-center justify-center text-[#73675f] transition-colors hover:bg-[#f7f2ec]'>
										<FaPlus className='text-xs' />
									</button>
								</div>
							</div>

							<div className='mt-8 flex gap-3'>
								<button
									type='button'
									className='flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#241d1a] px-6 text-base font-semibold text-white transition-colors hover:bg-[#f08d21]'>
									<FaShoppingCart />
									Savatga qo'shish
								</button>
								<button
									type='button'
									className='flex h-14 w-14 items-center justify-center rounded-full border border-[#e5ddd5] text-[#8f8378] transition-colors hover:border-[#f08d21] hover:text-[#f08d21]'>
									<FaHeart />
								</button>
							</div>

							<div className='mt-8 space-y-4 border-t border-[#f0e7df] pt-6 text-sm text-[#6f645d]'>
								<div className='flex items-center justify-between gap-4'>
									<span>Yetkazib berish</span>
									<span className='font-medium text-[#221713]'>1-3 ish kuni ichida</span>
								</div>
								<div className='flex items-center justify-between gap-4'>
									<span>Kafolat</span>
									<span className='font-medium text-[#221713]'>30 kunlik qaytarish</span>
								</div>
								<div className='flex items-center justify-between gap-4'>
									<span>To'lov</span>
									<span className='font-medium text-[#221713]'>Naqd yoki karta orqali</span>
								</div>
							</div>
						</div>
					</section>
				) : null}
			</main>

			<Footer />
		</div>
	);
};

export default ProductDetail;
