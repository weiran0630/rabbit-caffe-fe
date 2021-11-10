import React from 'react';
import styled from '@emotion/styled';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

import fetcher from 'functions/fetcher';
import getKey from 'functions/getKey';
import { IProduct } from 'models/interfaces';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import useFilteredProducts from 'hooks/useFilteredProducts';

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
			{filteredProducts ? (
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
					endMessage={<p className='loader'>已列出所有商品</p>}
					scrollThreshold={0.2}>
					{filteredProducts?.map(product => (
						<ProductCard product={product} key={product.id} />
					))}
				</InfiniteScroll>
			) : (
				<div className='loader'>
					<Loader />
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	.inf-scroll {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;

		.loader {
			margin: 2rem;
			color: #a5a5a5;
			width: 100%;
			display: flex;
			justify-content: center;
		}

		@media (max-width: 566px) {
			justify-content: center;
		}
	}
`;
