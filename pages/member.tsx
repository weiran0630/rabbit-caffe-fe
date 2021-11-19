import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context.locale || process.env.NEXT_LOCALE;
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				locale,
				destination: '/login',
				permanent: false,
			},
		};
	}

	return { props: { session } };
}

export default function Member() {
	const [session, loading] = useSession();

	return (
		<div>
			<p>{session?.user?.email}</p>
			<p>working in progress..</p>
			<button onClick={() => signOut()}>Logout</button>
		</div>
	);
}
