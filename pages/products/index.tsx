import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import fetcher from 'utils/fetcher';
import ProductList from '@/components/product/ProductList';
import { IProduct, IRoastLevel } from 'models/interfaces';

export const getStaticProps: GetStaticProps = async () => {
	const products = await fetcher<IProduct[]>('/products?_limit=5&_sort=id');
	const categories = await fetcher<IRoastLevel[]>('/categories');

	return {
		props: {
			fallback: {
				'/products?_limit=5&_sort=id': products,
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

			<SWRConfig value={{ fallback }}>
				<ProductList initialData={products} />
			</SWRConfig>
		</>
	);
}
