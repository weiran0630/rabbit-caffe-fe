import { createContext, useContext, useState, useMemo } from 'react';
import { IFilter } from 'models/interfaces';

const filterContextDefaultValue = {
	filter: {
		searchTerm: '',
		companyId: null,
		roastLevelId: null,
		categoryId: null,
		placeOriginId: null,
	} as IFilter,
	setFilter: (_: IFilter) => {},
};

const FilterContext = createContext(filterContextDefaultValue);

function useFilter() {
	const context = useContext(FilterContext);
	if (context === undefined) {
		throw new Error('useFilter must be used within a FilterProvider');
	}
	return context;
}

function FilterProvider(props: any): JSX.Element {
	const [filter, setFilter] = useState(filterContextDefaultValue.filter);
	const value = useMemo(() => ({ filter, setFilter }), [filter]);
	return (
		<FilterContext.Provider value={value}>
			{props.children}
		</FilterContext.Provider>
	);
}

export { FilterProvider, useFilter };
