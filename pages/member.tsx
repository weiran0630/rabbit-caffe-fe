import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';

export default function Member() {
	const [session, loading] = useSession();
	return <div onClick={() => signOut()}>{session?.user?.email}</div>;
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
