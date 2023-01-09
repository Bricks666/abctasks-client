import { List, ListItem } from '@mui/material';
import * as React from 'react';
import { useUsersInRoom } from '@/entities/rooms';
import { TemplateUserCard } from '@/entities/users';
import { CommonProps } from '@/shared/types';

export interface UserInRoomListProps extends CommonProps {}

export const UserInRoomList: React.FC<UserInRoomListProps> = (props) => {
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
