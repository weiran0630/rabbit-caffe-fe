import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
	FilterContext,
	filterContextDefaultValue,
} from 'context/FilterContext';
import useSWRImmutable from 'swr/immutable';
import fetcher from 'utils/fetcher';
import { ICategory } from 'models/interfaces';

export default function ProductHeader() {
	const {
		filter: { categoryId, ...filter },
		setFilter,
	} = useContext(FilterContext);
	const { data: categories } = useSWRImmutable<ICategory[]>(
		'/categories',
		fetcher
	);

	return (
		<Container>
			{categories?.map(category => (
				<span
					className={`clickable ${categoryId === category.id ? 'active' : ''}`}
					onClick={() => setFilter({ ...filter, categoryId: category.id })}
					key={category.id}>
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
	gap: 0.5rem;

	.clickable {
		display: block;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		padding: 4px 10px 5px 12px;
		border-radius: 8px;
		user-select: none;
		cursor: pointer;

		&.active {
			color: white;
			background-color: #533a32;
		}
	}
`;
