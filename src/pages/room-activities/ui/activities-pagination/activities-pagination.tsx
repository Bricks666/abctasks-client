import { Pagination, PaginationItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { activitiesInRoomModel } from '@/entities/activities';

import { CommonProps } from '@/shared/types';

import { page } from '../../model';

export interface ActivitiesPaginationProps extends CommonProps {}

export const ActivitiesPagination: React.FC<ActivitiesPaginationProps> = (
	props
) => {
	const { className, } = props;

	const pageQuery = useUnit(page);
	const hasItems = useUnit(activitiesInRoomModel.$hasItems);
	const pageCount = useUnit(activitiesInRoomModel.$pageCount);

	return hasItems ? (
		<Pagination
			className={className}
			count={pageCount}
			page={pageQuery.value as any}
			onChange={(_, page) => {
				window.scrollTo({
					left: 0,
					top: 0,
				});
				pageQuery.set(page as any);
			}}
			color='primary'
			size='large'
			renderItem={(item) => {
				return <PaginationItem {...item} role='link' />;
			}}
		/>
	) : null;
};
