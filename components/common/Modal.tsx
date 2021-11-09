import React from 'react';
import styled from '@emotion/styled';
import { GrClose } from 'react-icons/gr';

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
		<>
			<Dimmer onClick={toggleModal}>
				{confetti && (
					<Confetti
						recycle={false}
						tweenDuration={5000}
						numberOfPieces={400}
						gravity={0.2}
					/>
				)}
				<ModalContent onClick={e => e.stopPropagation()}>
					{!unclosable && (
						<CloseButton onClick={toggleModal}>
							<GrClose />
						</CloseButton>
					)}

					{children}
				</ModalContent>
			</Dimmer>
		</>
	);
}

const Dimmer = styled.div`
	position: fixed;
	z-index: 99;
	width: 100%;
	height: 100%;
	background-color: #000000c0;
`;

const CloseButton = styled.div`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	cursor: pointer;
`;

const ModalContent = styled.div`
	position: relative;
	left: 50vw;
	top: 50vh;
	transform: translate(-50%, -50%);
	background-color: #fefefe;
	box-shadow: 0px 1px 3px 1px #00000018;
	padding: 2rem;
	width: 30rem;

	border-radius: 4px;
`;
