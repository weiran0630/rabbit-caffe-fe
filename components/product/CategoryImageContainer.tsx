import React, { useContext } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import useSWRImmutable from 'swr/immutable';
import useLocale from 'hooks/useLocale';
import { ICategory } from 'models/interfaces';
import { useFilter } from 'context/FilterContext';
import fetcher from 'functions/fetcher';
import allProductImg from 'public/images/all-products.webp';

export default function CategoryImageContainer() {
	const devEnv = process.env.NODE_ENV === 'development';
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const t = useLocale();

	const {
		filter: { categoryId },
	} = useFilter();

	const { data: categories } = useSWRImmutable<ICategory[]>(
		'/categories',
		fetcher
	);

	let imgSrc = allProductImg.src;
	let categoryHeader = t.header.allSeries;

	if (categories && categoryId) {
		const url =
			categories[categoryId - (devEnv ? 2 : 3)].cate_image!.formats.large.url;

		imgSrc = devEnv ? API_URL + url : url;

		categoryHeader = categories[categoryId - (devEnv ? 2 : 3)].cate_name;
	}

	return (
		<Container>
			<div className='filter'>
				<Image
					className='category-image'
					src={imgSrc!}
					alt='category image'
					width='100'
					height='20'
					quality={50}
					layout='responsive'
					placeholder='blur'
					blurDataURL={allProductImg.blurDataURL}
					priority
				/>
			</div>

			<h2 className='title'>{categoryHeader}</h2>
		</Container>
	);
}

const Container = styled.div`
	user-select: none;
	position: relative;
	width: 100%;

	.filter {
		filter: brightness(0.6);
	}

	.title {
		font-size: 3rem;
		position: absolute;
		color: #fefefed0;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	@media (max-width: 767px) {
		display: none;
	}
`;
