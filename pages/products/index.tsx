import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import styled from '@emotion/styled';

import fetcher from 'utils/fetcher';
import ProductList from '@/components/product/ProductList';
import { IProduct, IRoastLevel } from 'models/interfaces';

export const getStaticProps: GetStaticProps = async () => {
	const products = await fetcher<IProduct[]>('/products?_limit=10');
	const categories = await fetcher<IRoastLevel[]>('/categories');

	return {
		props: {
			fallback: {
				'/products?_limit=10': products,
				'/categories': categories,
			},
		},
	};
};

export default function Products({
	fallback,
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
					<ProductList />
				</SWRConfig>
			</Container>
		</>
	);
}

const Container = styled.div`
	position: relative;
	min-height: 100vh;
`;
