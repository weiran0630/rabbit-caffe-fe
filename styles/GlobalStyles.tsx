import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
	return (
		<Global
			styles={css`
				@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');

				@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

				* {
					padding: 0;
					margin: 0;
					box-sizing: border-box;
				}

				body {
					font-family: 'Noto Sans TC', sans-serif;
					color: #533a32;
					min-height: 100vh;
					background-image: url('/images/bg.jpg');
					background-repeat: no-repeat;
					background-attachment: fixed;
					backdrop-filter: contrast(1.2) blur(5px) saturate(0.1);
				}

				.hero-image,
				.product-image {
					object-fit: cover;
				}

				.product-image {
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
				}
			`}
		/>
	);
}
