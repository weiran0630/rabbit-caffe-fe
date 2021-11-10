import axios from 'axios';

export default async function fetcher<T>(url: string): Promise<T> {
	const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

	return data;
}
