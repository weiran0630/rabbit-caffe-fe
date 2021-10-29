import RegisterForm from '@/components/form/register/RegisterForm';
import styled from '@emotion/styled';
import Head from 'next/head';
import React from 'react';

export default function Login() {
	return (
		<>
			<Head>
				<title>Rabbit Caffee | 註冊</title>
				{/* <meta name='description' content='' /> */}
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container>
				<div className='content'>
					<RegisterForm />
				</div>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100vw;
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.content {
		width: 50vw;
		padding: 2rem;
		border: 1px solid #a7a7a745;
		border-radius: 8px;
		background-color: #fefefef0;
		box-shadow: 0px 1px 3px 0px #0000000f;

		@media (max-width: 679px) {
			width: 100%;
		}
	}
`;
