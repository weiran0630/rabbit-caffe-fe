import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { IProduct } from './../models/interfaces/index';
import { SiOrigin } from 'react-icons/si';
export default function useFilteredProducts(
	allProducts: IProduct[] | undefined
): IProduct[] | undefined {
	const {
		filter: { categoryId, companyId, placeOriginId, roastLevelId, searchTerm },
	} = useContext(AppContext);

	if (!allProducts) return undefined;

	let filteredProducts: IProduct[] = allProducts;

	if (categoryId) {
		filteredProducts = filteredProducts.filter(
			product => product.category.id === categoryId
		);
	}
	if (companyId) {
		filteredProducts = filteredProducts.filter(
			product => product.company.id === companyId
		);
	}
	if (placeOriginId) {
		filteredProducts = filteredProducts.filter(product =>
			product.place_origins.find(origin => placeOriginId === origin.id)
		);
	}
	if (roastLevelId) {
		filteredProducts = filteredProducts.filter(
			product => product.roast_level.id === roastLevelId
		);
	}
	if (searchTerm) {
		filteredProducts = filteredProducts.filter(product =>
			product.title.includes(searchTerm)
		);
	}

	return filteredProducts;
}
