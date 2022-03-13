import { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { IoLogInSharp } from 'react-icons/io5';
import { useRouter } from 'next/dist/client/router';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import { Separator } from '@/components/common/Separator';
import { ErrorMessage } from '@/components/form/Message';
import { FormStyled } from '@/components/form/FormStyled';
import { Others } from '@/components/form/Others';
import Modal from '@/components/common/Modal';
import ForgotPasswordForm from './ForgotPasswordForm';
import useLocale from 'hooks/useLocale';

interface LoginFormValues {
	email: string;
	password: string;
}

export default function LoginForm() {
	const t = useLocale();
	const [unauthorize, setUnauthorize] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();
	const router = useRouter();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await handleSubmit(async values => {
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

			<FormStyled
				onSubmit={onSubmit}
				onKeyPress={e => e.key === 'Enter' && onSubmit(e)}
			>
				<h2>{t.login.title}</h2>
				<input
					type='email'
					placeholder={`${t.login.email}`}
					{...register('email', {
						required: t.login.emailRequired,
					})}
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				{unauthorize && <ErrorMessage>{t.login.unauthorize}</ErrorMessage>}

				<input
					type='password'
					placeholder={`${t.login.password}`}
					{...register('password', {
						required: t.login.passwordRequired,
					})}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}
				{serverError && <ErrorMessage>{t.login.serverError}</ErrorMessage>}

				<CredentialLogin>
					<ButtonStyled onClick={onSubmit}>
						<div className='login'>
							<IoLogInSharp size={20} />
							<div className='login-text'>{t.login.button}</div>
						</div>
					</ButtonStyled>

					<Others>
						<Link href='/register' passHref>
							<span className='other'>{t.login.noAccount}</span>
						</Link>
						<span className='other' onClick={onForgotPassword}>
							{t.login.forgetPwd}
						</span>
					</Others>
				</CredentialLogin>

				<Separator>{t.login.orUCan}</Separator>

				<GoogleLoginButton
					onClick={() => signIn('google')}
					iconSize='1rem'
					style={buttonConfig}
				>
					{t.login.googleLogin}
				</GoogleLoginButton>
			</FormStyled>
		</>
	);
}

const CredentialLogin = styled.div`
	margin: 1.5rem 0 2rem 0;
	display: flex;
	justify-content: space-between;

	.login {
		margin-left: -0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		align-items: center;

		.login-text {
			padding-bottom: 1px;
		}
	}
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
