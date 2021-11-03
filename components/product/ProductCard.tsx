import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { IoPricetagSharp } from 'react-icons/io5';

import { IProduct } from 'models/interfaces';
import RoastLevelRepresent from './RoastLevelRepresent';

interface ProductCardProps {
	product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Card>
			<div className='top'>
				<ImageContainer>
					<Image
						className='product-image'
						src={`${process.env.NEXT_PUBLIC_API_URL}${product.image[0].url}`}
						layout='fill'
						alt='product image'
					/>
				</ImageContainer>
				<h4>{product.title}</h4>
			</div>

			<div className='bottom'>
				<RoastLevelRepresent roastLevel={product.roast_level} />
				<p className='price'>
					<IoPricetagSharp /> ${product.price}
				</p>
			</div>
		</Card>
	);
}

const Card = styled.div`
	width: 15rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 4px;
	background-color: #fefefedf;
	backdrop-filter: grayscale(0.5) opacity(0.1);
	box-shadow: 0px 1px 3px 1px #00000018;

	.top {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
		overflow: hidden;

		h4 {
			font-variant: small-caps;
			margin: 0 0.5rem;
		}
	}

	.bottom {
		margin: 0 0.5rem 0.5rem 0.5rem;

		.price {
			display: inline-flex;
			align-items: center;
			gap: 0.2rem;
			font-weight: 700;
		}
	}
`;

const ImageContainer = styled.div`
	position: relative;
	aspect-ratio: 1 / 1;
`;
