import { List, ListItem } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import { AddUsersIntoRoomPopup } from '@/widgets/users';
import { OpenSearchUserPopup } from '@/features/rooms';
import { useUsersInRoom } from '@/entities/rooms';
import { TemplateUserCard } from '@/entities/users';
import { popups, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './page.module.css';

export interface UsersPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popups.addUser]: AddUsersIntoRoomPopup,
};

const UsersPage: React.FC<UsersPageProps> = (props) => {
	const { className, } = props;
	const users = useUsersInRoom();
	const roomId = useParam(routes.room.users, 'id');
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
			<Popups popupMap={popupMap} />
		</div>
	);
};

export default UsersPage;
