const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

function generateSiteMap(products) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://rabbit-caffe.vercel.app/</loc>
     </url>
     <url>
       <loc>https://rabbit-caffe.vercel.app/</loc>
     </url>
     <url>
       <loc>https://rabbit-caffe.vercel.app/</loc>
     </url>
     <url>
       <loc>https://rabbit-caffe.vercel.app/</loc>
     </url>
     ${products
			.map(({ id }) => {
				return `
       <url>
           <loc>${`https://rabbit-caffe.vercel.app/${id}`}</loc>
       </url>
     `;
			})
			.join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
	// We make an API call to gather the URLs for our site
	const request = await fetch(EXTERNAL_DATA_URL);
	const products = await request.json();

	// We generate the XML sitemap with the posts data
	const sitemap = generateSiteMap(products);

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default function SiteMap() {
	// getServerSideProps will do the heavy lifting
}
