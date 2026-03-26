import { useState } from 'react';
import { FaMinus, FaPlus, FaTrashCan } from 'react-icons/fa6';
import Footer from '../assets/components/Footer';
import Header from '../assets/components/Header';
import { useCart } from '../context/CartContext';

const formatPrice = (price: number) =>
	new Intl.NumberFormat('uz-UZ').format(price * 10000) + " so'm";

const CartPage = () => {
	const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
	});
	const [orderMessage, setOrderMessage] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (items.length === 0) {
			setOrderMessage("Avval savatga mahsulot qo'shing.");
			return;
		}

		if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
			setOrderMessage("Buyurtma berish uchun barcha maydonlarni to'ldiring.");
			return;
		}

		setOrderMessage("Buyurtmangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.");
		setFormData({
			name: '',
			phone: '',
			address: '',
		});
		clearCart();
	};

	return (
		<div className='min-h-screen w-full bg-[#fbfaf8]'>
			<Header />

			<main className='mx-auto max-w-430 px-4 pt-32 pb-16 sm:px-8 lg:px-24'>
				<h1 className='text-4xl font-semibold tracking-tight text-[#221713] sm:text-5xl'>Savat</h1>

				<div className='mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]'>
					<section className='space-y-5'>
						{items.length === 0 ? (
							<div className='rounded-[28px] border border-[#e6ddd4] bg-white px-8 py-12 text-lg text-[#73675f] shadow-[0_10px_30px_rgba(40,28,20,0.05)]'>
								Savatingiz hozircha bo'sh. Mahsulot qo'shsangiz shu yerda real time ko'rinadi.
							</div>
						) : (
							items.map(item => (
								<article
									key={item.id}
									className='grid gap-5 rounded-[28px] border border-[#e6ddd4] bg-white p-5 shadow-[0_10px_30px_rgba(40,28,20,0.05)] md:grid-cols-[96px_minmax(0,1fr)_auto_auto] md:items-center'>
									<img
										src={item.image}
										alt={item.title}
										className='h-24 w-24 rounded-2xl object-cover'
									/>

									<div>
										<p className='text-sm text-[#9b928a]'>{item.categoryName}</p>
										<h2 className='mt-1 text-2xl font-semibold text-[#221713]'>{item.title}</h2>
										<p className='mt-2 text-xl text-[#7d7269]'>{formatPrice(item.price)}</p>
									</div>

									<div className='inline-flex items-center gap-4 rounded-2xl border border-[#ebe2d9] px-3 py-2'>
										<button
											type='button'
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece3da] text-[#7a6e65] transition hover:border-[#f08d21] hover:text-[#f08d21]'>
											<FaMinus />
										</button>
										<span className='min-w-6 text-center text-xl font-semibold text-[#221713]'>
											{item.quantity}
										</span>
										<button
											type='button'
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece3da] text-[#7a6e65] transition hover:border-[#f08d21] hover:text-[#f08d21]'>
											<FaPlus />
										</button>
									</div>

									<div className='flex items-center gap-4 justify-self-end'>
										<p className='text-2xl font-semibold text-[#221713]'>
											{formatPrice(item.price * item.quantity)}
										</p>
										<button
											type='button'
											onClick={() => removeFromCart(item.id)}
											className='text-[#9a8d83] transition hover:text-[#dc5a4f]'>
											<FaTrashCan />
										</button>
									</div>
								</article>
							))
						)}
					</section>

					<aside className='h-fit rounded-[28px] border border-[#e6ddd4] bg-white p-7 shadow-[0_10px_30px_rgba(40,28,20,0.05)]'>
						<h2 className='font-serif text-3xl text-[#221713]'>Buyurtma berish</h2>
						<p className='mt-4 text-5xl font-semibold tracking-tight text-[#221713]'>
							Jami: {formatPrice(cartTotal)}
						</p>

						<form className='mt-6 space-y-4' onSubmit={handleSubmit}>
							<input
								type='text'
								placeholder='Ism'
								value={formData.name}
								onChange={event => setFormData(current => ({ ...current, name: event.target.value }))}
								className='h-14 w-full rounded-2xl border border-[#e6ddd4] bg-[#fffdfa] px-4 text-lg outline-none transition focus:border-[#f08d21]'
							/>
							<input
								type='tel'
								placeholder='Telefon raqam'
								value={formData.phone}
								onChange={event => setFormData(current => ({ ...current, phone: event.target.value }))}
								className='h-14 w-full rounded-2xl border border-[#e6ddd4] bg-[#fffdfa] px-4 text-lg outline-none transition focus:border-[#f08d21]'
							/>
							<textarea
								placeholder='Manzil'
								value={formData.address}
								onChange={event => setFormData(current => ({ ...current, address: event.target.value }))}
								rows={4}
								className='w-full rounded-2xl border border-[#e6ddd4] bg-[#fffdfa] px-4 py-4 text-lg outline-none transition focus:border-[#f08d21]'
							/>
							<button
								type='submit'
								className='h-14 w-full rounded-2xl bg-[#f08d21] text-xl font-semibold text-white transition hover:bg-[#dd7c12]'>
								Buyurtma berish
							</button>
						</form>

						{orderMessage ? <p className='mt-4 text-sm text-[#6f6359]'>{orderMessage}</p> : null}
					</aside>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default CartPage;
