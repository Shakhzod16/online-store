import Banner from '../assets/components/Banner';
import Categorys from '../assets/components/Categorys';
import Footer from '../assets/components/Footer';
import Header from '../assets/components/Header';
import Hero from '../assets/components/Hero';
import Products from '../assets/components/Products';
import { storeProducts } from '../data/storeCatalog';

const Home = () => {
	const products = storeProducts;
	const isLoading = false;
	const error = '';

	return (
		<div className='w-full bg-[#fbfaf8]'>
			<Header />

			<main className='w-full pt-26.5'>
				<Hero />

				<div className='mx-auto max-w-430 px-4 py-12 sm:px-8 lg:px-24'>
					<Categorys products={products} isLoading={isLoading} error={error} />
					<Products products={products} isLoading={isLoading} error={error} />
					<Banner />
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Home;
