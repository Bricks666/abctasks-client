import { List } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { TemplateUserCard, useUsersInRoom } from '@/entities/users';
import { CommonProps } from '@/shared/types';

export interface UserListProps extends CommonProps {}

export const UserList: React.FC<UserListProps> = (props) => {
	const { className, } = props;
	const users = useUsersInRoom();

	return (
		<List className={cn(className)}>
			{users.data.map((user) => (
				<TemplateUserCard {...user} key={user.id} />
			))}
		</List>
	);
};
