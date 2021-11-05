import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import fetcher from 'utils/fetcher';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';

import { IProduct } from 'models/interfaces';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import RoastLevelRepresent from '@/components/product/RoastLevelRepresent';

export const getStaticPaths: GetStaticPaths = async () => {
	const products = await fetcher<IProduct[]>('/products');

	const paths = products.map(product => {
		console.log(product.id);
		return {
			params: {
				pid: product.id.toString(),
			},
		};
	});

	return { paths, fallback: 'blocking' };
};

type GetStaticPropsType = {
	product: IProduct;
};

interface IParams extends ParsedUrlQuery {
	pid: string;
}

export const getStaticProps: GetStaticProps<GetStaticPropsType, IParams> =
	async ctx => {
		const params = ctx.params!;
		const product = await fetcher<IProduct>(`/products/${params.pid}`);

		return { props: { product } };
	};

export default function ProductDetailsPage({
	product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>Rabbit Caffee | {product.title}</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainStyled>
				<ImageContainer>
					<div>
						<Image
							className='product-detail'
							src={
								process.env.NODE_ENV === 'development'
									? process.env.NEXT_PUBLIC_API_URL + product.image[0].url
									: product.image[0].url
							}
							alt='product image'
							width='30'
							height='30'
							layout='responsive'
							priority
						/>
					</div>
				</ImageContainer>
				<Section>
					<Info>
						<h2 className='title'>{product.title}</h2>
						<h3 className='company'>{product.company.com_name}</h3>
						<RoastLevelRepresent roastLevel={product.roast_level} detail />
						<h2 className='price'>$ {product.price}</h2>
						<h4>商品描述：</h4>
						<Markdown className='description'>{product.description}</Markdown>
						<ButtonStyled>加入購物車</ButtonStyled>
					</Info>
				</Section>
			</MainStyled>
		</>
	);
}

const MainStyled = styled.main`
	width: 100vw;
	height: 70%;
	display: flex;
	align-items: center;
`;

const Section = styled.section`
	width: 50%;
	height: 70%;
	display: flex;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 50%;
	height: 100vh;

	div {
		padding: 10rem;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: -7rem;

	.title,
	.price {
		font-size: 2rem;
	}

	.company {
		color: #858585;
		font-family: 'Staatliches';
		margin-top: 0.5rem;
		font-size: 1.5rem;
	}

	.price {
		margin: 1rem 0;
	}

	.description {
		color: #858585;
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}
`;
