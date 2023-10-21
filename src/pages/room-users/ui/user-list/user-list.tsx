import ReplayIcon from '@mui/icons-material/Replay';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { UserInRoomListItem } from '@/widgets/users';

import { SkeletonUserListItem, usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-users');
	const roomId = useParam(routes.room.tasks, 'id');

	const emptyText = t('list.empty_text');

	return (
		<FriendlyList
			className={className}
			$query={usersInRoomModel.query}
			getData={(users) => users.map((user) => ({ ...user, roomId, }))}
			getKey={(item) => item.id}
			skeletonsCount={25}
			ErrorComponent={Error}
			ItemComponent={UserInRoomListItem as any}
			SkeletonComponent={SkeletonUserListItem}
			emptyText={emptyText}
		/>
	);
};

const Error: React.FC = () => {
	const { t, } = useTranslation('room-users');

	const roomId = useParam(routes.room.tasks, 'id');
	const start = useUnit(usersInRoomModel.query.start);

	const text = t('actions.retry_users.text');
	const actionText = t('actions.retry', { ns: 'common', });

	const onRetry = React.useCallback(() => {
		start({ roomId, });
	}, [roomId]);

	return (
		<TextWithAction
			actionText={actionText}
			text={text}
			onClick={onRetry}
			icon={<ReplayIcon />}
		/>
	);
};
