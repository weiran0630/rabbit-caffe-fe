import Link from 'next/link';
import styled from '@emotion/styled';

interface ButtonLinkProps {
	href: string;
	children: JSX.Element | JSX.Element[] | string | string[];
}

export default function ButtonLink({ href, children }: ButtonLinkProps) {
	return (
		<Link href={href} passHref>
			<ButtonStyled>{children}</ButtonStyled>
		</Link>
	);
}

export const ButtonStyled = styled.span`
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
	background-color: #533a32;
	transition: all 0.1s ease-in-out;

	&:hover {
		background-color: #6e5a4b;
	}
`;
