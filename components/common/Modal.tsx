import React from 'react';
import styled from '@emotion/styled';
import { IoCloseSharp } from 'react-icons/io5';

import Confetti from 'react-confetti';

interface ModalProps {
	setIsDisplay: (isDisplay: boolean) => void;
	unclosable?: boolean;
	confetti?: boolean;
	children?: JSX.Element | JSX.Element[] | string | string[];
}

export default function Modal({
	children,
	unclosable,
	confetti,
	setIsDisplay,
}: ModalProps) {
	const toggleModal = () => {
		if (unclosable) {
			return;
		}
		setIsDisplay(false);
	};

	return (
		<Container>
			<Dimmer onClick={toggleModal}>
				{confetti && (
					<Confetti
						className='confetti'
						recycle={false}
						tweenDuration={5000}
						numberOfPieces={400}
						gravity={0.2}
					/>
				)}
				<ModalContent onClick={e => e.stopPropagation()}>
					{!unclosable && (
						<CloseButton onClick={toggleModal}>
							<IoCloseSharp className='close-button' size={25} />
						</CloseButton>
					)}
					{children}
				</ModalContent>
			</Dimmer>
		</Container>
	);
}

const Container = styled.div`
	.confetti {
		width: 100%;
		height: 100%;
	}
`;

const Dimmer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
	overflow: scroll;
	background-color: #000000c0;
`;

const CloseButton = styled.div`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	cursor: pointer;

	.close-button {
		color: #858585;
		transition: all 0.05s ease-in-out;

		&:hover {
			color: black;
		}
	}

	@media (max-width: 520px) {
		top: 1rem;
		right: 1rem;
	}
`;

const ModalContent = styled.div`
	position: fixed;
	left: 50vw;
	top: 50vh;
	transform: translate(-50%, -50%);
	background-color: #fefefe;
	box-shadow: 0px 1px 3px 1px #00000018;
	max-height: 90vh;
	width: max-content;
	overflow: scroll;
	border-radius: 4px;

	@media (max-width: 520px) {
		width: 90%;
	}
`;
