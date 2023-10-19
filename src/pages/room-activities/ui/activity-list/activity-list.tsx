import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';

import {
	SkeletonActivityListItem,
	ActivityListItem,
	activitiesInRoomModel
} from '@/entities/activities';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

import { ActivitiesPagination } from '../activities-pagination';

export interface ActivityListProps extends CommonProps {}

export const ActivityList: React.FC<ActivityListProps> = (props) => {
	const { className, } = props;

	const hasItems = useUnit(activitiesInRoomModel.$hasItems);

	return (
		<FriendlyList
			className={className}
			$query={activitiesInRoomModel.query}
			getData={(data) => data.items}
			getKey={(item) => item.id}
			skeletonsCount={50}
			ErrorComponent={Error}
			ItemComponent={ActivityListItem}
			SkeletonComponent={SkeletonActivityListItem}
			emptyText='There are no activities in room yet'
			slots={{
				after: hasItems ? <ActivitiesPagination /> : null,
			}}
		/>
	);
};

const Error: React.FC = () => {
	const roomId = useParam(routes.room.tasks, 'id');
	const start = useUnit(activitiesInRoomModel.query.start);

	const onRetry = React.useCallback(() => {
		start({ roomId, });
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
