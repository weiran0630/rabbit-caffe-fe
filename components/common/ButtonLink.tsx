import Link from 'next/link';
import { ButtonStyled } from '@/components/common/ButtonStyled';

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
