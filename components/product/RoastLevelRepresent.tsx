import React from 'react';
import styled from '@emotion/styled';

import { IRoastLevel } from 'models/interfaces';

interface RoastLevelRepresentProps {
	roastLevel: IRoastLevel;
}

export default function RoastLevelRepresent({
	roastLevel,
}: RoastLevelRepresentProps) {
	const roastColor = ['#f2c088', '#e59c4f', '#a76a32', '#5d341a', '#30170f'];

	let circleArr = [];
	for (let i = 0; i <= parseInt(roastLevel.id) - 1; i++) {
		circleArr.push(<Circle color={roastColor[i]} key={i} />);
	}

	return (
		<Container>
			{circleArr}
			<span>{roastLevel.level}</span>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	margin: 0.3rem 0;
	gap: 0.1rem;

	span {
		font-size: 0.8rem;
		margin-left: 0.2rem;
	}
`;

interface CircleProps {
	color: string;
}

const Circle = styled.div<CircleProps>`
	width: 0.9rem;
	height: 0.9rem;
	background-color: ${props => props.color};
	border-radius: 50%;
`;
