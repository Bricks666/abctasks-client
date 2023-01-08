import { List, ListItem } from '@mui/material';
import * as React from 'react';
import { useUsersInRoom } from '@/entities/rooms';
import { TemplateUserCard } from '@/entities/users';
import { CommonProps } from '@/shared/types';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;

	const { data: users, } = useUsersInRoom();
	return (
		<List className={className}>
			{users.map((user) => (
				<ListItem key={user.id}>
					<TemplateUserCard {...user} />
				</ListItem>
			))}
		</List>
	);
};
