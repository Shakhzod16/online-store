import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import type { Category } from './types';

type CategoriesProps = {
	categories: Category[];
	onAddCategory: () => void;
	onDeleteCategory: (categoryId: number) => void;
};

const Categories = ({ categories, onAddCategory, onDeleteCategory }: CategoriesProps) => {
	return (
		<section className='space-y-6'>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#241f1b]'>Kategoriyalar</h1>
				</div>

				<button
					type='button'
					onClick={onAddCategory}
					className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#f08d21] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#dd7c12]'>
					<FaPlus className='text-xs' />
					<span>Qo'shish</span>
				</button>
			</div>

			<div className='overflow-hidden rounded-2xl border border-[#ece4db] bg-white'>
				<div className='hidden grid-cols-[96px_1.2fr_0.6fr_0.7fr] gap-4 border-b border-[#f1e8df] bg-[#fcfaf7] px-5 py-4 text-sm font-semibold text-[#7b6f65] md:grid'>
					<span>Rasm</span>
					<span>Nomi</span>
					<span>Soni</span>
					<span>Amallar</span>
				</div>

				<div className='divide-y divide-[#f3ece4]'>
					{categories.map(category => (
						<div
							key={category.id}
							className='grid gap-4 px-5 py-4 md:grid-cols-[96px_1.2fr_0.6fr_0.7fr] md:items-center'>
							<div className='flex items-center gap-3'>
								<img src={category.image} alt={category.name} className='h-16 w-16 rounded-xl object-cover' />
								<div className='md:hidden'>
									<p className='font-semibold text-[#241f1b]'>{category.name}</p>
									<p className='text-sm text-[#7b6f65]'>{category.productCount} ta</p>
								</div>
							</div>

							<div className='hidden md:block'>
								<p className='font-semibold text-[#241f1b]'>{category.name}</p>
								<p className='text-sm text-[#8a7d73]'>{category.description}</p>
							</div>

							<p className='text-sm font-medium text-[#5f544b]'>{category.productCount} ta</p>

							<div className='flex items-center gap-2'>
								<button
									type='button'
									onClick={() => onDeleteCategory(category.id)}
									className='rounded-lg border border-[#e7ddd3] p-2.5 text-[#75685d] transition hover:border-[#dc5a4f] hover:text-[#dc5a4f]'>
									<FaTrashAlt />
								</button>
							</div>
						</div>
					))}

					{categories.length === 0 && (
						<div className='px-5 py-10 text-center text-sm text-[#8a7d73]'>Hozircha kategoriya yo'q.</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Categories;
