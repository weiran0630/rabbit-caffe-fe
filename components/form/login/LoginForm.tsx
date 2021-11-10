import React, { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useRouter } from 'next/dist/client/router';

import { ButtonStyled } from '@/components/common/ButtonStyled';
import { Separator } from '@/components/common/Separator';
import { ErrorMessage } from '@/components/form/Message';
import { FormStyled } from '@/components/form/FormStyled';
import { Others } from '@/components/form/Others';
import Modal from '@/components/common/Modal';
import ForgotPasswordForm from './ForgotPasswordForm';

interface LoginFormValues {
	email: string;
	password: string;
}

export default function LoginForm() {
	const [unauthorize, setUnauthorize] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await handleSubmit(async (values: LoginFormValues) => {
			const response = await signIn('credentials', {
				...values,
				redirect: false,
			});

			switch (response?.status) {
				case 200:
					setUnauthorize(false);
					router.push('/member');
					break;
				case 401:
					setUnauthorize(true);
					break;
				default:
					setServerError(true);
			}
		})(e);
	};

	const onForgotPassword = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			{isModalOpen && (
				<Modal setIsDisplay={setIsModalOpen}>
					<ForgotPasswordForm />
				</Modal>
			)}

			<FormStyled onSubmit={onSubmit}>
				<h2>會員登入</h2>
				<input
					type='email'
					placeholder='電郵 Email'
					{...register('email', {
						required: '*電郵欄位必填',
					})}
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				{unauthorize && (
					<ErrorMessage>
						*用戶電郵或密碼存在錯誤，請確認輸入是否正確
					</ErrorMessage>
				)}

				<input
					type='password'
					placeholder='密碼 Password'
					{...register('password', {
						required: '*密碼欄位必填',
					})}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}
				{serverError && <ErrorMessage>*發生異常錯誤，請稍後再試</ErrorMessage>}

				<CredentialLogin>
					<ButtonStyled onClick={onSubmit}>登入</ButtonStyled>

					<Others>
						<Link href='/register' passHref>
							<span className='other'>沒有帳號？加入會員</span>
						</Link>
						<span className='other' onClick={onForgotPassword}>
							忘記密碼
						</span>
					</Others>
				</CredentialLogin>

				<Separator>或者你可以</Separator>

				<GoogleLoginButton
					onClick={() => signIn('google')}
					iconSize='1rem'
					style={buttonConfig}>
					以 Google 帳號登入
				</GoogleLoginButton>
			</FormStyled>
		</>
	);
}

const CredentialLogin = styled.div`
	margin: 1.5rem 0 2rem 0;
	display: flex;
	justify-content: space-between;
`;

const buttonConfig = {
	color: '#575757',
	fontSize: '1rem',
	border: '1px solid #a7a7a778',
	borderRadius: '6px',
	backgroundColor: '#fefefe',
	boxShadow: '0px 1px 1px 1px #00000018',
	transition: 'all 0.15s ease-in-out',
};
