import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import useLocale from 'hooks/useLocale';
import { useCart } from 'context/CartContext';
import { FormStyled } from '@/components/form/FormStyled';
import { ErrorMessage } from '@/components/form/Message';
import { ButtonStyled } from '@/components/common/ButtonStyled';
import { getTotalPrice } from 'functions/cartManipulate';
import { useSession } from 'next-auth/client';
import { User } from 'models/interfaces';

interface CheckoutFormProps {
	paymentIntentId: string;
}

export default function CheckoutForm({ paymentIntentId }: CheckoutFormProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const t = useLocale();
	const stripe = useStripe();
	const elements = useElements();
	const { locale } = useRouter();
	const [session] = useSession();
	const [user, setUser] = useState<User | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { cartItems } = useCart();

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

	useEffect(() => {
		if (session) {
			fetch(`${API_URL}/users/me`, {
				headers: { Authorization: `Bearer ${session.jwt}` },
			})
				.then(res => res.json())
				.then(data => {
					setUser(data);
					console.log(data);
				});
		}
	}, [session]);

	return (
		<FormStyled onSubmit={submitOrder}>
			<input
				{...register('name', { required: t.checkout.fullnameRequired })}
				placeholder={t.checkout.fullname}
				value={user?.fullname}
			/>
			{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

			<input
				{...register('email', {
					required: t.checkout.emailRequired,
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: t.checkout.emailInvalid,
					},
				})}
				value={user?.email}
				placeholder={t.checkout.email}
			/>
			{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

			<input
				{...register('address', {
					required: t.checkout.addressRequired,
					value: user?.address,
				})}
				value={user?.address}
				placeholder={t.checkout.address}
			/>
			{errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

			<StripePaymentContainer>
				<PaymentElement />
				{message && <ErrorMessage>{message}</ErrorMessage>}
			</StripePaymentContainer>

			<ButtonStyled
				onClick={submitOrder}
				isDisable={isLoading || !stripe || !elements || !errors}
			>
				{t.checkout.button}
			</ButtonStyled>
		</FormStyled>
	);
}

const StripePaymentContainer = styled.div`
	margin: 1rem 0;
`;
