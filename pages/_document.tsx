import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return await Document.getInitialProps(ctx);
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' />

					<link
						href='https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Staatliches&display=swap'
						rel='stylesheet'
						crossOrigin='anonymous'
					/>

					<meta
						name='description'
						content='Rabbit-themed coffee shop e-commerce website created with Next.js. Only for education propose, open sourced on Github.'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
