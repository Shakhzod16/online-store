import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/admin/Admin';
import ProductDetail from './Pages/ProductDetail';
import ProductsPage from './Pages/ProductsPage';
import CategoriesPage from './Pages/CategoriesPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/products' element={<ProductsPage />} />
			<Route path='/categories' element={<CategoriesPage />} />
			<Route path='/products/:id' element={<ProductDetail />} />
			<Route path='/admin' element={<Admin />} />
		</Routes>
	);
}

export default App;
