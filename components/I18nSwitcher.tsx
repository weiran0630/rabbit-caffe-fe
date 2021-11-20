import styled from '@emotion/styled';
import useLocale from 'hooks/useLocale';
import router, { useRouter } from 'next/router';
import React from 'react';

interface I18SwitcherProps {
	setIsDisplay: (isDisplay: boolean) => void;
}

export default function I18nSwitcher({ setIsDisplay }: I18SwitcherProps) {
	const t = useLocale();
	const { pathname, asPath, query } = useRouter();

	const switchLocale = (locale: string | false) => {
		router.push({ pathname, query }, asPath, { locale });
		setIsDisplay(false);
	};

	return (
		<Container>
			<h2 className='title'>{t.header.switchLang}</h2>

			<h4 onClick={() => switchLocale(false)}>繁體中文</h4>
			<h4 onClick={() => switchLocale('en')}>English</h4>
			<h4 onClick={() => switchLocale('ja')}>日本語</h4>
		</Container>
	);
}

const Container = styled.div`
	user-select: none;
	padding: 2rem;
	min-width: 20rem;

	.title {
		margin-bottom: 1rem;
	}

	h4 {
		color: #858585;
		cursor: pointer;
		transition: all 0.05s ease-in-out;

		&:hover {
			color: black;
		}
	}
`;
