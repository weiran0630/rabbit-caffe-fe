import { IProduct } from 'models/interfaces';

export default function getKey(
	pageIndex: number,
	previousPageData: IProduct[] | null
) {
	if (previousPageData && !previousPageData.length) return null;

	if (pageIndex === 0) return '/products?_limit=5&_sort=id';

	if (previousPageData) {
		return `/products?_start=${
			previousPageData[previousPageData.length - 1].id
		}&_limit=5&_sort=id`;
	}

	return null;
}
