import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PK}`);

interface CheckoutProps {
	total: number;
}

export default function Checkout({ total }: CheckoutProps) {
	const router = useRouter();
	const [clientSecret, setClientSecret] = useState('');
	const [paymentIntentId, setPaymentIntentId] = useState('');

	useEffect(() => {
		// Reset PaymentIntent if total price is changed
		setClientSecret('');
		// Create PaymentIntent as soon as the page loads
		fetch(`/api/stripe/create-payment-intent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				total: total,
			}),
		})
			.then(res => res.json())
			.then(data => {
				setClientSecret(data.paymentIntent.client_secret);
				setPaymentIntentId(data.paymentIntent.id);
			});
	}, [total]);

	const appearance = {
		theme: 'stripe',
		labels: 'floating',
		rules: {
			'.Label--floating': { fontSize: '0.7rem' },
			'.Input': {
				padding: '0.4rem',
				border: '1px solid #a7a7a778',
				borderRadius: '5px',
				boxShadow: 'none',
			},
		},
	};
	const options = {
		clientSecret,
		appearance,
		locale: router.locale,
	} as StripeElementsOptions;

	return (
		<>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm paymentIntentId={paymentIntentId} />
				</Elements>
			)}
		</>
	);
}
