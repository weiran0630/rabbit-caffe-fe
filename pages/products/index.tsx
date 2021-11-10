import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import styled from '@emotion/styled';

import fetcher from 'functions/fetcher';
import FilterBy from '@/components/product/FilterBy';
import ProductList from '@/components/product/ProductList';
import { ICategory, IProduct, IRoastLevel } from 'models/interfaces';
import CategoryImageContainer from '@/components/product/CategoryImageContainer';

export const getStaticProps: GetStaticProps = async () => {
	const products = await fetcher<IProduct[]>('/products?_limit=6&_sort=id');
	const roastLevels = await fetcher<IRoastLevel[]>('/roast-levels?_sort=id');
	const categories = await fetcher<ICategory[]>('/categories');

	return {
		props: {
			fallback: {
				'/products?_limit=6&_sort=id': products,
				'/roast-levels?_sort=id': roastLevels,
				'/categories': categories,
			},
			products,
		},
	};
};

export default function Products({
	fallback,
	products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>Rabbit Caffee | 所有商品</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container>
				<SWRConfig value={{ fallback }}>
					<CategoryImageContainer />
					<div className='content'>
						<FilterBy />
						<ProductList initialData={products} />
					</div>
				</SWRConfig>
			</Container>
		</>
	);
}

const Container = styled.div`
	.content {
		width: 100vw;
		display: flex;
		padding: 2rem 4rem;

		@media (max-width: 566px) {
			flex-direction: column;
		}
	}
`;
