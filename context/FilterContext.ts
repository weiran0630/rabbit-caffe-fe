import { createContext } from 'react';

import { IFilter } from 'models/interfaces';

export const filterContextDefaultValue = {
	filter: {
		searchTerm: '',
		companyId: null,
		roastLevelId: null,
		categoryId: null,
		placeOriginId: null,
	} as IFilter,
	setFilter: (filter: IFilter) => {},
};

export const FilterContext = createContext(filterContextDefaultValue);
