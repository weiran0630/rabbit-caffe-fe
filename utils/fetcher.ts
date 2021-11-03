import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function fetcher<T>(url: string): Promise<T> {
	const { data } = await axios(`${API}${url}`);

	return data;
}
