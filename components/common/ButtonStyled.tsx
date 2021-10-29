import styled from '@emotion/styled';

interface ButtonStyledProps {
	isLoading?: boolean;
	isDisable?: boolean;
}

export const ButtonStyled = styled.span<ButtonStyledProps>`
	pointer-events: ${({ isLoading, isDisable }) =>
		isLoading || isDisable ? 'none' : 'auto'};
	user-select: none;
	cursor: pointer;
	color: white;
	font-weight: 700;
	display: inline-block;
	width: max-content;
	height: max-content;
	padding: 10px 25px;
	border-radius: 8px;
	box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.3);
	background-color: ${({ isLoading, isDisable }) =>
		isLoading || isDisable ? '#acacac' : '#533a32'};
	filter: ${({ isLoading, isDisable }) =>
		isLoading || isDisable ? 'opacity(0.3)' : 'opacity(1)'};
	transition: all 0.15s ease-in-out;

	&:hover {
		background-color: #6e5a4b;
	}
`;
