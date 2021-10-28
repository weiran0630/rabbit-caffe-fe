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
				}

				.bg {
					opacity: 0.2;
					z-index: -1;
				}

				.hero-image {
					object-fit: cover;
				}

				.container {
					position: relative;
					z-index: 1;
				}
			`}
		/>
	);
}
