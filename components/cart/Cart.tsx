import styled from '@emotion/styled';
import { AppContext } from 'context/AppContext';
import { CartItemType } from 'models/interfaces';
import React, { useContext } from 'react';

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
		<Container>
			<h2>購物車</h2>
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
				<p>您的購物車爲空</p>
			)}
		</Container>
	);
}

const Container = styled.div``;
