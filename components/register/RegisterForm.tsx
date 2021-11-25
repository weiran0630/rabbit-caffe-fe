import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { ButtonStyled } from '@/components/common/ButtonStyled';
import { ErrorMessage } from '@/components/form/Message';
import { FormStyled } from '@/components/form/FormStyled';
import { Others } from '@/components/form/Others';
import Modal from '@/components/common/Modal';
import RegisterSuccess from './RegisterSuccess';

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
	birthday: Date;
}

export default function RegisterForm() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const [isUsed, setIsUsed] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = async (values: RegisterFormValues) => {
		try {
			const response = await axios.post(`${API_URL}/auth/local/register`, {
				...values,
			});

			if (response.data.user) {
				setIsModalOpen(true);
			}
		} catch (error) {
			// console.log(error);
			setIsUsed(true);
		}
	};

	const username = register('username', {
		required: '*用戶名欄位必填',
		pattern: {
			value: /^\w{4,20}$/,
			message: '*用戶名要求4至20個字元之間，字元限定爲數字字母與底線',
		},
	});

	const email = register('email', {
		required: '*電郵欄位必填',
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: '*非法電郵格式',
		},
	});

	return (
		<>
			{isModalOpen && (
				<Modal setIsDisplay={setIsModalOpen} unclosable confetti>
					<RegisterSuccess />
				</Modal>
			)}

			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<h2>加入會員</h2>

				<input
					type='text'
					placeholder='用戶名 Username'
					{...username}
					onChange={e => {
						username.onChange(e);
						setIsUsed(false);
					}}
				/>
				{errors.username && (
					<ErrorMessage>{errors.username.message}</ErrorMessage>
				)}
				{isUsed && <ErrorMessage>*用戶名或電郵已被註冊</ErrorMessage>}

				<input
					type='email'
					placeholder='電郵 Email'
					{...email}
					onChange={e => {
						email.onChange(e);
						setIsUsed(false);
					}}
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

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
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}

				<input
					type='password'
					placeholder='確認密碼 Confirm Password'
					{...register('confirm', {
						required: '*確認密碼欄位必填',
						validate: value =>
							value === getValues('password') || '*確認密碼與密碼不相符',
					})}
				/>
				{errors.confirm && (
					<ErrorMessage>{errors.confirm.message}</ErrorMessage>
				)}

				<div className='birthday'>
					<label htmlFor='birthday'>出生日期： </label>
					<DateInput
						type='date'
						{...register('birthday', {
							required: '*出生日期必填',
						})}
					/>
					{errors.birthday && (
						<ErrorMessage>{errors.birthday.message}</ErrorMessage>
					)}
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

const Container = styled.div`
	margin-top: 1.5rem;
	display: flex;
	justify-content: space-between;
`;

const DateInput = styled.input`
	margin-left: 0.1rem;
	font-size: 0.9rem;
`;
