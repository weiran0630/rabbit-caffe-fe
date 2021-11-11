import React from 'react';
import styled from '@emotion/styled';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import { ButtonStyled } from '@/components/common/ButtonStyled';

interface CheckoutSuccess {
	setIsDisplay: (isDisplay: boolean) => void;
}

export default function CheckoutSuccess({ setIsDisplay }: CheckoutSuccess) {
	return (
		<Container>
			<IoCheckmarkCircleSharp size={100} className='success-icon' />
			<h2>付款成功</h2>
			<ButtonStyled onClick={() => setIsDisplay(false)}>關閉提示</ButtonStyled>
		</Container>
	);
}

const Container = styled.div`
	padding: 2rem;
	width: 20rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	.success-icon {
		color: #35d835;
		border-radius: 50%;
		border: 1px solid #a7a7a778;
	}

	h2 {
		color: black;
	}

	p span {
		font-weight: 100;
	}

	@media (max-width: 520px) {
		width: 100%;
	}
`;
