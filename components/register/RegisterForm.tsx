import styled from '@emotion/styled';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import { ErrorMessage } from '@/components/form/Message';
import { FormStyled } from '@/components/form/FormStyled';
import { Others } from '@/components/form/Others';
import Modal from '@/components/common/Modal';
import RegisterSuccess from './RegisterSuccess';
import useLocale from 'hooks/useLocale';

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
	confirm: string;
	birthday: Date;
}

export default function RegisterForm() {
	const t = useLocale();
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const [isUsed, setIsUsed] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<RegisterFormValues>();

	const onSubmit: SubmitHandler<RegisterFormValues> = async values => {
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
		required: t.register.usernameRequired,
		pattern: {
			value: /^\w{4,20}$/,
			message: t.register.invalidUsername,
		},
	});

	const email = register('email', {
		required: t.register.emailRequired,
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: t.register.invalidEmail,
		},
	});

	const password = register('password', {
		required: t.register.passwordRequired,
		pattern: {
			value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
			message: t.register.invalidPassword,
		},
	});

	const confirm = register('confirm', {
		required: t.register.confirmRequired,
		validate: value =>
			value === getValues('password') || t.register.invalidConfirm,
	});

	const bDay = register('birthday', {
		required: t.register.bDayRequired,
	});

	return (
		<>
			{isModalOpen && (
				<Modal setIsDisplay={setIsModalOpen} unclosable confetti>
					<RegisterSuccess />
				</Modal>
			)}

			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<h2>{t.register.title}</h2>

				<input
					type='text'
					placeholder={`${t.register.username}`}
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
					placeholder={`${t.register.email}`}
					{...email}
					onChange={e => {
						email.onChange(e);
						setIsUsed(false);
					}}
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

				<input
					type='password'
					placeholder={`${t.register.password}`}
					{...password}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}

				<input
					type='password'
					placeholder={`${t.register.confirm}`}
					{...confirm}
				/>
				{errors.confirm && (
					<ErrorMessage>{errors.confirm.message}</ErrorMessage>
				)}

				<div className='birthday'>
					<label htmlFor='birthday'>{`${t.register.bDayLabel}`} </label>
					<DateInput type='date' {...bDay} />
					{errors.birthday && (
						<ErrorMessage>{errors.birthday.message}</ErrorMessage>
					)}
				</div>

				<Container>
					<ButtonStyled onClick={handleSubmit(onSubmit)}>
						{t.register.button}
					</ButtonStyled>

					<Others>
						<Link href='/login' passHref>
							<span className='other'>{t.register.hasAccount}</span>
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
