import styled from '@emotion/styled';

interface FormStyledProps {
	inputWidth?: number;
}

export const FormStyled = styled.form<FormStyledProps>`
	display: flex;
	flex-direction: column;

	input {
		width: ${props => props.inputWidth + 'rem'};
		margin-top: 1rem;
		padding: 0.7rem;
		border: 1px solid #a7a7a778;
		border-radius: 5px;

		@media (max-width: 520px) {
			width: 100%;
		}
	}
`;
