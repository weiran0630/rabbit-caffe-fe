import styled from '@emotion/styled';
import useLocale from 'hooks/useLocale';
import router, { useRouter } from 'next/router';
import React from 'react';

export default function I18nSwitcher() {
	const t = useLocale();
	const { pathname, asPath, query } = useRouter();

	const switchLocale = (locale: string | false) => {
		router.push({ pathname, query }, asPath, { locale });
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

	h4 {
		cursor: pointer;

		&:hover {
			color: black;
		}
	}
`;
