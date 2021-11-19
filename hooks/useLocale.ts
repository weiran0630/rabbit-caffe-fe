import { useRouter } from 'next/router';
import { en } from 'public/locales/en';
import { ja } from 'public/locales/ja';
import { zhTW } from 'public/locales/zh-TW';

export default function useLocale() {
	const router = useRouter();

	switch (router.locale) {
		case 'en':
			return en;
		case 'ja':
			return ja;
		default:
			return zhTW;
	}
}
