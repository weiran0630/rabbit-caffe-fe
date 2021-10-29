import React from 'react';
import styled from '@emotion/styled';
import { GrClose } from 'react-icons/gr';

import { Dimmer } from './Dimmer';
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
	);
}

const CloseButton = styled.div`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	cursor: pointer;
`;

const ModalContent = styled.div`
	position: relative;
	background-color: #fefefe;
	box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.3);
	padding: 2rem;
	width: 60%;
	border-radius: 8px;
`;
