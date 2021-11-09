import Link from 'next/link';
import { ButtonStyled } from '@/components/common/ButtonStyled';

interface ButtonLinkProps {
	href: string;
	shallow?: boolean;
	children: JSX.Element | JSX.Element[] | string | string[];
}

export default function ButtonLink({
	href,
	shallow,
	children,
}: ButtonLinkProps) {
	return (
		<Link href={href} passHref shallow={shallow}>
			<ButtonStyled>{children}</ButtonStyled>
		</Link>
	);
}
