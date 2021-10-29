// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const options: NextAuthOptions = {
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorizationUrl:
				'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
		}),
		Providers.Credentials({
			name: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
				},
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const { data } = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
						{
							identifier: credentials.email,
							password: credentials.password,
						}
					);

					if (data) {
						return data;
					} else {
						return null;
					}
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
	],
	session: {
		jwt: true,
	},
	callbacks: {
		jwt: async (token, user, account) => {
			const isSignIn = user ? true : false;

			if (isSignIn) {
				switch (account?.provider) {
					case 'google':
						const { data } = await axios.get(
							`${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.accessToken}`
						);

						token.jwt = data.jwt;
						token.name = data.user.username;
						token.email = data.user.email;
						break;

					default:
						token.jwt = user.jwt;
						token.name = user.user.username;
						token.email = user.user.email;
				}
			}
			return Promise.resolve(token);
		},
		session: async (session, user) => {
			session.jwt = user.jwt;
			session.id = user.id;
			return Promise.resolve(session);
		},
	},
	pages: { signIn: '/login', newUser: '/register' },
};

export default function Auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, options);
}
