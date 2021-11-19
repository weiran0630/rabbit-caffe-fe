/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			'res.cloudinary.com',
			'rabbit-caffe-be.herokuapp.com',
			'localhost',
		],
	},
	i18n: {
		locales: ['zh-TW', 'en', 'ja'],
		defaultLocale: 'zh-TW',
	},
};
