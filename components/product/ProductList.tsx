import React from 'react';
import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProductCard from './ProductCard';
import usePaginatedProducts from 'hooks/usePaginatedProducts';
import useFilteredProducts from 'hooks/useFilteredProducts';

export default function ProductList() {
	const { data: products, setSize, size } = usePaginatedProducts();
	const filteredProducts = useFilteredProducts(products);

	return (
		<Container>
			{filteredProducts?.length ? (
				<InfiniteScroll
					className='inf-scroll'
					dataLength={filteredProducts.length}
					scrollThreshold={0.5}
					next={() => setSize(size + 1)}
					hasMore={!!products}
					loader={null}>
					{filteredProducts?.map(product => (
						<ProductCard product={product} key={product.id} />
					))}
				</InfiniteScroll>
			) : (
				<p>暫時沒有商品</p>
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
