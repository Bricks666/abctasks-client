import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { Popups, PopupsProps } from '@/widgets/page';

import { AddUserButton, AddUsersIntoRoom } from '@/features/users';

import { usersInRoomModel } from '@/entities/users';

import { popupsMap, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat, SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { UserList } from './ui';

export interface UsersPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.addUser]: AddUsersIntoRoom,
};

const UsersPage: React.FC<UsersPageProps> = (props) => {
	const { className, } = props;
	const roomId = useParam(routes.room.users, 'id');
	const isError = useUnit(usersInRoomModel.$hasError);
	const start = useUnit(usersInRoomModel.query.start);

	if (isError) {
		const onRetry = () => {
			start({ roomId, });
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
		<Container className={cn(styles.wrapper, className)}>
			<SectionHeader title='Users' actions={<AddUserButton />} />
			<UserList />
			<Popups popupMap={popupMap} />
		</Container>
	);
};

export default UsersPage;
