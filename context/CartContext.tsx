import { CartItemType } from 'models/interfaces';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const cartContextDefaultValue = {
	cartItems: [] as CartItemType[],
	setCartItems: (_: CartItemType[]) => {},
};

const CartContext = createContext(cartContextDefaultValue);

function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}

function CartProvider(props: any): JSX.Element {
	const [cartItems, setCartItems] = useState(cartContextDefaultValue.cartItems);
	const value = useMemo(() => ({ cartItems, setCartItems }), [cartItems]);

	useEffect(() => {
		const cartItemsData = JSON.parse(localStorage.getItem('cart') || '[]');

		if (cartItemsData) {
			setCartItems(cartItemsData);
		}
	}, []);

	return (
		<CartContext.Provider value={value}>{props.children}</CartContext.Provider>
	);
}

export { CartProvider, useCart };
