import styled from '@emotion/styled';

interface SeparatorProps {
	primary?: boolean;
}

export const Separator = styled.div<SeparatorProps>`
	cursor: default;
	color: #a5a5a58f;
	/* margin-top: 2rem; */
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	text-align: center;

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-bottom: ${props => (props.primary ? '2px' : '1px')} solid
			${props => (props.primary ? '#6868688f' : '#a5a5a58f')};
	}

	&:not(:empty)::before {
		margin-right: 0.3em;
	}

	&:not(:empty)::after {
		margin-left: 0.3em;
	}
`;
