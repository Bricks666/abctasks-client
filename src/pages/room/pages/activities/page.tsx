import { Pagination, PaginationItem } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import {
	ActivitiesFilters,
	MobileActivitiesFilters
} from '@/features/activities';
import {
	ActivityCard,
	SkeletonActivityCard,
	useActivitiesInRoom
} from '@/entities/activities';
import { deviceInfoModel } from '@/entities/page';
import { getEmptyArray, getParams, routes } from '@/shared/configs';
import { useParam, useQueryParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';
import { pageChanged, pageModel } from './model';

import styles from './page.module.css';

const ActivitiesPage: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.activities, 'id');
	const activities = useActivitiesInRoom();
	const [isMobile, isTabletVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);
	const page = parseInt(useQueryParam(getParams.page, '1'), 10);
	const isError = !!activities.error;
	const showMobileFilters = isMobile || isTabletVertical;

	let children: React.ReactElement | null = null;

	if (isError) {
		const onRetry = () => {
			activities.start({ roomId, });
		};

		children = (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Activities were not loaded. To retry?'
				onRetry={onRetry}
			/>
		);
	} else {
		/*
    Сделать виртуальный список
    */
		const { items, limit, totalCount, } = activities.data;
		const pageCount = Math.ceil(totalCount / limit);
		const hasPages = !!pageCount;

		children = (
			<>
				<section className={styles.list}>
					{activities.pending
						? getEmptyArray(25).map((_, i) => <SkeletonActivityCard key={i} />)
						: items.map((activity) => (
							<ActivityCard {...activity} key={activity.id} />
						  ))}
				</section>
				{hasPages ? (
					<Pagination
						className={styles.pagination}
						count={pageCount}
						page={page}
						onChange={(_, page) => pageChanged(page)}
						color='primary'
						size='large'
						renderItem={(item) => {
							return <PaginationItem {...item} role='link' />;
						}}
					/>
				) : null}
			</>
		);
	}

	return (
		<div className={cn(styles.wrapper, className)}>
			{showMobileFilters ? <MobileActivitiesFilters /> : <ActivitiesFilters />}
			{children}
		</div>
	);
});

pageModel.loaded();

export default ActivitiesPage;
