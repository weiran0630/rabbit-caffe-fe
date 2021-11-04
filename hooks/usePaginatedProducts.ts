import { IProduct } from './../models/interfaces/index';
import fetcher from 'utils/fetcher';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

export default function usePaginatedProducts() {
	const getKey = (pageIndex: number, previousPageData: any) => {
		if (previousPageData && !previousPageData.length) {
			return null;
		}
		if (pageIndex === 0) {
			return '/products?_limit=5&_sort=id';
		}
		if (previousPageData) {
			return `/products?_start=${
				previousPageData[previousPageData.length - 1].id
			}&_limit=5&_sort=id`;
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
		data: useMemo(() => allProducts?.flat(), [allProducts]),
		isValidating,
		setSize,
		size,
		mutate,
		error,
	};
}
