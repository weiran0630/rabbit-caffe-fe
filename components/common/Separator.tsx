import styled from '@emotion/styled';

export const Separator = styled.div`
	cursor: default;
	color: #a5a5a5;
	margin-top: 2rem;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	text-align: center;

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid #a5a5a58f;
	}

	&:not(:empty)::before {
		margin-right: 0.3em;
	}

	&:not(:empty)::after {
		margin-left: 0.3em;
	}
`;
