import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { AllActivitiesInRoom } from '@/features/activities';
import { ActivityCard, useActivities } from '@/entities/activities';
import { CommonProps } from '@/shared/types';

import styles from './last-activities.module.css';

export const LastActivities: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	const { data: activities, } = useActivities();

	return (
		<Stack className={className} spacing={1.5}>
			<Typography className={styles.title} variant='body2' component='h2'>
				Последние активности <AllActivitiesInRoom />
			</Typography>
			<Stack className={styles.list} spacing={0.5}>
				{activities.slice(0, 5).map((activity) => (
					<ActivityCard {...activity} key={activity.id} />
				))}
			</Stack>
		</Stack>
	);
};
