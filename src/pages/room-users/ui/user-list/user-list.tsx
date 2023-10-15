import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { UserInRoomListItem } from '@/widgets/users';

import { SkeletonUserListItem, usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.tasks, 'id');

	return (
		<FriendlyList
			className={className}
			$query={usersInRoomModel.query}
			getData={(users) => users.map((user) => ({ ...user, roomId, }))}
			getKey={(item) => item.id}
			skeletonsCount={25}
			ErrorComponent={Error}
			ItemComponent={UserInRoomListItem}
			SkeletonComponent={SkeletonUserListItem}
			emptyText='There are no users in room yet'
		/>
	);
};

const Error: React.FC = () => {
	const roomId = useParam(routes.room.tasks, 'id');
	const refresh = useUnit(usersInRoomModel.query.refresh);

	const onRetry = React.useCallback(() => {
		refresh({ roomId, });
	}, [roomId]);

	return (
		<TextWithAction
			actionText='retry'
			text='Users were not loaded. To retry?'
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
