import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import ButtonLink from '@/components/ButtonLink';
import Head from 'next/head';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Rabbit Caffee | 沒有此頁</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container>
				<Image src='/images/sus.webp' alt='sus' width='350' height='300' />
				<h1>404 | Imposter Not Found</h1>
				<ButtonLink href='/'>回到主頁</ButtonLink>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100%;
	height: 83.4vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: -2rem;

	h1 {
		font-weight: 100;
		display: flex;
		align-items: center;
		margin: -1.5rem 0 0.5rem 0;
	}
`;
