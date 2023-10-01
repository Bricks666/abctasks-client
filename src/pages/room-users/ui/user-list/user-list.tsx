import { List, Paper } from '@mui/material';
import * as React from 'react';

import { TemplateUserListItem, useUsersInRoom } from '@/entities/users';

import { CommonProps } from '@/shared/types';

import styles from './user-list.module.css';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;
	const users = useUsersInRoom();

	const count = users.data.length;

	return (
		<Paper className={className}>
			<List disablePadding>
				{users.data.map((user, index) => (
					<TemplateUserListItem
						className={styles.item}
						{...user}
						key={user.id}
						divider={index < count - 1}
					/>
				))}
			</List>
		</Paper>
	);
};
