import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
	return (
		<section
			className='flex min-h-[calc(100vh-106px)] w-full items-center bg-cover bg-center'
			style={{
				backgroundImage: "url('https://g88-shop.lovable.app/assets/hero-bg-e0-1UkWa.jpg')",
			}}>
			<div className='h-full w-full bg-linear-to-r from-black/78 via-black/48 to-transparent'>
				<div className='mx-auto flex min-h-[calc(100vh-106px)] max-w-430 items-center px-8 py-20 lg:px-24'>
					<div className='max-w-170 text-white'>
						<h1 className='text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-[76px]'>
							Zamonaviy uslub,
							<br />
							sifatli tanlov
						</h1>

						<p className='mt-8 max-w-140 text-xl font-medium text-white/75'>
							O&apos;zbekistonning eng yaxshi onlayn do&apos;konida xarid qiling
						</p>

						<button className='mt-12! flex items-center! gap-4 rounded-full! bg-[#ec952f] px-10! py-5! text-xl font-semibold text-white transition-colors hover:bg-[#dc831d]'>
							Xarid qilish
							<FaArrowRight />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
