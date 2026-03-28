import type { Order } from './types';

type OrderPageProps = {
	orders: Order[];
};

const statusClasses: Record<Order['status'], string> = {
	Yangi: 'bg-[#fff0e3] text-[#f08d21]',
	Yetkazilmoqda: 'bg-[#f3f4f6] text-[#5f6368]',
	Yakunlandi: 'bg-[#f4f1ec] text-[#7f7469]',
	'Bekor qilindi': 'bg-[#ffe9e7] text-[#ef4444]',
};

const OrderPage = ({ orders }: OrderPageProps) => {
	return (
		<section className='space-y-6'>
			<div>
				<h1 className='text-3xl font-semibold text-[#241f1b]'>Buyurtmalar</h1>
			</div>

			<div className='overflow-hidden rounded-[28px] border border-[#ece4db] bg-white'>
				<div className='overflow-x-auto'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='border-b border-[#eee3d8] text-left text-sm text-[#7b6f65]'>
								<th className='px-5 py-5 font-semibold sm:px-6'>ID</th>
								<th className='px-5 py-5 font-semibold sm:px-6'>Mijoz</th>
								<th className='px-5 py-5 font-semibold sm:px-6'>Sana</th>
								<th className='px-5 py-5 font-semibold sm:px-6'>Mahsulotlar</th>
								<th className='px-5 py-5 font-semibold sm:px-6'>Jami</th>
								<th className='px-5 py-5 font-semibold sm:px-6'>Holat</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order.id} className='border-b border-[#f2e8de] last:border-b-0'>
										<td className='px-5 py-4 text-base font-semibold text-[#241f1b] sm:px-6'>{order.id}</td>
									<td className='px-5 py-4 text-base text-[#241f1b] sm:px-6'>{order.customer}</td>
									<td className='px-5 py-4 text-base text-[#7b6f65] sm:px-6'>{order.date}</td>
									<td className='px-5 py-4 text-base text-[#7b6f65] sm:px-6'>{order.itemCount} ta</td>
									<td className='px-5 py-4 text-base font-semibold text-[#241f1b] sm:px-6'>{order.total}</td>
									<td className='px-5 py-4 sm:px-6'>
										<span className={`inline-flex rounded-full px-4 py-1.5 text-sm leading-none ${statusClasses[order.status]}`}>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default OrderPage;
