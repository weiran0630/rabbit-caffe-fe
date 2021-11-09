import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useSession } from 'next-auth/client';
import { SiRabbitmq } from 'react-icons/si';
import {
	IoPersonCircleSharp,
	IoHomeSharp,
	IoCafeSharp,
	IoCartSharp,
} from 'react-icons/io5';

import ProductHeader from '@/components/product/ProductHeader';
import Modal from './common/Modal';
import Cart from './cart/Cart';
import { AppContext } from 'context/AppContext';
import { CartItemType } from 'models/interfaces';

export default function Header() {
	const router = useRouter();
	const [session, _] = useSession();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const { cartItems } = useContext(AppContext);

	const getTotalAmount = (allItems: CartItemType[]) => {
		return allItems.reduce(
			(accumulator, item) => (accumulator += item.amount),
			0
		);
	};

	return (
		<>
			{isCartOpen && (
				<Modal setIsDisplay={setIsCartOpen}>
					<Cart />
				</Modal>
			)}

			<Container>
				<HeaderStyled>
					<h1>
						Ra
						<span>
							<SiRabbitmq />
						</span>
						it Caffe
					</h1>
				</HeaderStyled>

				<Nav>
					<Link href='/' passHref shallow>
						<span className='clickable'>
							<IoHomeSharp className='logo' size={20} />
							<span>主頁</span>
						</span>
					</Link>

					<Link href='/products' passHref shallow>
						<span className='clickable'>
							<IoCafeSharp size={20} />
							<span>所有商品</span>
						</span>
					</Link>

					{session ? (
						<Link href='/member' passHref shallow>
							<span className='clickable'>
								<IoPersonCircleSharp size={20} />
								<span>會員專區</span>
							</span>
						</Link>
					) : (
						<Link href='/login' passHref shallow>
							<span className='clickable'>
								<IoPersonCircleSharp size={20} />
								<span>加入會員/登錄</span>
							</span>
						</Link>
					)}

					<span
						className='clickable'
						onClick={() => setIsCartOpen(!isCartOpen)}>
						<span
							className={`has-badge ${
								getTotalAmount(cartItems) > 0 && 'active'
							}`}
							data-count={getTotalAmount(cartItems)}>
							<IoCartSharp size={20} />
						</span>

						<span>購物車</span>
					</span>
				</Nav>

				{router.pathname.match(/\/products$/) && <ProductHeader />}
			</Container>
		</>
	);
}

const Container = styled.header`
	width: 100vw;
	position: sticky;
	top: 0;
	z-index: 3;
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: #fefefee0;
	backdrop-filter: blur(8px);
	box-shadow: 0px 1px 3px 1px #00000018;

	@media (max-width: 728px) {
		background-color: #fefefe;
	}
`;

const HeaderStyled = styled.div`
	width: 100%;
	padding: 0 5vw 1rem 5vw;
	display: flex;
	align-items: center;
	justify-content: center;

	h1 {
		user-select: none;
		text-align: center;
		font-size: 3rem;
		font-weight: 100;

		&:hover {
			cursor: default;
		}

		@media (max-width: 384px) {
			font-size: 2.5rem;
		}
	}

	.hidden {
		visibility: hidden;
		padding: 0.5rem;
	}
`;

const Nav = styled.nav`
	display: flex;
	gap: 1.2rem;
	padding-bottom: 1rem;

	.clickable {
		user-select: none;
		cursor: pointer;
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
		padding: 3px 10px 5px 10px;
		border-radius: 6px;
		transition: all 0.07s ease-in-out;

		&:hover {
			color: white;
			background-color: #533a3268;
		}

		@media (max-width: 559px) {
			padding: 10px;
			span {
				display: none;
			}
		}
		.has-badge {
			position: relative;
			display: flex;
			align-items: center;

			&.active[data-count]:after {
				content: attr(data-count);
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				top: -50%;
				right: -50%;
				font-size: 0.5rem;
				height: 1rem;
				width: 1rem;
				padding: 2px 2px 3px 2px;
				border-radius: 50%;
				color: #fff;
				background: #f10000f0;
				font-weight: bold;
			}
		}
	}
	@media (max-width: 559px) {
		width: 100%;
		justify-content: space-between;
		padding: 0 3rem 1rem 3rem;
	}
`;
