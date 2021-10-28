import type { AppProps } from 'next/app';
import Image from 'next/image';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyles from '../styles/GlobalStyles';
import Header from '@/components/Header';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<Image
				className='bg'
				src='/images/bg.jpg'
				alt='background'
				layout='fill'
			/>

			<div className='container'>
				<Header />
				<Component {...pageProps} />
			</div>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
