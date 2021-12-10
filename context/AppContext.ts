import { User } from 'models/interfaces/index';
import { createContext } from 'react';
import { CartItemType, IFilter } from 'models/interfaces';

export const contextDefaultValue = {
	filter: {
		searchTerm: '',
		companyId: null,
		roastLevelId: null,
		categoryId: null,
		placeOriginId: null,
	} as IFilter,
	cartItems: [] as CartItemType[],
	setFilter: (_: IFilter) => {},
	setCartItems: (_: CartItemType[]) => {},
};

export const AppContext = createContext(contextDefaultValue);
