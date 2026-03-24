import { useEffect, useMemo, useState } from 'react';
import Categories from './Categories';
import Dashboard from './Dashboard';
import Products from './Products';
import Sidebar, { type AdminSection } from './Sidebar';
import Users from './Users';
import type { AdminData, Category, Order, Product, User } from './types';

type CategoryForm = {
	id: number | null;
	name: string;
	image: string;
	productCount: string;
};

type ProductForm = {
	id: number | null;
	name: string;
	price: string;
	categoryId: string;
};

type ModalState = { type: 'category'; mode: 'create' | 'edit' } | { type: 'product'; mode: 'create' | 'edit' } | null;

const STORAGE_KEY = 'internet-magazin-admin-data';

const emptyCategoryForm: CategoryForm = {
	id: null,
	name: '',
	image: '',
	productCount: '',
};

const emptyProductForm: ProductForm = {
	id: null,
	name: '',
	price: '',
	categoryId: '',
};

const normalizeRole = (role: string): User['role'] =>
	role === 'admin' ? 'admin' : 'user';

const createEmailFromName = (fullName: string) =>
	`${fullName
		.toLowerCase()
		.trim()
		.replace(/'/g, '')
		.split(/\s+/)
		.join('.')}@mail.uz`;

const normalizeUsers = (users: Array<Partial<User> & { id: number; fullName: string; role: string }>): User[] =>
	users.map(user => ({
		id: user.id,
		fullName: user.fullName,
		email: user.email?.trim() || createEmailFromName(user.fullName),
		role: normalizeRole(user.role),
	}));

	const placeholderConfig: Record<
	Exclude<AdminSection, 'dashboard' | 'categories' | 'products'>,
	{ title: string; text: string }
> = {
	orders: {
		title: 'Buyurtmalar',
		text: "Buyurtmalar bo'limini keyingi bosqichda .",
	},
	users: {
		title: 'Foydalanuvchilar',
		text: '',
	},
};

const Admin = () => {
	const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
	const [categories, setCategories] = useState<Category[]>([]);
	const [orders, setOrders] = useState<Order[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [modalState, setModalState] = useState<ModalState>(null);
	const [categoryForm, setCategoryForm] = useState<CategoryForm>(emptyCategoryForm);
	const [productForm, setProductForm] = useState<ProductForm>(emptyProductForm);

	useEffect(() => {
		const controller = new AbortController();

		const loadAdminData = async () => {
			try {
				setIsLoading(true);
				setError('');

				const savedData = localStorage.getItem(STORAGE_KEY);
				if (savedData) {
					const parsedData: AdminData = JSON.parse(savedData);
					setCategories(parsedData.categories ?? []);
					setOrders(parsedData.orders ?? []);
					setUsers(normalizeUsers((parsedData.users as Array<Partial<User> & { id: number; fullName: string; role: string }>) ?? []));
					setProducts(parsedData.products ?? []);
					return;
				}

				const response = await fetch('/db.json', { signal: controller.signal });
				if (!response.ok) {
					throw new Error(`Request failed: ${response.status}`);
				}

				const data: AdminData = await response.json();
				setCategories(data.categories ?? []);
				setOrders(data.orders ?? []);
				setUsers(normalizeUsers((data.users as Array<Partial<User> & { id: number; fullName: string; role: string }>) ?? []));
				setProducts(data.products ?? []);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}

				setError("Admin ma'lumotlarini yuklab bo'lmadi.");
			} finally {
				setIsLoading(false);
			}
		};

		void loadAdminData();

		return () => controller.abort();
	}, []);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		const data: AdminData = {
			categories,
			orders,
			users,
			products,
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}, [categories, orders, users, products, isLoading]);

	const totalRevenue = useMemo(
		() =>
			products.reduce((sum, product) => {
				return sum + product.price;
			}, 0),
		[products],
	);

	const openCreateCategory = () => {
		setCategoryForm(emptyCategoryForm);
		setModalState({ type: 'category', mode: 'create' });
	};

	const openCreateProduct = () => {
		setProductForm({
			...emptyProductForm,
			categoryId: categories[0] ? String(categories[0].id) : '',
		});
		setModalState({ type: 'product', mode: 'create' });
	};

	const openEditProduct = (product: Product) => {
		setProductForm({
			id: product.id,
			name: product.name,
			price: String(product.price),
			categoryId: String(product.categoryId),
		});
		setModalState({ type: 'product', mode: 'edit' });
	};

	const closeModal = () => {
		setModalState(null);
		setCategoryForm(emptyCategoryForm);
		setProductForm(emptyProductForm);
	};

	const handleCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextCategory: Category = {
			id: categoryForm.id ?? Date.now(),
			name: categoryForm.name.trim(),
			image:
				categoryForm.image.trim() ||
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
			productCount: Number(categoryForm.productCount) || 0,
			description: `${categoryForm.name.trim() || 'Kategoriya'} bo'limi`,
		};

		if (!nextCategory.name) {
			return;
		}

		setCategories(prev =>
			categoryForm.id === null
				? [nextCategory, ...prev]
				: prev.map(category => (category.id === nextCategory.id ? nextCategory : category)),
		);
		setActiveSection('categories');
		closeModal();
	};

	const handleProductSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextProduct: Product = {
			id: productForm.id ?? Date.now(),
			name: productForm.name.trim(),
			price: Number(productForm.price) || 0,
			categoryId: Number(productForm.categoryId) || categories[0]?.id || 0,
			stock: 0,
		};

		if (!nextProduct.name) {
			return;
		}

		setProducts(prev =>
			productForm.id === null
				? [nextProduct, ...prev]
				: prev.map(product => (product.id === nextProduct.id ? nextProduct : product)),
		);
		setActiveSection('products');
		closeModal();
	};

	const handleDeleteCategory = (categoryId: number) => {
		setCategories(prev => prev.filter(category => category.id !== categoryId));
		setProducts(prev => prev.filter(product => product.categoryId !== categoryId));
	};

	const handleDeleteProduct = (productId: number) => {
		setProducts(prev => prev.filter(product => product.id !== productId));
	};

	return (
		<div className='min-h-screen bg-[#f7f3ee] text-[#241f1b]'>
			<div className='flex min-h-screen flex-col xl:flex-row'>
				<Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

				<main className='flex-1 px-4 py-5 sm:px-6 lg:px-8'>
					{error && (
						<div className='mb-5 rounded-2xl border border-[#eed4cd] bg-[#fff2ee] px-4 py-3 text-sm text-[#b24e3c]'>
							{error}
						</div>
					)}

					{isLoading ? (
						<div className='rounded-2xl border border-[#ece4db] bg-white p-6'>
							<h1 className='text-2xl font-semibold text-[#241f1b]'>Yuklanmoqda...</h1>
							<p className='mt-2 text-sm text-[#7b6f65]'>Admin ma'lumotlari tayyorlanmoqda.</p>
						</div>
					) : (
						<>
							{activeSection === 'dashboard' && (
								<div className='space-y-6'>
									<Dashboard
										categories={categories}
										orders={orders}
										userCount={users.length}
										products={products}
										onAddCategory={openCreateCategory}
										onAddProduct={openCreateProduct}
									/>

									<div className='rounded-2xl border border-[#ece4db] bg-white p-5'>
										<p className='text-sm text-[#7b6f65]'>Mahsulotlar umumiy narxi</p>
										<p className='mt-2 text-3xl font-semibold text-[#241f1b]'>
											{totalRevenue.toLocaleString('en-US')} so'm
										</p>
									</div>
								</div>
							)}

							{activeSection === 'categories' && (
								<Categories
									categories={categories}
									onAddCategory={openCreateCategory}
									onDeleteCategory={handleDeleteCategory}
								/>
							)}

							{activeSection === 'products' && (
								<Products
									products={products}
									categories={categories}
									onAddProduct={openCreateProduct}
									onEditProduct={openEditProduct}
									onDeleteProduct={handleDeleteProduct}
								/>
							)}

							{activeSection === 'users' && <Users users={users} />}

							{activeSection !== 'dashboard' && activeSection !== 'categories' && activeSection !== 'products' && activeSection !== 'users' && (
								<section className='rounded-2xl border border-[#ece4db] bg-white p-6'>
									<h1 className='text-3xl font-semibold text-[#241f1b]'>{placeholderConfig[activeSection].title}</h1>
									<p className='mt-2 max-w-2xl text-sm leading-7 text-[#7b6f65]'>
										{placeholderConfig[activeSection].text}
									</p>
								</section>
							)}
						</>
					)}
				</main>
			</div>

			{modalState?.type === 'category' && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4'>
					<div className='w-full max-w-lg rounded-2xl bg-white p-6'>
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-semibold text-[#241f1b]'>
								{modalState.mode === 'create' ? "Kategoriya qo'shish" : 'Kategoriyani tahrirlash'}
							</h2>
						</div>

						<form onSubmit={handleCategorySubmit} className='mt-5 space-y-4'>
							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Rasm URL</span>
								<input
									type='url'
									value={categoryForm.image}
									onChange={event => setCategoryForm(prev => ({ ...prev, image: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'
									placeholder='https://...'
								/>
							</label>

							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Nomi</span>
								<input
									type='text'
									value={categoryForm.name}
									onChange={event => setCategoryForm(prev => ({ ...prev, name: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'
									placeholder='Masalan: Telefonlar'
									required
								/>
							</label>

							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Nechta</span>
								<input
									type='number'
									min='0'
									value={categoryForm.productCount}
									onChange={event => setCategoryForm(prev => ({ ...prev, productCount: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'
									placeholder='0'
								/>
							</label>

							<div className='flex justify-end gap-2 pt-2'>
								<button
									type='button'
									onClick={closeModal}
									className='rounded-xl border border-[#e7ddd3] px-4 py-2.5 text-sm font-medium text-[#6f6359]'>
									Bekor qilish
								</button>
								<button type='submit' className='rounded-xl bg-[#f08d21] px-4 py-2.5 text-sm font-semibold text-white'>
									Saqlash
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{modalState?.type === 'product' && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4'>
					<div className='w-full max-w-lg rounded-2xl bg-white p-6'>
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-semibold text-[#241f1b]'>
								{modalState.mode === 'create' ? "Mahsulot qo'shish" : 'Mahsulotni tahrirlash'}
							</h2>
							<button
								type='button'
								onClick={closeModal}
								className='rounded-lg border border-[#e7ddd3] px-3 py-1.5 text-sm text-[#6f6359]'>
								Yopish
							</button>
						</div>

						<form onSubmit={handleProductSubmit} className='mt-5 space-y-4'>
							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Nomi</span>
								<input
									type='text'
									value={productForm.name}
									onChange={event => setProductForm(prev => ({ ...prev, name: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'
									placeholder='Masalan: Smart soat'
									required
								/>
							</label>

							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Price</span>
								<input
									type='number'
									min='0'
									value={productForm.price}
									onChange={event => setProductForm(prev => ({ ...prev, price: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'
									placeholder='250000'
									required
								/>
							</label>

							<label className='block'>
								<span className='mb-1.5 block text-sm font-medium text-[#5f544b]'>Kategoriya</span>
								<select
									value={productForm.categoryId}
									onChange={event => setProductForm(prev => ({ ...prev, categoryId: event.target.value }))}
									className='w-full rounded-xl border border-[#e7ddd3] px-4 py-3 outline-none focus:border-[#f08d21]'>
									{categories.map(category => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
							</label>

							<div className='flex justify-end gap-2 pt-2'>
								<button
									type='button'
									onClick={closeModal}
									className='rounded-xl border border-[#e7ddd3] px-4 py-2.5 text-sm font-medium text-[#6f6359]'>
									Bekor qilish
								</button>
								<button type='submit' className='rounded-xl bg-[#f08d21] px-4 py-2.5 text-sm font-semibold text-white'>
									Saqlash
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Admin;
