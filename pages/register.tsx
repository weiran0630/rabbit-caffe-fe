import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import RegisterForm from '@/components/form/register/RegisterForm';

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
		width: 30rem;
		padding: 2rem;
		border: 1px solid #e9e9e9ab;
		border-radius: 4px;
		background-color: #fefefedf;
		box-shadow: 0px 1px 3px 0px #0000000e;

		@media (max-width: 520px) {
			width: 100%;
		}
	}
`;
