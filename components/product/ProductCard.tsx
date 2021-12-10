import Image from 'next/image';
import styled from '@emotion/styled';
import { IoPricetagSharp } from 'react-icons/io5';
import { IProduct } from 'models/interfaces';
import RoastLevelRepresent from './RoastLevelRepresent';
import { useRouter } from 'next/router';

interface ProductCardProps {
	product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const router = useRouter();

	const imgSrc = devEnv ? API_URL + product.image[0].url : product.image[0].url;

	return (
		<Card onClick={() => router.push(`/products/${product.id}`)}>
			<div className='top'>
				<div className='img-container'>
					<Image
						className='product-image'
						src={imgSrc}
						layout='fill'
						alt='product image'
						quality={25}
					/>
				</div>
				<h4>{product.title}</h4>
			</div>

			<div className='bottom'>
				<RoastLevelRepresent roastLevel={product.roast_level} />

				<p className='price'>
					<IoPricetagSharp /> $ {product.price} TWD
				</p>
			</div>
		</Card>
	);
}

const Card = styled.div`
	cursor: pointer;
	width: 15rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.top {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
		overflow: hidden;

		.img-container {
			position: relative;
			aspect-ratio: 1 / 1;
		}

		h4 {
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
