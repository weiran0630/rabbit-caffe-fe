import axios from 'axios';

export default async function fetcher<T>(url: string): Promise<T> {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	const { data } = await axios(`${API_URL}${url}`);

	return data;
}
