import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import { IoArrowBackSharp } from 'react-icons/io5';

import fetcher from 'utils/fetcher';
import { IProduct } from 'models/interfaces';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import RoastLevelRepresent from '@/components/product/RoastLevelRepresent';
import { AppContext } from 'context/AppContext';

export const getStaticPaths: GetStaticPaths = async () => {
	let products = await fetcher<IProduct[]>('/products');
	products = products.filter((_, index) => index <= 10);

	const paths = products.map(product => {
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

		return { props: { product }, revalidate: 20 };
	};

export default function ProductDetailsPage({
	product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const router = useRouter();

	const { cartItems: previousCart, setCartItems } = useContext(AppContext);

	const handleAddToCart = (clickedItem: IProduct) => {
		const isItemInCart = previousCart.find(item => item.id === clickedItem.id);

		if (isItemInCart) {
			return previousCart.map(item =>
				// if item is already in cart => amount += 1
				item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
			);
		} else {
			// if doesn't => amount = 1
			return [...previousCart, { ...clickedItem, amount: 1 }];
		}
	};

	return (
		<>
			<Head>
				<title>Rabbit Caffee | {product.title}</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Container>
				<IoArrowBackSharp
					className='back-button'
					size={30}
					onClick={() => router.back()}
				/>

				<ImageContainer>
					<div>
						<Image
							className='product-detail'
							src={
								devEnv ? API_URL + product.image[0].url : product.image[0].url
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

						<ButtonStyled
							onClick={() => setCartItems(handleAddToCart(product))}>
							加入購物車
						</ButtonStyled>

						<h4 className='description'>內容量：</h4>
						<p className='actual-desc'>{product.unit}</p>
						<h4 className='description'>商品描述：</h4>
						<Markdown className='actual-desc'>{product.description}</Markdown>
					</Info>
				</Section>
			</Container>
		</>
	);
}

const Container = styled.main`
	position: relative;
	width: 100vw;
	display: flex;
	flex-wrap: wrap;
	padding: 3rem;

	.back-button {
		cursor: pointer;
		user-select: none;
		position: absolute;
		z-index: 2;
		top: 2rem;
		left: 2rem;
		margin: 3rem;

		@media (max-width: 879px) {
			margin: 0;
		}
	}

	@media (max-width: 1457px) {
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2rem;
	}
`;

const Section = styled.section`
	width: 50%;
	display: flex;
	justify-content: center;
	padding: 3rem;

	@media (max-width: 1457px) {
		width: 100%;
	}
	@media (max-width: 700px) {
		padding: 0;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 50%;
	height: 70%;

	div {
		width: 40rem;
	}

	@media (max-width: 1457px) {
		width: 100%;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;

	.title,
	.price {
		font-size: 2.5rem;

		@media (max-width: 700px) {
			font-size: 2rem;
		}
	}

	.company {
		color: #858585;
		font-family: 'Staatliches';
		margin-top: 0.5rem;
		font-size: 2rem;
	}

	.price {
		margin: 1rem 0 2rem 0;
	}

	.description {
		margin-top: 2rem;
	}

	.actual-desc {
		color: #858585;
		font-size: 0.9rem;
		/* margin-bottom: 2rem; */
	}
`;
