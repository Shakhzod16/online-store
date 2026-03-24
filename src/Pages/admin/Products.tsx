import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import type { Category, Product } from './types';

type ProductsProps = {
	products: Product[];
	categories: Category[];
	onAddProduct: () => void;
	onEditProduct: (product: Product) => void;
	onDeleteProduct: (productId: number) => void;
};

const Products = ({ products, categories, onAddProduct, onEditProduct, onDeleteProduct }: ProductsProps) => {
	const categoryMap = new Map(categories.map(category => [category.id, category.name]));
	const categoryImageMap = new Map(categories.map(category => [category.id, category.image]));

	return (
		<section className='space-y-6'>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#241f1b]'>Mahsulotlar</h1>
				</div>

				<button
					type='button'
					onClick={onAddProduct}
					className='inline-flex items-center border-0! justify-center gap-2 rounded-xl bg-[#f08d21] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#dd7c12]'>
					<FaPlus className='text-xs' />
					<span>Qo'shish</span>
				</button>
			</div>

			<div className='overflow-hidden rounded-2xl border border-[#ece4db] bg-white'>
				<div className='hidden grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr] gap-4 border-b border-[#f1e8df] bg-[#fcfaf7] px-5 py-4 text-sm font-semibold text-[#7b6f65] md:grid'>
					<span>Nomi</span>
					<span>Narxi</span>
					<span>Kategoriya</span>
					<span>Amallar</span>
				</div>

				<div className='divide-y divide-[#f3ece4]'>
					{products.map(product => (
						<div
							key={product.id}
							className='grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr] md:items-center'>
							<div className='flex items-center gap-3'>
								<img
									src={categoryImageMap.get(product.categoryId) ?? 'https://placehold.co/80x80/f5efe8/8a7d73?text=No+Image'}
									alt={product.name}
									className='h-14 w-14 shrink-0 rounded-xl object-cover'
								/>
								<div>
									<p className='font-semibold text-[#241f1b]'>{product.name}</p>
									<p className='text-sm text-[#8a7d73] md:hidden'>{product.price.toLocaleString('en-US')} so'm</p>
								</div>
							</div>
							<p className='hidden text-sm font-medium text-[#5f544b] md:block'>
								{product.price.toLocaleString('en-US')} so'm
							</p>
							<p className='text-sm text-[#7b6f65]'>{categoryMap.get(product.categoryId) ?? 'Kategoriyasiz'}</p>
							<div className='flex items-center gap-2'>
								<button
									type='button'
									onClick={() => onEditProduct(product)}
									className='rounded-lg border border-[#e7ddd3] p-2.5 text-[#75685d] transition hover:border-[#f08d21] hover:text-[#f08d21]'>
									<FaEdit />
								</button>
								<button
									type='button'
									onClick={() => onDeleteProduct(product.id)}
									className='rounded-lg border border-[#e7ddd3] p-2.5 text-[#75685d] transition hover:border-[#dc5a4f] hover:text-[#dc5a4f]'>
									<FaTrashAlt />
								</button>
							</div>
						</div>
					))}

					{products.length === 0 && (
						<div className='px-5 py-10 text-center text-sm text-[#8a7d73]'>Hozircha mahsulot yo'q.</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Products;
