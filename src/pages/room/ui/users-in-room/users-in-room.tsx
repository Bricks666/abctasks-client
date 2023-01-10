import { List, ListItem } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { OpenSearchUserPopup } from '@/features/rooms';
import { useUsersInRoom } from '@/entities/rooms';
import { TemplateUserCard } from '@/entities/users';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './users-in-room.module.css';

export interface UserInRoomProps extends CommonProps {}

export const UsersInRoom: React.FC<UserInRoomProps> = (props) => {
	const { className, } = props;
	const users = useUsersInRoom();
	const roomId = useParam(routes.room, 'id');
	const isError = !!users.error;

	if (isError) {
		const onRetry = () => {
			users.start({ roomId, });
		};

		return (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Users were not loaded. To retry?'
				onRetry={onRetry}
			/>
		);
	}

	return (
		<div className={cn(styles.wrapper, className)}>
			<OpenSearchUserPopup />
			<List>
				{users.data.map((user) => (
					<ListItem key={user.id}>
						<TemplateUserCard {...user} />
					</ListItem>
				))}
			</List>
		</div>
	);
};
