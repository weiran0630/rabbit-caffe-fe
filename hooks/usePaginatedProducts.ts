import { IProduct } from './../models/interfaces/index';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export default function usePaginatedProducts() {
	const getKey = (pageIndex: number, previousPageData: IProduct[] | null) => {
		if (previousPageData && !previousPageData.length) {
			return null;
		}
		if (pageIndex === 0) {
			return `/beans?_limit=10`;
		}
		if (previousPageData) {
			return `/beans?_start=${
				previousPageData[previousPageData.length - 1].id
			}&_limit=10`;
		}
		return null;
	};

	const {
		data: allProducts,
		isValidating,
		setSize,
		size,
		mutate,
		error,
	} = useSWRInfinite<IProduct[]>(getKey, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return {
		data: allProducts?.flat(),
		isValidating,
		setSize,
		size,
		mutate,
		error,
	};
}
