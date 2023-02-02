import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { AllActivitiesInRoom } from '@/features/activities';
import { ActivityCard } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';
import { useLastActivities } from '../../lib';

import styles from './last-activities.module.css';

export const LastActivities: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.tasks, 'id');
	const activities = useLastActivities();
	const { items, } = activities.data;
	const isEmpty = !items.length && !activities.pending;
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
				<Stack spacing={0.5}>
					{items.map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					))}
				</Stack>
				{isEmpty ? null : <AllActivitiesInRoom />}
			</>
		);
	}

	return (
		<Stack className={cn(styles.wrapper, className)} spacing={1.5}>
			<Typography variant='h6' component='h2' fontWeight={700}>
				Последние активности
			</Typography>
			{children}
		</Stack>
	);
};
