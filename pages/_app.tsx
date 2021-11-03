import React, { useContext, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';

import GlobalStyles from '../styles/GlobalStyles';
import Header from '@/components/Header';
import {
	FilterContext,
	filterContextDefaultValue,
} from 'context/FilterContext';

export default function MyApp({ Component, pageProps }: AppProps) {
	const [filter, setFilter] = useState(filterContextDefaultValue.filter);

	return (
		<>
			<GlobalStyles />
			<AuthProvider session={pageProps.session}>
				<FilterContext.Provider value={{ filter, setFilter }}>
					<Header />
					<Component {...pageProps} />
				</FilterContext.Provider>
			</AuthProvider>
		</>
	);
}
