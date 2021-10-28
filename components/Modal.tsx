import React, { useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { GrClose } from 'react-icons/gr';

interface DimmerProps {
	isDisplay: boolean;
}

interface ModalProps {
	children?: JSX.Element | JSX.Element[] | string | string[];
}

export default function Modal({ children }: ModalProps) {
	const [isDisplay, setIsDisplay] = useState(true);

	const toggleModal = (e: MouseEvent) => {
		setIsDisplay(!isDisplay);
	};

	return (
		<Dimmer
			isDisplay={isDisplay}
			onClick={e => {
				toggleModal(e);
			}}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<CloseButton
					onClick={e => {
						toggleModal(e);
					}}>
					<GrClose />
				</CloseButton>
				{children}
			</ModalContent>
		</Dimmer>
	);
}

const Dimmer = styled.div<DimmerProps>`
	display: ${p => (p.isDisplay ? 'flex' : 'none')};
	position: fixed;
	z-index: 2;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.75);
`;

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
