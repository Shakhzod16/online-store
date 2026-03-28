import { Link } from 'react-router-dom';
import type { StoreProduct } from '../../types/store';

interface CategorysProps {
	products: StoreProduct[];
	isLoading: boolean;
	error: string;
}

const getProductImage = (product: StoreProduct) => product.images[0] || product.category.image;

function Categorys({ products, isLoading, error }: CategorysProps) {
	const categories = Array.from(
		products.reduce((map, product) => {
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
		}, new Map<number, { id: number; title: string; count: number; image: string }>()),
	)
		.map(([, category]) => category)
		.slice(0, 3);

	return (
		<section className='py-14 sm:py-16'>
			<div className='mb-10 flex items-center justify-between gap-6'>
				<h2 className='text-4xl font-semibold tracking-tight text-[#221713] sm:text-5xl'>Kategoriyalar</h2>

				<Link to='/categories' className='text-xl font-medium text-[#857970] transition-colors hover:text-[#f0a721]'>
					Barchasi <span aria-hidden='true'>&rarr;</span>
				</Link>
			</div>

				{error ? (
					<div className='rounded-2xl border border-[#eadfce] bg-[#fff7ef] px-6 py-5 text-lg text-[#8d5d22]'>
						{error}
					</div>
				) : isLoading ? (
				<div className='grid gap-5 lg:grid-cols-3'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className='min-h-105 animate-pulse rounded-2xl bg-[#ece5de]' />
					))}
				</div>
			) : (
				<div className='grid gap-5 lg:grid-cols-3'>
						{categories.map(category => (
							<Link
								key={category.id}
								to={`/products?category=${encodeURIComponent(category.title)}`}
								className='group relative block min-h-105 overflow-hidden rounded-2xl'>
							<img
								src={category.image}
								alt={category.title}
								className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
							/>

							<div className='absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent' />

							<div className='absolute right-0 bottom-0 left-0 p-6 text-white sm:p-8'>
								<h3 className='text-3xl font-semibold tracking-tight'>{category.title}</h3>
								<p className='mt-2 text-xl text-white/85'>{category.count} mahsulot</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}

export default Categorys;
