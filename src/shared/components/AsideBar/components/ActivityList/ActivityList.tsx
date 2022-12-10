import { useQuery } from '@farfetched/react';
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { getEmptyArray } from '@/shared/const';
import { getActivitiesQuery } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import styles from './ActivityList.module.css';
import { SkeletonActivityCard, ActivityCard } from './components';

export const ActivityList: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('room');
	const { data: activities, } = useQuery(getActivitiesQuery);
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
