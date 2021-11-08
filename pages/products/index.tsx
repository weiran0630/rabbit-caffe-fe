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
	const products = await fetcher<IProduct[]>('/products?_limit=10&_sort=id');

	return {
		props: {
			fallback: {
				'/products?_limit=10&_sort=id': products,
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
