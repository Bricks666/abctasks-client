import ReplayIcon from '@mui/icons-material/Replay';
import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { Popups, PopupsProps } from '@/widgets/page';

import { AddUserButton, AddUsersIntoRoom } from '@/features/users';

import { roomModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { popupsMap, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction, SectionHeader } from '@/shared/ui';

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
	const canChange = useUnit(roomModel.$canChange);

	if (isError) {
		const onRetry = () => {
			start({ roomId, });
		};

		return (
			<TextWithAction
				className={className}
				actionText='retry'
				text='Users were not loaded. To retry?'
				onClick={onRetry}
				icon={<ReplayIcon />}
			/>
		);
	}

	const actions = canChange ? <AddUserButton /> : null;

	return (
		<Container className={cn(styles.wrapper, className)}>
			<SectionHeader title='Users' actions={actions} />
			<UserList />
			<Popups popupMap={popupMap} />
		</Container>
	);
};

export default UsersPage;
