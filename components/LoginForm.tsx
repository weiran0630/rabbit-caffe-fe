import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonStyled } from './ButtonLink';

interface FormValues {
	email: string;
	password: string;
}

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (values: FormValues) => console.log(values);

	return (
		<>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<h2>會員登錄</h2>
				<input
					type='email'
					placeholder='電郵 Email'
					{...register('email', {
						required: '*電郵欄位必填',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: '*非法電郵格式',
						},
					})}
				/>
				<ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>

				<input
					type='password'
					placeholder='密碼 Password'
					{...register('password', {
						required: '*密碼欄位必填',
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
							message: '*密碼要求8個字元以上，需包含大小寫英文字母以及數字',
						},
					})}
				/>
				<ErrorMessage>
					{errors.password && errors.password.message}
				</ErrorMessage>

				<Container>
					<ButtonStyled onClick={handleSubmit(onSubmit)}>登錄</ButtonStyled>
					<Others>
						<Link href='/register' passHref>
							<span className='other'>沒有帳號？加入會員</span>
						</Link>

						<span className='other'>忘記密碼</span>
					</Others>
				</Container>
			</FormStyled>
		</>
	);
}

const FormStyled = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;

	input {
		margin-top: 1rem;
		padding: 0.7rem;
		border: 1px solid #a7a7a778;
		border-radius: 5px;
	}
`;

const Container = styled.div`
	margin-top: 1.5rem;
	display: flex;
	justify-content: space-between;
`;

const Others = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;

	.other {
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 0.1s ease-in-out;

		&:hover {
			font-weight: 700;
			text-decoration: underline;
		}
	}
`;

const ErrorMessage = styled.span`
	color: #df0303;
	font-size: 0.8rem;
`;
