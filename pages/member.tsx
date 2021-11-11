import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';

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

export async function getServerSideProps(context: any) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return { props: { session } };
}
