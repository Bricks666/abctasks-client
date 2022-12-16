import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityCard,
	SkeletonActivityCard,
	useActivities
} from '@/entities/activities';
import { routes } from '@/shared/configs';
import { getEmptyArray } from '@/shared/const';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import styles from './activity-list.module.css';

export const ActivityList: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room, 'id');
	const { data: activities, } = useActivities(roomId);
	const isLoading = !activities;

	return (
		<Stack className={cn(styles.wrapper, className)} spacing={1.5}>
			<Typography className={styles.title} variant='body2' component='h3'>
				{t('activities.title')}
			</Typography>
			<Stack className={styles.list} spacing={1}>
				{isLoading
					? getEmptyArray(4).map((_, i) => <SkeletonActivityCard key={i} />)
					: activities
						.slice(0, 10)
						.map((activity) => (
							<ActivityCard {...activity} key={activity.id} />
						))}
			</Stack>
		</Stack>
	);
};
