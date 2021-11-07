import React, { useContext } from 'react';
import useSWRImmutable from 'swr/immutable';

import { FilterContext } from 'context/FilterContext';
import fetcher from 'utils/fetcher';

export default function FilterBy() {
	const {
		filter: { categoryId, ...filter },
		setFilter,
	} = useContext(FilterContext);
	const { data: categories } = useSWRImmutable('/categories', fetcher);

	return <div></div>;
}
