import { Stack } from '@mui/material';
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
	useActivities
} from '@/entities/activities';
import { deviceInfoModel } from '@/entities/page';
import { getEmptyArray, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './activity-list.module.css';

export const ActivityList: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const roomId = useParam(routes.room, 'id');
	const activities = useActivities();
	const [isMobile, isTabletVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

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
		children = (
			<Stack className={styles.list} spacing={1}>
				{activities.pending
					? getEmptyArray(4).map((_, i) => <SkeletonActivityCard key={i} />)
					: activities.data.map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					  ))}
			</Stack>
		);
	}

	return (
		<Stack className={cn(styles.wrapper, className)} spacing={1.5}>
			{showMobileFilters ? <MobileActivitiesFilters /> : <ActivitiesFilters />}
			{children}
		</Stack>
	);
});
