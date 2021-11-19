import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: '2020-08-27',
});

export default async function CreatePaymentIntent(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { total } = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total * 100,
		currency: 'twd',
		payment_method_types: ['card'],
	});

	res.status(200).json({ paymentIntent });
}
