import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

import fetcher from 'utils/fetcher';
import getKey from 'utils/getKey';
import useFilteredProducts from 'hooks/useFilteredProducts';
import { IProduct } from 'models/interfaces';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';

interface ProductListProps {
	initialData: IProduct[];
}

export default function ProductList({ initialData }: ProductListProps) {
	const { data, setSize, size } = useSWRInfinite<IProduct[]>(getKey, fetcher, {
		initialSize: 1,
		revalidateOnFocus: false,
	});

	const products = data ? initialData.concat(...data) : initialData;
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 5);
	const filteredProducts = useFilteredProducts(products);

	return (
		<Container>
			{filteredProducts?.length && (
				<InfiniteScroll
					className='inf-scroll'
					dataLength={filteredProducts.length}
					next={() => setSize(size + 1)}
					hasMore={!isReachingEnd}
					loader={
						<div className='loader'>
							<Loader />
						</div>
					}
					endMessage={<p className='loader'>已列出所有商品</p>}>
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
		width: 100vw;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 2rem;

		.loader {
			margin: 2rem;
			color: #a5a5a58f;
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
`;
