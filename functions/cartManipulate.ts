import { CartItemType } from 'models/interfaces';

export const handleAddAmount = (id: number, previousCart: CartItemType[]) => {
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

export const handleReduceAmount = (
	id: number,
	previousCart: CartItemType[]
) => {
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

export const getTotalPrice = (cartItems: CartItemType[]) => {
	return cartItems.reduce(
		(accumulator, item) => (accumulator += item.price * item.amount),
		0
	);
};
