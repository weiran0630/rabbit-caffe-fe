import React, { useContext } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import useSWRImmutable from 'swr/immutable';

import fetcher from 'utils/fetcher';
import { FilterContext } from 'context/FilterContext';
import allProductImg from 'public/images/all-products.jpg';
import { ICategory } from 'models/interfaces';

export default function CategoryImageContainer() {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;

	const {
		filter: { categoryId },
	} = useContext(FilterContext);

	const { data: categories } = useSWRImmutable<ICategory[]>(
		'/categories',
		fetcher
	);

	let imgSrc = allProductImg.src;
	let categoryHeader = '所有系列';

	if (categories && categoryId) {
		const url = categories[categoryId - (devEnv ? 2 : 3)].cate_image!.url;
		imgSrc = devEnv ? API_URL + url : url;

		categoryHeader = categories[categoryId - (devEnv ? 2 : 3)].cate_name;
	}

	return (
		<Container>
			<Image
				className='category-image'
				src={imgSrc}
				alt='category image'
				width='100'
				height='25'
				layout='responsive'
				priority
			/>
			<h2 className='title'>{categoryHeader}</h2>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	width: 100%;

	.title {
		font-size: 3rem;
		color: #fefefed0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	@media (max-width: 767px) {
		display: none;
	}
`;
