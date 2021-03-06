import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
	return (
		<Global
			styles={css`
				* {
					padding: 0;
					margin: 0;
					box-sizing: border-box;
				}

				body {
					scroll-behavior: smooth;
					font-family: 'Noto Sans TC', sans-serif;
					color: #533a32;
					min-height: 100vh;
					background-image: url('/images/bg.webp');
					background-repeat: no-repeat;
					background-attachment: fixed;
					backdrop-filter: contrast(1.5) blur(5px) saturate(0.1);
					-webkit-backdrop-filter: contrast(1.5) blur(5px) saturate(0.1);
				}

				.hero-image,
				.product-image,
				.category-image {
					object-fit: cover;
				}

				.product-image {
					border-top-left-radius: 4px;
					border-top-right-radius: 4px;
				}

				.product-detail {
					display: flex;
					object-fit: contain;
				}

				.category-image {
					filter: brightness(0.6);
				}

				.item-image {
					object-fit: contain;
				}
			`}
		/>
	);
}
