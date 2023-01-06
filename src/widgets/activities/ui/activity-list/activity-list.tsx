import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
	ActivityCard,
	SkeletonActivityCard,
	useActivities
} from '@/entities/activities';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import styles from './activity-list.module.css';

export const ActivityList: React.FC<CommonProps> = React.memo((props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const { data: activities, status, } = useActivities();
	const isLoading = activities.length === 0 && status !== 'done';

	return (
		<Stack className={cn(styles.wrapper, className)} spacing={1.5}>
			<Typography className={styles.title} variant='body2' component='h3'>
				{t('activities.title')}
			</Typography>
			<Stack className={styles.list} spacing={1}>
				{isLoading
					? getEmptyArray(4).map((_, i) => <SkeletonActivityCard key={i} />)
					: activities
						.slice(0, 5)
						.map((activity) => (
							<ActivityCard {...activity} key={activity.id} />
						))}
			</Stack>
		</Stack>
	);
});
