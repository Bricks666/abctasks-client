import { List, Paper } from '@mui/material';
import * as React from 'react';

import { UserInRoomListItem } from '@/widgets/users';

import { useUsersInRoom } from '@/entities/users';

import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { currentRoute } from '../../model';

import styles from './user-list.module.css';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;
	const users = useUsersInRoom();
	const roomId = useParam(currentRoute, 'id');

	const count = users.data.length;

	return (
		<Paper className={className}>
			<List disablePadding>
				{users.data.map((user, index) => (
					<UserInRoomListItem
						className={styles.item}
						{...user}
						roomId={Number(roomId)}
						key={user.id}
						divider={index < count - 1}
					/>
				))}
			</List>
		</Paper>
	);
};
