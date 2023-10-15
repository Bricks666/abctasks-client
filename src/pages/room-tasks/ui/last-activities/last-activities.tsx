import ReplayIcon from '@mui/icons-material/Replay';
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { OpenAllRoomActivities } from '@/features/activities';

import { ActivityCard } from '@/entities/activities';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction } from '@/shared/ui';

import { query } from '../../model';

import styles from './last-activities.module.css';

export const LastActivities: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.tasks, 'id');
	const activities = useUnit(query);
	const { items, } = activities.data;
	const isEmpty = !items.length && !activities.pending;
	const isError = !!activities.error;

	let children: React.ReactElement | null = null;

	if (isError) {
		const onRetry = () => {
			activities.start({ roomId, });
		};

		children = (
			<TextWithAction
				className={className}
				actionText='retry'
				text='Activities were not loaded. To retry?'
				onClick={onRetry}
				icon={<ReplayIcon />}
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
				{isEmpty ? null : <OpenAllRoomActivities />}
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
