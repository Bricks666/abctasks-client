import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import { AllActivitiesInRoom } from '@/features/activities';
import { ActivityCard, useActivities } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './last-activities.module.css';

export const LastActivities: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.tasks, 'id');
	const activities = useActivities();

	const isEmpty = !activities.data.length && !activities.pending;
	const isError = !!activities.error;

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
		children = (
			<>
				<Stack className={styles.list} spacing={0.5}>
					{activities.data.slice(0, 5).map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					))}
				</Stack>
				{isEmpty ? null : <AllActivitiesInRoom />}
			</>
		);
	}

	return (
		<Stack className={className} spacing={1.5}>
			<Typography className={styles.title} variant='body2' component='h2'>
				Последние активности
			</Typography>
			{children}
		</Stack>
	);
};
