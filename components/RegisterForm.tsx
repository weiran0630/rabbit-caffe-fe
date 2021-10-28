import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ButtonStyled } from './ButtonLink';

interface FormValues {
	username: string;
	email: string;
	password: string;
}

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (values: FormValues) => console.log(values);

	return (
		<>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<h2>加入會員</h2>
				<input
					type='text'
					placeholder='用戶名 Username'
					{...register('username', {
						required: '*用戶名欄位必填',
						pattern: {
							value: /^\w{4,20}$/,
							message: '*用戶名要求4至20個字元之間',
						},
					})}
				/>
				<ErrorMessage>
					{errors.username && errors.username.message}
				</ErrorMessage>

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

				<div className='birthday'>
					<label htmlFor='birthday'>出生日期： </label>
					<input
						type='date'
						id='birthday'
						{...register('birthday', {
							required: '*出生日期必填',
						})}
					/>
					<ErrorMessage>
						{errors.birthday && errors.birthday.message}
					</ErrorMessage>
				</div>

				<Container>
					<ButtonStyled onClick={handleSubmit(onSubmit)}>註冊會員</ButtonStyled>

					<Others>
						<Link href='/login' passHref>
							<span className='other'>已有帳號？登錄會員</span>
						</Link>
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

	.birthday {
		margin-left: 0.1rem;
		font-size: 0.9rem;
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
	margin: 0.1rem 0 0 0.3rem;
`;
