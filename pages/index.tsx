import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';

import ButtonLink from '@/components/ButtonLink';
import Modal from '@/components/Modal';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Rabbit Caffee | 主頁</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<MainStyled>
				<Section>
					<h2>
						{"Today's"}
						<br />
						GOOD MOOD
						<br />
						proudly
						<br />
						sponsored by
						<br />
						GOOD COFFEE
					</h2>

					<ButtonLink href='/product'>開始探索</ButtonLink>
				</Section>

				<ImageContainer>
					<div className='dimmer' />
					<Image
						className='hero-image'
						src='/images/hero-image.jpg'
						alt=' '
						layout='fill'
						priority
					/>
				</ImageContainer>
			</MainStyled>
		</>
	);
};

const MainStyled = styled.div`
	width: 100vw;
	height: 83.9vh;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 728px) {
		position: relative;
		display: block;
	}
`;

const Section = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	padding: 0 5vw 0 10vw;
	gap: 2rem;

	h2 {
		user-select: none;
		font-family: 'Staatliches', cursive;
		font-size: 3rem;
		cursor: default;
	}

	@media (max-width: 728px) {
		position: fixed;
		display: flex;
		justify-content: center;
		color: white;
		width: 100%;
		height: 83.9vh;
		z-index: 2;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 50%;
	height: 83.9vh;

	@media (max-width: 728px) {
		width: 100%;
		height: 87.2vh;

		.dimmer {
			position: fixed;
			z-index: 1;
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
`;

export default Home;
