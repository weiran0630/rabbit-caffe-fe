import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';

import { AppContext, contextDefaultValue } from 'context/AppContext';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@/components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [filter, setFilter] = useState(contextDefaultValue.filter);
	const [cartItems, setCartItems] = useState(contextDefaultValue.cartItems);

	return (
		<AuthProvider session={pageProps.session}>
			<GlobalStyles />
			<AppContext.Provider
				value={{ filter, cartItems, setFilter, setCartItems }}>
				<Header />
				<Component {...pageProps} />
			</AppContext.Provider>
		</AuthProvider>
	);
};

export default MyApp;
