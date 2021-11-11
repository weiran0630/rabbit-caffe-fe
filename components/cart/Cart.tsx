import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { AppContext } from 'context/AppContext';
import {
	getTotalPrice,
	handleAddAmount,
	handleReduceAmount,
} from 'functions/cartManipulate';
import Checkout from 'checkout';

export default function Cart() {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	const { cartItems, setCartItems } = useContext(AppContext);

	return (
		<Container>
			<h2 className='main-title'>您的購物車</h2>
			{cartItems.length ? (
				<>
					<table>
						<thead>
							<tr>
								<th>商品</th>
								<th>單價</th>
								<th>數量</th>
								<th className='item-total'>小計</th>
							</tr>
						</thead>

						<tbody>
							{cartItems.map(item => (
								<tr className='item' key={item.id}>
									<td className='product'>
										<ImageContainer>
											<Image
												className='item-image'
												src={
													devEnv
														? API_URL + item.image[0].url
														: item.image[0].url
												}
												alt={item.title}
												width='100'
												height='100'
											/>
										</ImageContainer>

										<div className='product-info'>
											<h4 className='title'>{item.title}</h4>
											<p className='company'>{item.company.com_name}</p>
											<p className='category'>{item.category.cate_name}</p>
											<p className='roast-level'>{item.roast_level.level}</p>
										</div>
									</td>

									<td className='price'>
										<span>${item.price}</span>
									</td>

									<td className='amount'>
										<div className='amount-control'>
											<span
												onClick={() =>
													setCartItems(handleAddAmount(item.id, cartItems))
												}>
												<AiOutlinePlus className='button' size={13} />
											</span>
											<span className='actual-no'>{item.amount}</span>
											<span
												onClick={() =>
													setCartItems(handleReduceAmount(item.id, cartItems))
												}>
												<AiOutlineMinus className='button' size={13} />
											</span>
										</div>
									</td>

									<td className='item-total'>
										<span>${item.price * item.amount}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className='checkout'>
						<div>
							<p className='cart-total'>
								<span>總金額：</span>${getTotalPrice(cartItems)}
							</p>
						</div>
					</div>

					<Checkout total={getTotalPrice(cartItems)} />
				</>
			) : (
				<div className='empty'>
					<p>購物車爲空</p>
					<p>回到商品頁立即購物～</p>
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	padding: 2rem;
	min-width: 20rem;

	.main-title {
		user-select: none;
	}

	.empty {
		color: #858585;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 3rem 0;
	}

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 1rem;

		thead th {
			user-select: none;
			color: #858585;
			font-weight: 400;
			text-align: start;
		}

		tbody {
			.product {
				display: flex;
				gap: 2rem;

				.product-info {
					max-width: 10rem;
					display: flex;
					flex-direction: column;

					p {
						color: #858585;
						font-size: 0.9rem;
						font-weight: 100;

						&.company {
							font-weight: 700;
						}
					}

					@media (max-width: 300px) {
						width: 7rem;
					}
				}
			}

			.price,
			.item-total span {
				user-select: none;
				font-weight: 600;
			}

			.amount .amount-control {
				user-select: none;
				display: flex;
				align-items: center;
				gap: 2px;

				.actual-no {
					user-select: none;
					font-weight: 600;
				}

				.button {
					color: #8585858d;
					cursor: pointer;
					position: relative;
					top: 1px;

					&:hover {
						color: black;
					}
				}
			}
		}
	}

	.checkout {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
		text-align: end;

		.cart-total {
			font-weight: 700;
			margin-bottom: 1rem;

			span {
				color: #858585;
				font-weight: 100;
			}
		}
	}

	@media (max-width: 520px) {
		.main-title {
			padding-left: 0.5rem;
		}

		min-width: max-content;
		padding: 0.5rem;

		table {
			border-spacing: 5px 1rem;
		}

		.item-total {
			display: none;
		}

		.checkout {
			padding: 0.5rem;
		}
	}
`;

const ImageContainer = styled.div`
	@media (max-width: 640px) {
		display: none;
	}
`;
