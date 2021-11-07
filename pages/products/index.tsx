import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import fetcher from 'utils/fetcher';
import ProductList from '@/components/product/ProductList';
import { IProduct, IRoastLevel } from 'models/interfaces';
import FilterBy from '@/components/product/FilterBy';
import styled from '@emotion/styled';

export const getStaticProps: GetStaticProps = async () => {
	const products = await fetcher<IProduct[]>('/products?_limit=5&_sort=id');
	const categories = await fetcher<IRoastLevel[]>('/categories?_sort=id');
	const placeOrigins = await fetcher('/place-origins?_sort=id');
	const roastLevels = await fetcher('/roast-levels?_sort=id');
	const companies = await fetcher('/companies?_sort=id');

	return {
		props: {
			fallback: {
				'/products?_limit=5&_sort=id': products,
				'/categories?_sort=id': categories,
				'/place-origins?_sort=id': placeOrigins,
				'/roast-levels?_sort=id': roastLevels,
				'/companies?_sort=id': companies,
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
					<FilterBy />
					<ProductList initialData={products} />
				</SWRConfig>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100vw;
	display: flex;
	padding: 2rem;

	@media (max-width: 566px) {
		flex-direction: column;
	}
`;
