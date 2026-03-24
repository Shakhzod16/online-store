import type { User } from './types';

type UsersProps = {
	users: User[];
};

const roleStyles: Record<User['role'], string> = {
	admin: 'bg-[#fff0df] text-[#f08d21]',
	user: 'bg-[#f4efe8] text-[#3d342f]',
};

const Users = ({ users }: UsersProps) => {
	return (
		<section className='space-y-6'>
			<div>
				<h1 className='text-3xl font-semibold text-[#241f1b]'>Foydalanuvchilar</h1>
			</div>

			<div className='overflow-hidden rounded-2xl border border-[#ece4db] bg-white'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-[#efe6dd]'>
						<thead className='bg-[#fffdfa]'>
							<tr className='text-left text-sm font-semibold text-[#7b6f65]'>
								<th className='px-5 py-4'>Ism</th>
								<th className='px-5 py-4'>Email</th>
								<th className='px-5 py-4'>Rol</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-[#f2e9e1]'>
							{users.map(user => (
								<tr key={user.id} className='transition-colors hover:bg-[#fffaf4]'>
									<td className='px-5 py-4 text-xl font-medium text-[#241f1b]'>
										{user.fullName}
									</td>
									<td className='px-5 py-4 text-xl text-[#7b6f65]'>
										{user.email}
									</td>
									<td className='px-5 py-4'>
										<span
											className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium ${roleStyles[user.role]}`}>
											{user.role}
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

export default Users;
