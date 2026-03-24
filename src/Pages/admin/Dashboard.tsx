import type { Category, Order, Product } from './types';

type DashboardProps = {
	categories: Category[];
	orders: Order[];
	userCount: number;
	products: Product[];
	onAddCategory: () => void;
	onAddProduct: () => void;
};

const Dashboard = ({ categories, orders, userCount, products, onAddCategory, onAddProduct }: DashboardProps) => {
	const cards = [
		{ label: 'Mahsulotlar', value: products.length },
		{ label: 'Kategoriyalar', value: categories.length },
		{ label: 'Buyurtmalar', value: orders.length },
		{ label: 'Foydalanuvchilar', value: userCount },
	];

	return (
		<section className='space-y-6'>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<h1 className='text-3xl font-semibold text-[#241f1b]'>Dashboard</h1>
				</div>

				<div className='flex flex-wrap gap-2'>
					<button
						type='button'
						onClick={onAddCategory}
						className='rounded-xl border border-[#e7ddd3] px-4 py-2.5 text-sm font-semibold text-[#5f544b] transition hover:border-[#f08d21] hover:text-[#f08d21]'>
						+ Kategoriya
					</button>
					<button
						type='button'
						onClick={onAddProduct}
						className='rounded-xl bg-[#f08d21] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#dd7c12]'>
						+ Mahsulot
					</button>
				</div>
			</div>

			<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
				{cards.map(card => (
					<div key={card.label} className='rounded-2xl border border-[#ece4db] bg-white p-5'>
						<p className='text-sm text-[#7b6f65]'>{card.label}</p>
						<p className='mt-3 text-4xl font-semibold text-[#241f1b]'>{card.value}</p>
					</div>
				))}
			</div>

			<div className='grid gap-4 xl:grid-cols-2'>
				<div className='rounded-2xl border border-[#ece4db] bg-white p-5'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-lg font-semibold text-[#241f1b]'>So'nggi buyurtmalar</h2>
						<span className='text-sm text-[#8a7d73]'>{orders.length} ta</span>
					</div>

					<div className='space-y-3'>
						{orders.slice(0, 3).map(order => (
							<div
								key={order.id}
								className='grid gap-2 rounded-xl border border-[#f1e8df] px-4 py-3 md:grid-cols-[0.8fr_1fr_1fr_auto] md:items-center'>
								<span className='font-semibold text-[#241f1b]'>{order.id}</span>
								<span className='text-sm text-[#6e6258]'>{order.customer}</span>
								<span className='text-sm font-medium text-[#241f1b]'>{order.total}</span>
								<span className='rounded-full bg-[#faf4ec] px-3 py-1 text-xs text-[#8a7d73]'>{order.status}</span>
							</div>
						))}
					</div>
				</div>

				<div className='rounded-2xl border border-[#ece4db] bg-white p-5'>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-lg font-semibold text-[#241f1b]'>Top kategoriyalar</h2>
						<span className='text-sm text-[#8a7d73]'>{categories.length} ta</span>
					</div>

					<div className='space-y-3'>
						{categories.slice(0, 4).map(category => (
							<div
								key={category.id}
								className='flex items-center justify-between rounded-xl border border-[#f1e8df] px-4 py-3'>
								<div className='flex items-center gap-3'>
									<img src={category.image} alt={category.name} className='h-11 w-11 rounded-lg object-cover' />
									<div>
										<p className='font-medium text-[#241f1b]'>{category.name}</p>
										<p className='text-xs text-[#8a7d73]'>{category.description}</p>
									</div>
								</div>
								<span className='text-sm font-medium text-[#5f544b]'>{category.productCount} ta</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
