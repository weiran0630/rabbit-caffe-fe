import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';
import { FilterProvider } from 'context/FilterContext';
import GlobalStyles from 'styles/GlobalStyles';
import Header from '@/components/Header';
import { CartProvider } from 'context/CartContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<AuthProvider session={pageProps.session}>
			<GlobalStyles />
			<CartProvider>
				<FilterProvider>
					<Header />
					<Component {...pageProps} />
				</FilterProvider>
			</CartProvider>
		</AuthProvider>
	);
};

export default MyApp;
