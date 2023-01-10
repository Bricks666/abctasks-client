import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityCard,
	SkeletonActivityCard,
	useActivities
} from '@/entities/activities';
import { getEmptyArray, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './activity-list.module.css';

export const ActivityList: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room, 'id');
	const { data: activities, pending, error, start, } = useActivities();

	const isError = !!error;

	let children: React.ReactElement | null = null;

	if (isError) {
		const onRetry = () => {
			start(roomId);
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
				{pending
					? getEmptyArray(4).map((_, i) => <SkeletonActivityCard key={i} />)
					: activities.map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					  ))}
			</Stack>
		);
	}

	return (
		<Stack className={cn(styles.wrapper, className)} spacing={1.5}>
			<Typography className={styles.title} variant='body2' component='h3'>
				{t('activities.title')}
			</Typography>
			{children}
		</Stack>
	);
});
