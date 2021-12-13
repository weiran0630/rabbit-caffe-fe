import { getSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import placeholderImg from 'public/images/profile_pic_placeholder.webp';
import type { User, Session } from 'next-auth';
import styled from '@emotion/styled';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const locale = context.locale || process.env.NEXT_LOCALE;
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
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

	const user = await (
		await fetch(`${API_URL}/users/me`, {
			headers: {
				Authorization: `Bearer ${session.jwt}`,
			},
		})
	).json();

	return { props: { user, session } };
}

interface MemberProps {
	user: User;
	session: Session;
}

export default function Member({ user, session }: MemberProps) {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	let profilePicture: string;
	if (user.profilePicture) {
		profilePicture = devEnv
			? `${API_URL}${user.profilePicture.url}`
			: user.profilePicture.formats.thumbnail.url;
	} else if (session.user.image) {
		profilePicture = session.user.image;
	} else {
		profilePicture = placeholderImg.src;
	}

	return (
		<Container>
			<p>{user.username}</p>
			<div className='profile-pic-container'>
				<Image
					src={profilePicture}
					alt='profile-picture'
					width={100}
					height={100}
					layout='responsive'
				/>
			</div>

			<button onClick={() => signOut()}>Logout</button>
		</Container>
	);
}

const Container = styled.div`
	.profile-pic-container {
		border-radius: 50%;
		overflow: hidden;
		width: 10rem;
		height: 10rem;
	}
`;
