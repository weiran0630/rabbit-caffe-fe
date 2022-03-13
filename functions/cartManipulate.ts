import type { CartItemType, IProduct } from 'models/interfaces';

export const handleAddToCart = (
	clickedItem: IProduct,
	previousCart: CartItemType[] = []
) => {
	const isItemInCart = previousCart.find(item => item.id === clickedItem.id);
	let currentCart;

	if (isItemInCart) {
		// if item is already in cart => amount += 1
		currentCart = previousCart.map(item =>
			item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
		);
	} else {
		// if doesn't => amount = 1
		currentCart = [...previousCart, { ...clickedItem, amount: 1 }];
	}

	localStorage.setItem('cart', JSON.stringify(currentCart));

	return currentCart;
};

export const handleAddAmount = (
	id: number,
	previousCart: CartItemType[] = []
) => {
	const currentCart = previousCart.reduce((accumulator, item) => {
		// for the item that is clicked on
		if (item.id === id) {
			// return a array with clicked item amount + 1
			return [...accumulator, { ...item, amount: item.amount + 1 }];
		} else {
			// do nothing for other items
			return [...accumulator, item];
		}
	}, [] as CartItemType[]);

	localStorage.setItem('cart', JSON.stringify(currentCart));

	return currentCart;
};

export const handleReduceAmount = (
	id: number,
	previousCart: CartItemType[]
) => {
	const currentCart = previousCart.reduce((accumulator, item) => {
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

	localStorage.setItem('cart', JSON.stringify(currentCart));

	return currentCart;
};

export const getTotalPrice = (cartItems: CartItemType[] = []) => {
	return cartItems.reduce(
		(accumulator, item) => (accumulator += item.price * item.amount),
		0
	);
};
