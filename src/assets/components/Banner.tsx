import { FaArrowRight } from 'react-icons/fa';

function Banner() {
	return (
		<section className='py-10 sm:py-14'>
			<div className='relative overflow-hidden rounded-[28px] border border-[#3a2d29] bg-[#1f1918] px-6 py-20 text-center sm:px-10 sm:py-24'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_45%)]' />

				<div className='relative mx-auto max-w-180'>
					<h2 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
						Maxsus takliflar kutmoqda!
					</h2>

					<p className='mx-auto mt-6 max-w-160 text-xl leading-9 text-[#d5cdc5]'>
						Yangi kolleksiyamiz bilan tanishing va 20% gacha chegirma oling
					</p>

					<button
						type='button'
						className='mt-10 inline-flex items-center! gap-4 rounded-full! bg-[#ec952f] px-10! py-5! text-xl font-semibold text-white transition-colors hover:bg-[#da811a]'
					>
						Hozir xarid qiling
						<FaArrowRight />
					</button>
				</div>
			</div>
		</section>
	);
}

export default Banner;
