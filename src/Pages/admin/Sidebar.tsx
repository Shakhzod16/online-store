import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaFolderOpen, FaShoppingBag, FaThLarge, FaUsers } from 'react-icons/fa';

export type AdminSection = 'dashboard' | 'categories' | 'products' | 'orders' | 'users';

type SidebarProps = {
	activeSection: AdminSection;
	onSectionChange: (section: AdminSection) => void;
};

const navItems: Array<{
	id: AdminSection;
	label: string;
	icon: typeof FaThLarge;
}> = [
	{ id: 'dashboard', label: 'Dashboard', icon: FaThLarge },
	{ id: 'categories', label: 'Kategoriyalar', icon: FaFolderOpen },
	{ id: 'products', label: 'Mahsulotlar', icon: FaBoxOpen },
	{ id: 'orders', label: 'Buyurtmalar', icon: FaShoppingBag },
	{ id: 'users', label: 'Foydalanuvchilar', icon: FaUsers },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
	return (
		<aside className='w-full border-b border-[#ece4db] bg-white xl:min-h-screen xl:w-72 xl:border-r xl:border-b-0'>
			<div className='border-b border-[#f1e8df] px-5 py-5'>
				<h2 className='text-2xl font-semibold text-[#241f1b]'>Admin</h2>
			</div>

			<nav className='flex gap-2 overflow-x-auto px-4 py-4 xl:flex-col xl:overflow-visible'>
				{navItems.map(({ id, label, icon: Icon }) => {
					const isActive = activeSection === id;

					return (
						<button
							key={id}
							type='button'
							onClick={() => onSectionChange(id)}
							className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium whitespace-nowrap transition ${
								isActive
									? 'bg-[#f08d21] text-white'
									: 'text-[#6f6359] hover:bg-[#faf4ec] hover:text-[#241f1b]'
							}`}
						>
							<Icon className='text-sm' />
							<span>{label}</span>
						</button>
					);
				})}
			</nav>

			<div className='px-4 pb-5 xl:pt-6'>
					<Link
						to='/'
						className='inline-flex items-center gap-2 rounded-xl border border-[#e7ddd3] px-4 py-3 text-sm font-medium text-[#6f6359] transition hover:border-[#f08d21] hover:text-[#f08d21]'
					>
						<FaArrowLeft className='text-xs' />
						<span>Do'konga qaytish</span>
					</Link>
				</div>
			</aside>
		);
};

export default Sidebar;
