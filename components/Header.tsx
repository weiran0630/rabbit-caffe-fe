import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { SiRabbitmq } from 'react-icons/si';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSession } from 'next-auth/client';

export default function Header() {
	const [session, loading] = useSession();

	return (
		<Container>
			<HeaderStyled>
				<div className='hidden'>
					<RiShoppingCartLine size={30} />
				</div>

				<h1>
					Ra
					<span>
						<SiRabbitmq />
					</span>
					it Caffe
				</h1>

				<Cart>
					<RiShoppingCartLine size={30} />
				</Cart>
			</HeaderStyled>

			<Nav>
				<Link href='/' passHref>
					<span>主頁</span>
				</Link>

				<Link href='/product' passHref>
					<span>所有商品</span>
				</Link>

				{session ? (
					<Link href='/member' passHref>
						<span>會員專區</span>
					</Link>
				) : (
					<Link href='/login' passHref>
						<span>加入會員/登錄</span>
					</Link>
				)}
			</Nav>
		</Container>
	);
}

const Container = styled.header`
	width: 100vw;
	position: sticky;
	top: 0;
	z-index: 1;
	padding: 2rem 0rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fefefef0;
	box-shadow: 0px 1px 3px 4px rgba(0, 0, 0, 0.1);

	@media (max-width: 728px) {
		background-color: #fefefe;
	}
	@media (max-width: 384px) {
		padding: 1rem 0rem;
	}
`;

const HeaderStyled = styled.div`
	width: 100%;
	padding: 0 5vw;
	display: flex;
	align-items: center;
	justify-content: space-between;

	h1 {
		user-select: none;
		text-align: center;
		font-size: 3rem;
		font-weight: 100;

		&:hover {
			cursor: default;
		}

		@media (max-width: 384px) {
			font-size: 2rem;
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

	span {
		user-select: none;
		cursor: pointer;
		display: inline-block;
		padding: 3px 10px 5px 10px;
		border-radius: 8px;
		transition: all 0.15s ease-in-out;

		&:hover {
			color: white;
			background-color: #533a32;
		}
	}
`;

const Cart = styled.div`
	cursor: pointer;
	height: max-content;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 0.5rem;
	padding: 0.5rem;
	border-radius: 10px;
	transition: all 0.15s ease-in-out;

	&:hover {
		background-color: #553a32;
		color: white;
	}
`;
