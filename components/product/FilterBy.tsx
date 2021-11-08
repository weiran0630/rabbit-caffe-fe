import React, { useContext, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import styled from '@emotion/styled';
import { AiOutlinePlus } from 'react-icons/ai';

import fetcher from 'utils/fetcher';
import { FilterContext } from 'context/FilterContext';
import { ICompany, IPlaceOrigin, IRoastLevel } from 'models/interfaces';
import { Separator } from '@/components/common/Separator';

export default function FilterBy() {
	const { data: placeOrigins } = useSWRImmutable<IPlaceOrigin[]>(
		'/place-origins?_sort=id',
		fetcher
	);
	const { data: roastLevels } = useSWRImmutable<IRoastLevel[]>(
		'/roast-levels?_sort=id',
		fetcher
	);
	const { data: companies } = useSWRImmutable<ICompany[]>(
		'/companies?_sort=id',
		fetcher
	);

	const {
		filter: { companyId, placeOriginId, roastLevelId, ...filter },
		setFilter,
	} = useContext(FilterContext);

	const [originOpen, setOriginOpen] = useState(false);
	const [roastLvOpen, setRoastLvOpen] = useState(false);
	const [companyOpen, setCompanyOpen] = useState(false);

	return (
		<Container>
			<h3>分類</h3>
			<Separator primary />
			<div className='filter-category'>
				<h4 className='title' onClick={() => setOriginOpen(!originOpen)}>
					原產地 <AiOutlinePlus />
				</h4>
				<Separator />
				<ul className={`list ${(originOpen || placeOriginId) && 'active'}`}>
					{placeOrigins?.map(origin => (
						<li
							className={`list-item ${placeOriginId === origin.id && 'active'}`}
							key={origin.id}
							onClick={() =>
								setFilter({
									placeOriginId: origin.id,
									companyId,
									roastLevelId,
									...filter,
								})
							}>
							{origin.place_name}
						</li>
					))}
					<li
						className='reset list-item'
						onClick={() =>
							setFilter({
								placeOriginId: null,
								companyId,
								roastLevelId,
								...filter,
							})
						}>
						取消選取
					</li>
				</ul>
			</div>

			<div className='filter-category'>
				<h4 className='title' onClick={() => setRoastLvOpen(!roastLvOpen)}>
					烘焙程度 <AiOutlinePlus />
				</h4>
				<Separator />
				<ul className={`list ${(roastLvOpen || roastLevelId) && 'active'}`}>
					{roastLevels?.map(level => (
						<li
							className={`list-item ${roastLevelId === level.id && 'active'}`}
							key={level.id}
							onClick={() =>
								setFilter({
									roastLevelId: level.id,
									companyId,
									placeOriginId,
									...filter,
								})
							}>
							{level.level}
						</li>
					))}
					<li
						className='reset list-item'
						onClick={() =>
							setFilter({
								roastLevelId: null,
								companyId,
								placeOriginId,
								...filter,
							})
						}>
						取消選取
					</li>
				</ul>
			</div>

			<div className='filter-category'>
				<h4 className='title' onClick={() => setCompanyOpen(!companyOpen)}>
					品牌 <AiOutlinePlus />
				</h4>
				<Separator />
				<ul className={`list ${(companyId || companyOpen) && 'active'}`}>
					{companies?.map(company => (
						<li
							className={`list-item ${companyId === company.id && 'active'}`}
							key={company.id}
							onClick={() =>
								setFilter({
									companyId: company.id,
									placeOriginId,
									roastLevelId,
									...filter,
								})
							}>
							{company.com_name}
						</li>
					))}
					<li
						className='reset list-item'
						onClick={() =>
							setFilter({
								companyId: null,
								roastLevelId,
								placeOriginId,
								...filter,
							})
						}>
						取消選取
					</li>
				</ul>
			</div>
		</Container>
	);
}

const Container = styled.div`
	margin: 2rem;
	min-width: 25vw;

	h3 {
		color: #575757;
		margin-bottom: 0.3em;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.3em;
		width: 100%;
		cursor: pointer;
		user-select: none;
	}

	.filter-category {
		margin-top: 1rem;
	}

	.list {
		color: #858585;
		display: none;
		list-style: none;

		.list-item {
			font-size: 0.9rem;
			padding: 4px 9px 6px 10px;
			margin: 0.3rem 0.5rem 0.3rem 0;
			display: inline-block;
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
		}

		&.active {
			display: block;
		}
	}

	@media (max-width: 566px) {
		max-width: 100%;
		margin: 0;
	}
`;
