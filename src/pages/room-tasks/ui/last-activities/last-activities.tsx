import ReplayIcon from '@mui/icons-material/Replay';
import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { OpenAllRoomActivities } from '@/features/activities';

import {
	ActivityListItem,
	SkeletonActivityListItem
} from '@/entities/activities';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

import { query } from '../../model';

export interface LastActivitiesProps extends CommonProps {
	readonly disableBorder?: boolean;
}

export const LastActivities: React.FC<LastActivitiesProps> = (props) => {
	const { className, disableBorder, } = props;

	return (
		<FriendlyList
			className={className}
			$query={query}
			getData={(data) => data.items}
			getKey={(item) => item.id}
			skeletonsCount={6}
			ErrorComponent={Error}
			ItemComponent={ActivityListItem}
			SkeletonComponent={SkeletonActivityListItem}
			emptyText='Here will be shown last 5 activities in room'
			slots={{
				before: (
					<Typography variant='h6' component='h2' fontWeight={700}>
						Последние активности
					</Typography>
				),
				after: <OpenAllRoomActivities />,
			}}
			disableBorder={disableBorder}
		/>
	);
};

const Error: React.FC = () => {
	const roomId = useParam(routes.room.tasks, 'id');
	const refresh = useUnit(query.refresh);

	const onRetry = React.useCallback(() => {
		refresh({ roomId, });
	}, [roomId]);

	return (
		<TextWithAction
			actionText='retry'
			text='Activities were not loaded. To retry?'
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
