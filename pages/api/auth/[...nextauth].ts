// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
					const { data } = await axios.post(`${API_URL}/auth/local`, {
						identifier: credentials.email,
						password: credentials.password,
					});

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
		maxAge: 60 * 60, // one hour
	},
	callbacks: {
		jwt: async (token, user, account) => {
			const isSignIn = user ? true : false;

			if (isSignIn) {
				switch (account?.provider) {
					case 'google':
						const { data } = await axios.get(
							`${API_URL}/auth/${account?.provider}/callback?access_token=${account?.accessToken}`
						);

						token.jwt = data.jwt;
						break;

					default:
						token.jwt = user.jwt;
				}
			}
			return Promise.resolve(token);
		},
		session: async (session, user) => {
			session.jwt = user.jwt;
			return Promise.resolve(session);
		},
	},
	pages: { signIn: '/login', newUser: '/register' },
};

export default function Auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, options);
}
