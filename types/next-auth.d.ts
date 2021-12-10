import { User as ModelUser } from 'models/interfaces';

declare module 'next-auth' {
	interface Session {
		user: {
			id: number;
			image: string;
			name: string;
			email: string;
		};
		expires: string;
		jwt: string;
	}

	interface Role {
		id: number;
		name: string;
		description: string;
		type: string;
	}

	interface User extends ModelUser {}
}
