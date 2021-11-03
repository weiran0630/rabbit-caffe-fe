import { createContext } from 'react';

import { IFilter } from 'models/interfaces';

export const filterContextDefaultValue = {
	filter: {
		searchTerm: '',
		companyId: '',
		roastLevelId: '',
		categoryId: '',
		placeOriginId: '',
	} as IFilter,
	setFilter: (filter: IFilter) => {},
};

export const FilterContext = createContext(filterContextDefaultValue);
