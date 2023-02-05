import { Pagination, PaginationItem } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { activitiesInRoomModel } from '@/entities/activities';
import { getParams } from '@/shared/configs';
import { useQueryParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { activitiesPageModel } from '../../model';

export interface ActivitiesPaginationProps extends CommonProps {}

export const ActivitiesPagination: React.FC<ActivitiesPaginationProps> = (
	props
) => {
	const { className, } = props;

	const pageChanged = useUnit(activitiesPageModel.pageChanged);
	const hasItems = useUnit(activitiesInRoomModel.$hasItems);
	const pageCount = useUnit(activitiesInRoomModel.$pageCount);
	const page = parseInt(useQueryParam(getParams.page, '1'), 10);

	return hasItems ? (
		<Pagination
			className={className}
			count={pageCount}
			page={page}
			onChange={(_, page) => pageChanged(page)}
			color='primary'
			size='large'
			renderItem={(item) => {
				return <PaginationItem {...item} role='link' />;
			}}
		/>
	) : null;
};
