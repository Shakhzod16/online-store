import { useEffect, useState } from 'react';
import {
	FaCircleCheck,
	FaArrowRightFromBracket,
	FaCartShopping,
	FaEye,
	FaEyeSlash,
	FaHeart,
	FaMoon,
	FaSun,
	FaShieldHalved,
	FaUser,
	FaXmark,
} from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

type AuthMode = 'login' | 'register';
type RegisteredUser = {
	name: string;
	email: string;
	password: string;
};
type SessionUser = {
	name: string;
	email: string;
	role: 'admin' | 'user';
};
type ToastState = {
	message: string;
	position: 'top' | 'bottom';
} | null;

const REGISTERED_USERS_KEY = 'internet-magazin-registered-users';
const CURRENT_USER_KEY = 'internet-magazin-current-user';

const getStoredCurrentUser = (): SessionUser | null => {
	const savedUser = localStorage.getItem(CURRENT_USER_KEY);

	if (!savedUser) {
		return null;
	}

	try {
		return JSON.parse(savedUser) as SessionUser;
	} catch {
		localStorage.removeItem(CURRENT_USER_KEY);
		return null;
	}
};

const Header = () => {
	const navigate = useNavigate();
	const [isAuthOpen, setIsAuthOpen] = useState(false);
	const [authMode, setAuthMode] = useState<AuthMode>('login');
	const [toast, setToast] = useState<ToastState>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [currentUser, setCurrentUser] = useState<SessionUser | null>(() => getStoredCurrentUser());
	const { cartCount } = useCart();
	const { theme, toggleTheme } = useTheme();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const [registerData, setRegisterData] = useState({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (!toast) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setToast(null);
		}, 3000);

		return () => window.clearTimeout(timeoutId);
	}, [toast]);

	useEffect(() => {
		if (!isAuthOpen) {
			return;
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsAuthOpen(false);
			}
		};

		window.addEventListener('keydown', handleEscape);
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	}, [isAuthOpen]);

	const handleLogin = () => {
		const email = loginData.email.trim().toLowerCase();
		const password = loginData.password.trim();

		if (!email || !password) {
			setErrorMessage('Email va parolni kiriting');
			return;
		}

		if (email === 'admin@shop.uz' && password === 'admin123') {
			const adminUser: SessionUser = {
				name: 'Admin',
				email,
				role: 'admin',
			};

			localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
			setCurrentUser(adminUser);
			setErrorMessage('');
			setIsAuthOpen(false);
			setToast({
				message: 'Tizimga kirdingiz!',
				position: 'bottom',
			});
			navigate('/admin');
			return;
		}

		const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) ?? '[]');
		const matchedUser = registeredUsers.find(user => user.email === email && user.password === password);

		if (matchedUser) {
			const sessionUser: SessionUser = {
				name: matchedUser.name,
				email: matchedUser.email,
				role: 'user',
			};

			localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
			setCurrentUser(sessionUser);
			setErrorMessage('');
			setIsAuthOpen(false);
			setToast({
				message: `Xush kelibsiz, ${matchedUser.name}`,
				position: 'top',
			});
			navigate('/');
			return;
		}

		setErrorMessage("Login yoki parol noto'g'ri");
	};

	const handleRegister = () => {
		const nextUser = {
			name: registerData.name.trim(),
			email: registerData.email.trim().toLowerCase(),
			password: registerData.password.trim(),
		};

		if (!nextUser.name || !nextUser.email || !nextUser.password) {
			setErrorMessage("Barcha maydonlarni to'ldiring");
			return;
		}

		const registeredUsers: RegisteredUser[] = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) ?? '[]');
		const alreadyRegistered = registeredUsers.some(user => user.email === nextUser.email);

		if (alreadyRegistered) {
			setErrorMessage("Siz oldin ro'yxatdan o'tgansiz");
			return;
		}

		localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...registeredUsers, nextUser]));
		setErrorMessage('');
		setIsAuthOpen(false);
		localStorage.setItem(
			CURRENT_USER_KEY,
			JSON.stringify({
				name: nextUser.name,
				email: nextUser.email,
				role: 'user',
			} satisfies SessionUser),
		);
		setCurrentUser({
			name: nextUser.name,
			email: nextUser.email,
			role: 'user',
		});
		setAuthMode('login');
		setLoginData({
			email: '',
			password: '',
		});

		setRegisterData({
			name: '',
			email: '',
			password: '',
		});
		setToast({
			message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
			position: 'top',
		});
		navigate('/');
	};

	const handleLogout = () => {
		localStorage.removeItem(CURRENT_USER_KEY);
		setCurrentUser(null);
		setToast({
			message: 'Hisobdan chiqdingiz',
			position: 'top',
		});
		navigate('/');
	};

	return (
		<>
			<header className='fixed top-0 right-0 left-0 z-50 w-full'>
				<div className='w-full bg-[#5a3c3f]' />

				<div className='bg-[#fbfaf8]/95 backdrop-blur-sm'>
					<div className='mx-auto flex max-w-430 items-center justify-between px-8 py-6 lg:px-24'>
						<h1 className='text-3xl font-semibold tracking-tight text-[#2f2724]'>Do'kon</h1>

						<nav className='hidden items-center gap-12 text-[18px] font-medium md:flex'>
							<NavLink
								to='/'
								className={({ isActive }) =>
									isActive ? 'text-[#f08d21]' : 'text-[#877d77] transition-colors hover:text-[#f08d21]'
								}>
								Bosh sahifa
							</NavLink>
							<NavLink
								to='/products'
								className={({ isActive }) =>
									isActive ? 'text-[#f08d21]' : 'text-[#877d77] transition-colors hover:text-[#f08d21]'
								}>
								Mahsulotlar
							</NavLink>
							<NavLink
								to='/categories'
								className={({ isActive }) =>
									isActive ? 'text-[#f08d21]' : 'text-[#877d77] transition-colors hover:text-[#f08d21]'
								}>
								Kategoriyalar
							</NavLink>
						</nav>

						<div className='flex items-center gap-6 text-[22px] text-[#877d77]'>
								<button
									type='button'
									aria-label={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
									onClick={toggleTheme}
									className='cursor-pointer transition-colors hover:text-[#f08d21]'>
									{theme === 'dark' ? <FaSun /> : <FaMoon />}
								</button>
							<button
								type='button'
								aria-label='Sevimlilar'
								className='cursor-pointer transition-colors hover:text-[#f08d21]'>
								<FaHeart />
							</button>
								<button
									type='button'
									aria-label='Savatcha'
									onClick={() => navigate('/cart')}
									className='relative cursor-pointer transition-colors hover:text-[#f08d21]'>
									<FaCartShopping />
									{cartCount > 0 ? (
										<span className='absolute -top-2 -right-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#f08d21] px-1 text-[11px] font-semibold text-white'>
											{cartCount}
										</span>
									) : null}
								</button>
							{currentUser?.role === 'admin' ? (
								<>
									<button
										type='button'
										aria-label='Admin panel'
										onClick={() => navigate('/admin')}
										className='cursor-pointer text-[#6f6359] transition-colors hover:text-[#f08d21]'>
										<FaShieldHalved />
									</button>
									<button
										type='button'
										aria-label='Chiqish'
										onClick={handleLogout}
										className='cursor-pointer transition-colors hover:text-[#f08d21]'>
										<FaArrowRightFromBracket />
									</button>
								</>
							) : currentUser?.role === 'user' ? (
								<>
									<button
										type='button'
										aria-label={currentUser.name}
										className='cursor-pointer text-[#6f6359] transition-colors hover:text-[#f08d21]'>
										<FaUser />
									</button>
									<button
										type='button'
										aria-label='Chiqish'
										onClick={handleLogout}
										className='cursor-pointer transition-colors hover:text-[#f08d21]'>
										<FaArrowRightFromBracket />
									</button>
								</>
							) : (
								<button
									type='button'
									aria-label='Kirish'
									onClick={() => {
										setErrorMessage('');
										setShowPassword(false);
										setLoginData({
											email: '',
											password: '',
										});
										setAuthMode('login');
										setIsAuthOpen(true);
									}}
									className='cursor-pointer transition-colors hover:text-[#f08d21]'>
									<FaUser />
								</button>
							)}
						</div>
					</div>
				</div>
			</header>

			{toast ? (
				<div
					className={`fixed left-1/2 z-60 flex min-w-[280px] max-w-[420px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#e8ddd2] bg-white px-5 py-4 text-base font-medium text-[#241f1b] shadow-[0_16px_40px_rgba(36,29,26,0.12)] ${
						toast.position === 'bottom' ? 'bottom-6' : 'top-24'
					}`}>
					<FaCircleCheck className='shrink-0 text-[#241f1b]' />
					<span>{toast.message}</span>
				</div>
			) : null}
			{isAuthOpen ? (
				<div
					className='fixed inset-0 z-70 flex items-center justify-center bg-white px-4 py-10'
					onClick={() => setIsAuthOpen(false)}>
					<div
						className='relative w-full max-w-130 bg-white px-4 py-8 sm:px-0'
						onClick={event => event.stopPropagation()}>
						<button
							type='button'
							aria-label='Yopish'
							onClick={() => setIsAuthOpen(false)}
							className='absolute top-0 right-0 flex h-9 w-9 items-center justify-center rounded-full text-[#6f645d] transition-colors hover:bg-[#f3f3f3] hover:text-[#2f2724]'>
							<FaXmark />
						</button>

						<div className='mx-auto max-w-120 text-center'>
							<h2 className='font-serif text-4xl text-[#201815] sm:text-5xl'>
								{authMode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
							</h2>
							<p className='mt-2 text-lg text-[#8a7f77]'>
								{authMode === 'login' ? 'UzShop hisobingizga kiring' : 'Yangi hisob yarating'}
							</p>

							<form
								className='mt-10 space-y-4 text-left'
								onSubmit={event => {
									event.preventDefault();

									if (authMode === 'login') {
										handleLogin();
									} else {
										handleRegister();
									}
								}}>
								{authMode === 'register' ? (
									<input
										type='text'
										placeholder='Ism'
										value={registerData.name}
										onChange={event =>
											setRegisterData(current => ({
												...current,
												name: event.target.value,
											}))
										}
										className='h-14 w-full rounded-xl border border-[#e3ddd8] bg-white px-5 text-lg text-[#201815] outline-none transition focus:border-[#f08d21]'
									/>
								) : null}

								<input
									type='email'
									placeholder='Email'
									value={authMode === 'login' ? loginData.email : registerData.email}
									onChange={event => {
										const { value } = event.target;

										if (authMode === 'login') {
											setLoginData(current => ({ ...current, email: value }));
											return;
										}

										setRegisterData(current => ({ ...current, email: value }));
									}}
									className='h-14 w-full rounded-xl border border-[#dbe5f5] bg-[#edf4ff] px-5 text-lg text-[#201815] outline-none transition focus:border-[#f08d21]'
								/>

								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										placeholder='Parol'
										value={authMode === 'login' ? loginData.password : registerData.password}
										onChange={event => {
											const { value } = event.target;

											if (authMode === 'login') {
												setLoginData(current => ({ ...current, password: value }));
												return;
											}

											setRegisterData(current => ({ ...current, password: value }));
										}}
										className='h-14 w-full rounded-xl border border-[#dbe5f5] bg-[#edf4ff] px-5 pr-14 text-lg text-[#201815] outline-none transition focus:border-[#f08d21]'
									/>
									<button
										type='button'
										aria-label={showPassword ? 'Parolni yashirish' : "Parolni ko'rsatish"}
										onClick={() => setShowPassword(current => !current)}
										className='absolute top-1/2 right-4 -translate-y-1/2 text-[18px] text-[#7f756f] transition-colors hover:text-[#2f2724]'>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>

								<button
									type='submit'
									className='mt-2 h-14 w-full rounded-xl bg-[#2f2724] text-xl font-semibold text-white'>
									{authMode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
								</button>
							</form>

							{errorMessage ? <p className='mt-4 text-center text-sm text-[#cc4b37]'>{errorMessage}</p> : null}

							<p className='mt-6 text-lg text-[#7f756f]'>
								{authMode === 'login' ? "Hisobingiz yo'qmi?" : 'Hisobingiz bormi?'}{' '}
								<button
									type='button'
									onClick={() => {
										setErrorMessage('');
										setShowPassword(false);
										setLoginData({
											email: '',
											password: '',
										});
										setRegisterData({
											name: '',
											email: '',
											password: '',
										});
										setAuthMode(authMode === 'login' ? 'register' : 'login');
									}}
									className='font-medium text-[#f08d21]'>
									{authMode === 'login' ? "Ro'yxatdan o'tish" : 'Kirish'}
								</button>
							</p>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Header;
