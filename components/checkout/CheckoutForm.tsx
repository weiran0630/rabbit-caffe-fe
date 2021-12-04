import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/client';
import useLocale from 'hooks/useLocale';
import { AppContext } from 'context/AppContext';
import { FormStyled } from '@/components/form/FormStyled';
import { ErrorMessage } from '@/components/form/Message';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import { getTotalPrice } from 'functions/cartManipulate';

interface CheckoutFormProps {
	paymentIntentId: string;
}

export default function CheckoutForm({ paymentIntentId }: CheckoutFormProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const { locale } = useRouter();
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const t = useLocale();
	const stripe = useStripe();
	const elements = useElements();
	const [session] = useSession();
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { cartItems } = useContext(AppContext);

	console.log(`https://rabbit-caffe.tw/${locale}`);

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
		await fetch(`${API_URL}/orders`, {
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
				return_url: devEnv
					? `http://localhost:3000/${locale}`
					: `https://rabbit-caffe.tw/${locale}`,
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
			<h2></h2>
			<input
				{...register('name', { required: t.checkout.fullnameRequired })}
				placeholder={t.checkout.fullname}
			/>
			{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

			<input
				{...register('email', {
					required: t.checkout.emailRequired,
					value: session?.user?.email,
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: t.checkout.emailInvalid,
					},
				})}
				placeholder={t.checkout.email}
			/>
			{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

			<input
				{...register('address', { required: t.checkout.addressRequired })}
				placeholder={t.checkout.address}
			/>
			{errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

			<StripePaymentContainer>
				<PaymentElement />
				{message && <ErrorMessage>{message}</ErrorMessage>}
			</StripePaymentContainer>

			<ButtonStyled
				onClick={submitOrder}
				isDisable={isLoading || !stripe || !elements || !errors}>
				{t.checkout.button}
			</ButtonStyled>
		</FormStyled>
	);
}

const StripePaymentContainer = styled.div`
	margin: 1rem 0;
`;
