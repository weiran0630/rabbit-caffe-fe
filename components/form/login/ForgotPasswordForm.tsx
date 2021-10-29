import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import axios from 'axios';

import { ButtonStyled } from '@/components/common/ButtonStyled';
import { FormStyled } from '@/components/form/FormStyled';
import { ErrorMessage, SuccessMessage } from '@/components/form/Message';

interface ForgotPasswordFormValues {
	email: string;
}

export default function ForgotPasswordForm() {
	const [serverError, setServerError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
		setIsLoading(true);
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
				{ email }
			);
			setServerError(false);
			setIsSuccess(true);
			setIsLoading(false);
		} catch (e) {
			// console.log(e);
			setServerError(true);
			setIsLoading(false);
		}
	};

	return (
		<>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<h2>忘記密碼</h2>

				<input
					id='email'
					type='email'
					placeholder='會員電郵 Member Email'
					{...register('email', {
						required: '*電郵欄位必填',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: '*非法電郵格式',
						},
					})}
				/>

				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				{serverError && <ErrorMessage>*發生異常錯誤，請稍後再試</ErrorMessage>}
				{isSuccess && (
					<SuccessMessage>
						*已發送電郵到你的信箱，請檢查並點擊鏈結重設密碼
					</SuccessMessage>
				)}

				<Container>
					<ButtonStyled
						isDisable={isSuccess}
						isLoading={isLoading}
						onClick={handleSubmit(onSubmit)}>
						{isLoading ? '發送中' : '重設密碼'}
					</ButtonStyled>
				</Container>
			</FormStyled>
		</>
	);
}

const Container = styled.div`
	margin-top: 1rem;
`;
