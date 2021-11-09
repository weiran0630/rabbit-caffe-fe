import styled from '@emotion/styled';
import { AppContext } from 'context/AppContext';
import { CartItemType } from 'models/interfaces';
import React, { useContext } from 'react';
import ButtonLink from '../common/ButtonLink';

export default function Cart() {
	const { cartItems: previousCart, setCartItems } = useContext(AppContext);

	const handleAddAmount = (id: number) => {
		return previousCart.reduce((accumulator, item) => {
			// for the item that is clicked on
			if (item.id === id) {
				// return a array with clicked item amount + 1
				return [...accumulator, { ...item, amount: item.amount + 1 }];
			} else {
				// do nothing for other items
				return [...accumulator, item];
			}
		}, [] as CartItemType[]);
	};

	const handleReduceAmount = (id: number) => {
		return previousCart.reduce((accumulator, item) => {
			// for the item that is clicked on
			if (item.id === id) {
				/** if amount is 1,
					  exclude the item from array (remove the item from cart) */
				if (item.amount === 1) return accumulator;
				// return a array with clicked item amount - 1
				return [...accumulator, { ...item, amount: item.amount - 1 }];
			} else {
				// do nothing for other items
				return [...accumulator, item];
			}
		}, [] as CartItemType[]);
	};

	return (
		<>
			<Container>
				{previousCart.length ? (
					previousCart.map(item => (
						<p key={item.id}>
							{item.title}{' '}
							<button onClick={() => setCartItems(handleAddAmount(item.id))}>
								+1
							</button>
							{item.amount}
							<button onClick={() => setCartItems(handleReduceAmount(item.id))}>
								-1
							</button>
						</p>
					))
				) : (
					<div className='empty'>
						<p>您的購物車爲空</p>
						<p>回到商品頁立即購物～</p>
					</div>
				)}
			</Container>
		</>
	);
}

const Container = styled.div`
	padding: 2rem;

	.empty {
		color: #858585;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;
