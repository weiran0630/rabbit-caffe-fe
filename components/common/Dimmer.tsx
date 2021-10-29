import styled from '@emotion/styled';

export const Dimmer = styled.div`
	display: flex;
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
	transition: all 0.5s ease-in-out;
`;
