import React, { useContext, useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { FormStyled } from '@/components/form/FormStyled';
import { ErrorMessage } from '@/components/form/Message';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import styled from '@emotion/styled';
import { useSession } from 'next-auth/client';
import { AppContext } from 'context/AppContext';
import { getTotalPrice } from 'functions/cartManipulate';

interface CheckoutFormProps {
	paymentIntentId: string;
}

export default function CheckoutForm({ paymentIntentId }: CheckoutFormProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const stripe = useStripe();
	const elements = useElements();
	const [session] = useSession();
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { cartItems } = useContext(AppContext);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitOrder = handleSubmit(async values => {
		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		// create an order and confirm it on CMS manually afterward
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				address: values.address,
				items: cartItems,
				total: getTotalPrice(cartItems),
				fullname: values.name,
				receipt_email: values.email,
				payment_intent_id: paymentIntentId,
			}),
		});

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${
					devEnv ? 'http://localhost:3000' : 'https://rabbit-caffee.vercel.app'
				}`,
				receipt_email: values.email,
				shipping: { address: { line1: values.address }, name: values.name },
			},
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message!);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsLoading(false);
	});

	return (
		<FormStyled onSubmit={submitOrder}>
			<h2>結帳</h2>
			<input
				{...register('name', { required: '*姓名爲必填' })}
				placeholder='姓名 Full name'
			/>
			{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

			<input
				{...register('email', {
					required: '*電郵爲必填',
					value: session?.user?.email,
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: '*非法電郵格式',
					},
				})}
				placeholder='電郵 Email'
			/>
			{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

			<input
				{...register('address', { required: '*送貨地址爲必填' })}
				placeholder='送貨地址 Shipping address'
			/>
			{errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

			<StripePaymentContainer>
				<PaymentElement />
				{message && <ErrorMessage>{message}</ErrorMessage>}
			</StripePaymentContainer>

			<ButtonStyled
				onClick={submitOrder}
				isDisable={isLoading || !stripe || !elements || !errors}>
				結帳
			</ButtonStyled>
		</FormStyled>
	);
}

const StripePaymentContainer = styled.div`
	margin: 1rem 0;
`;
