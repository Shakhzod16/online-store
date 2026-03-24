import '../../App';
const footerColumns = [
	{
		title: 'Sahifalar',
		links: ['Bosh sahifa', 'Mahsulotlar', 'Kategoriyalar'],
	},
	{
		title: 'Yordam',
		links: ['Yetkazib berish', 'Qaytarish', "Bog'lanish"],
	},
	{
		title: 'Aloqa',
		links: ['info@dokon.uz', '+998 90 123 45 67', "Buxoro, O'zbekiston"],
	},
];

function Footer() {
	return (
		<footer className='mt-8 border-t border-[#e6dfd8] bg-[#fbfaf8]'>
			<div className='mx-auto max-w-430 px-8 py-16 lg:px-24'>
				<div className='grid gap-12 md:grid-cols-2 xl:grid-cols-4'>
					<div className='max-w-90'>
						<h2 className='text-3xl font-semibold tracking-tight text-[#221713]'>Do'kon</h2>
						<p className='mt-6 text-xl leading-9 text-[#7d746d]'>
							Sifatli mahsulotlar, qulay narxlar. O'zbekistonning eng yaxshi onlayn do&apos;koni.
						</p>
					</div>

					{footerColumns.map(column => (
						<div key={column.title}>
							<h3 className='text-2xl font-semibold text-[#221713]'>{column.title}</h3>

							<ul className='mt-6 space-y-4 text-xl text-[#7d746d]'>
								{column.links.map(link => (
									<li key={link}>
										<a href='#' className='transition-colors hover:text-[#f08d21]'>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className='mt-14 border-t border-[#e6dfd8] pt-8 text-center text-lg text-[#8a817a]'>
					<span aria-hidden='true'>&copy;</span> 2026{' '}
					<a href='https://t.me/Shahzod_Qosimov' className='no-underline'>
						by Shahzod_Qosimov
					</a>{' '}
					. Barcha huquqlar himoyalangan.
				</div>
			</div>
		</footer>
	);
}

export default Footer;
