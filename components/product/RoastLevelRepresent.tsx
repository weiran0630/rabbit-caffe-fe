import React from 'react';
import styled from '@emotion/styled';
import useSWRImmutable from 'swr/immutable';
import { IRoastLevel } from 'models/interfaces';
import fetcher from 'functions/fetcher';

interface RoastLevelRepresentProps {
	roastLevel: IRoastLevel;
	detail?: boolean;
}

export default function RoastLevelRepresent({
	roastLevel,
	detail,
}: RoastLevelRepresentProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const roastColor = ['#f2c088', '#e59c4f', '#a76a32', '#5d341a', '#30170f'];

	const { data: roastLevels } = useSWRImmutable<IRoastLevel[]>(
		'/roast-levels?_sort=id',
		fetcher
	);

	let circleArr = [];

	if (roastLevels) {
		for (let i = roastLevels[0].id; i <= roastLevel.id; i++) {
			circleArr.push(
				<Circle
					detail={detail}
					color={roastColor[i - (devEnv ? 2 : 3)]}
					key={i}
				/>
			);
		}
	}

	return (
		<Container detail={detail}>
			{circleArr}
			<span>{roastLevel.level}</span>
		</Container>
	);
}

interface SpanProps {
	detail?: boolean;
}

const Container = styled.div<SpanProps>`
	display: flex;
	align-items: center;
	margin: 0.3rem 0;
	gap: 0.1rem;

	span {
		color: #858585;
		font-size: ${props => (props.detail ? '1rem' : '0.8rem')};
		margin-left: 0.2rem;
	}
`;

interface CircleProps {
	color: string;
	detail?: boolean;
}

const Circle = styled.div<CircleProps>`
	width: ${props => (props.detail ? '1.2rem' : '0.9rem')};
	height: ${props => (props.detail ? '1.2rem' : '0.9rem')};
	background-color: ${props => props.color};
	border-radius: 50%;
`;
