import styled from '@emotion/styled';

export const Others = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;

	.other {
		user-select: none;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.1s ease-in-out;

		&:hover {
			font-weight: 700;
			text-decoration: underline;
		}
	}
`;
