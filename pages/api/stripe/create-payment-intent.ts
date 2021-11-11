import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { parseCookies, setCookie } from 'nookies';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: '2020-08-27',
});

export default async function CreatePaymentIntent(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { total } = req.body;
	// const { payment_intent_id } = parseCookies({ req });
	let paymentIntent;

	// if (payment_intent_id) {
	// 	// if paymentIntent already exists inside cookies
	// 	paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

	// 	res.status(200).json({ paymentIntent });
	// } else {
	// 	// otherwise create a new paymentIntent
	paymentIntent = await stripe.paymentIntents.create({
		amount: total * 100,
		currency: 'twd',
		payment_method_types: ['card'],
	});

	// saving the paymentIntent.id inside cookies
	// setCookie({ res }, 'payment_intent_id', paymentIntent.id);

	res.status(200).json({ paymentIntent });
}
// }
