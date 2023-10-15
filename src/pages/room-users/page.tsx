import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { Popups, PopupsProps } from '@/widgets/page';

import { AddUserButton, AddUsersIntoRoom } from '@/features/users';

import { roomModel } from '@/entities/rooms';

import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { UserList } from './ui';

export interface UsersPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.addUser]: AddUsersIntoRoom,
};

const UsersPage: React.FC<UsersPageProps> = (props) => {
	const { className, } = props;
	const canChange = useUnit(roomModel.$canChange);

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
