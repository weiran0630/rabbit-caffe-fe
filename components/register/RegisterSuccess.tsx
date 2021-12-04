import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';
import { SiRabbitmq } from 'react-icons/si';
import ButtonLink from '@/components/common/ButtonLink';

export default function RegisterSuccess() {
	const [counter, setCounter] = useState(5);
	const router = useRouter();

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	if (counter === 0) {
		router.push('/login');
	}

	return (
		<Container>
			<h2>註冊成功</h2>
			<p>
				<span>
					恭喜加入 Ra
					<SiRabbitmq />
					it Caffee
				</span>{' '}
				的大家庭， 您將在{counter}秒後跳轉至登入頁面
			</p>
			<ButtonLink href='/login'>立即登入</ButtonLink>
		</Container>
	);
}

const Container = styled.div`
	padding: 2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	p span {
		font-weight: 100;
	}
`;
