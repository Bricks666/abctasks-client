import ReplayIcon from '@mui/icons-material/Replay';
import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

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
	const { t, } = useTranslation('activities');

	const emptyText = t('list.empty_text');
	const title = t('blocks.last_activities.title', { ns: 'room-tasks', });

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
			emptyText={emptyText}
			slots={{
				before: (
					<Typography variant='h6' component='h2' fontWeight={700}>
						{title}
					</Typography>
				),
				after: <OpenAllRoomActivities />,
			}}
			disableBorder={disableBorder}
		/>
	);
};

const Error: React.FC = () => {
	const { t, } = useTranslation('activities');

	const roomId = useParam(routes.room.tasks, 'id');
	const start = useUnit(query.start);

	const onRetry = React.useCallback(() => {
		start({ roomId, });
	}, [roomId]);

	const actionText = t('actions.retry', { ns: 'common', });
	const text = t('actions.retry_actions.text');

	return (
		<TextWithAction
			actionText={actionText}
			text={text}
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
