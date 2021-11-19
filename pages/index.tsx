import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import imgSrc from 'public/images/hero-image.jpg';

import useLocale from 'hooks/useLocale';
import ButtonLink from '@/components/common/ButtonLink';
import Modal from '@/components/common/Modal';
import CheckoutSuccess from '@/components/checkout/CheckoutSuccess';

export default function Home() {
	const router = useRouter();
	const t = useLocale();
	const [isModalOpen, setIsModalOpen] = useState(true);

	return (
		<>
			<Head>
				<title>Rabbit Caffee | 主頁</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{router.query.redirect_status === 'succeeded' && isModalOpen && (
				<Modal confetti setIsDisplay={setIsModalOpen}>
					<CheckoutSuccess setIsDisplay={setIsModalOpen} />
				</Modal>
			)}

			<Container>
				<Section>
					<div>
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

						<ButtonLink href='/products'>{t.homepage.button}</ButtonLink>
					</div>
				</Section>

				<ImageContainer>
					<Image
						className='hero-image'
						src={imgSrc}
						alt=' '
						layout='fill'
						quality='25'
						placeholder='blur'
						priority
					/>
				</ImageContainer>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 728px) {
		position: relative;
		display: block;
	}
`;

const Section = styled.section`
	width: 50%;
	height: 70%;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 2rem;

	div h2 {
		margin-bottom: 1rem;
		user-select: none;
		font-family: 'Staatliches', cursive;
		font-size: 4rem;
		cursor: default;
	}

	@media (max-width: 728px) {
		position: fixed;
		display: flex;
		justify-content: center;
		color: white;
		background-color: #0000005f;
		width: 100%;
		height: 90vh;
		z-index: 1;

		div h2 {
			font-size: 3.1rem;
		}
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 50%;
	height: 100vh;

	@media (max-width: 728px) {
		width: 100%;
		height: 90vh;
	}
`;
