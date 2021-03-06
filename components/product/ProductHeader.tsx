import React from 'react';
import styled from '@emotion/styled';
import { useFilter } from 'context/FilterContext';
import useSWRImmutable from 'swr/immutable';
import fetcher from 'functions/fetcher';
import { ICategory } from 'models/interfaces';
import useLocale from 'hooks/useLocale';

export default function ProductHeader() {
	const t = useLocale();

	const {
		filter: { categoryId, ...filter },
		setFilter,
	} = useFilter();

	const { data: categories } = useSWRImmutable<ICategory[]>(
		'/categories',
		fetcher
	);

	return (
		<Container>
			<span
				className={`clickable ${categoryId === null ? 'active' : ''}`}
				onClick={() => setFilter({ ...filter, categoryId: null })}
			>
				{t.header.allSeries}
			</span>
			{categories?.map(category => (
				<span
					className={`clickable ${categoryId === category.id ? 'active' : ''}`}
					onClick={() => setFilter({ ...filter, categoryId: category.id })}
					key={category.id}
				>
					{category.cate_name}
				</span>
			))}
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	.clickable {
		display: block;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		padding: 4px 10px 5px 12px;
		border-radius: 6px;
		user-select: none;
		cursor: pointer;
		transition: all 0.07s ease-in-out;

		&.active,
		&:hover {
			color: white;
		}

		&.active {
			background-color: #533a32;
		}
		&:hover {
			background-color: #533a3268;
		}

		@media (max-width: 444px) {
			font-size: 0.8rem;
			padding: 4px 6px 5px 6px;
		}
	}
`;
