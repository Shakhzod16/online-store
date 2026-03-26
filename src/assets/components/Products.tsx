import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { StoreProduct } from '../../types/store';

interface ProductsProps {
	products: StoreProduct[];
	isLoading: boolean;
	error: string;
}

const getProductImage = (product: StoreProduct) =>
	product.images[0] || product.category.image;

const formatPrice = (price: number) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(price);

function Products({ products, isLoading, error }: ProductsProps) {
	const visibleProducts = products.slice(0, 8);
	const { addToCart } = useCart();

	return (
		<section className='py-8 sm:py-10'>
			<div className='mb-8 flex items-center justify-between gap-6'>
				<h2 className='text-4xl font-semibold tracking-tight text-[#221713] sm:text-5xl'>
					Mashhur mahsulotlar
				</h2>

				<Link
					to='/products'
					className='text-lg font-medium text-[#857970] transition-colors hover:text-[#f02121]'
				>
					Barchasi <span aria-hidden='true'>&rarr;</span>
				</Link>
			</div>

			{error ? (
				<div className='rounded-2xl border border-[#eadfce] bg-[#fff7ef] px-6 py-5 text-lg text-[#8d5d22]'>
					{error}
				</div>
			) : isLoading ? (
				<div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className='h-107.5 animate-pulse rounded-xl bg-[#ece5de]'
						/>
					))}
				</div>
			) : (
				<div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
					{visibleProducts.map((product) => (
						<article
							key={product.id}
							className='overflow-hidden rounded-xl border border-[#ded8d2] bg-white shadow-[0_8px_24px_rgba(40,28,20,0.06)] transition-shadow hover:shadow-[0_14px_34px_rgba(40,28,20,0.12)]'
						>
							<Link to={`/products/${product.id}`} className='block'>
								<div className='relative h-80 overflow-hidden'>
									<img
										src={getProductImage(product)}
										alt={product.title}
										className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
									/>

									<button
										type='button'
										className='absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#9b928a] backdrop-blur-sm transition-colors hover:text-[#f02121]'
										aria-label={`${product.title} yoqtirilganlarga qo'shish`}
										onClick={event => event.preventDefault()}
									>
										<FaHeart />
									</button>
								</div>

								<div className='flex items-end justify-between gap-4 px-4 py-4'>
									<div>
										<p className='text-sm text-[#9b928a]'>
											{product.category.name}
										</p>
										<h3 className='mt-1 line-clamp-2 text-2xl font-semibold tracking-tight text-[#221713]'>
											{product.title}
										</h3>
										<p className='mt-4 text-2xl font-semibold text-[#221713]'>
											{formatPrice(product.price)}
										</p>
									</div>
								</div>
							</Link>

								<div className='px-4 pb-4'>
									<button
										type='button'
										onClick={() => addToCart(product)}
										className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#241d1a] text-white transition-colors hover:bg-[#f08d21]'
										aria-label={`${product.title} savatchaga qo'shish`}
									>
									<FaShoppingCart className='text-sm' />
								</button>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	);
}

export default Products;
