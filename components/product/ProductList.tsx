import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

import fetcher from 'utils/fetcher';
import getKey from 'utils/getKey';
import useFilteredProducts from 'hooks/useFilteredProducts';
import { IProduct } from 'models/interfaces';
import ProductCard from './ProductCard';

interface ProductListProps {
	initialData: IProduct[];
}

export default function ProductList({ initialData }: ProductListProps) {
	const { data, setSize, size } = useSWRInfinite<IProduct[]>(getKey, fetcher, {
		fallbackData: [initialData],
	});
	const allProducts = useMemo(() => data?.flat(), [data]);
	const filteredProducts = useFilteredProducts(allProducts);

	return (
		<Container>
			{filteredProducts?.length && (
				<InfiniteScroll
					className='inf-scroll'
					dataLength={filteredProducts.length}
					scrollThreshold={0.5}
					next={() => setSize(size + 1)}
					hasMore={!!data}
					loader={null}>
					{filteredProducts?.map(product => (
						<ProductCard product={product} key={product.id} />
					))}
				</InfiniteScroll>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;

	.inf-scroll {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
	}
`;
