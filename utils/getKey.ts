import { IProduct } from 'models/interfaces';

export default function getKey(
	pageIndex: number,
	previousPageData: IProduct[] | null
) {
	if (previousPageData && !previousPageData.length) return null;

	if (pageIndex === 0) return '/products?_start=6&_limit=6&_sort=id';

	if (previousPageData) {
		return `/products?_start=${
			previousPageData[previousPageData.length - 1].id - 1
		}&_limit=6&_sort=id`;
	}

	return null;
}
