import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Popups, PopupsProps } from '@/widgets/page';

import { InviteUserButton, InviteUserIntoRoom } from '@/features/invitation';

import { roomModel } from '@/entities/rooms';

import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { UserList } from './ui';

export interface UsersPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.inviteUser]: InviteUserIntoRoom,
};

const UsersPage: React.FC<UsersPageProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-users');
	const canChange = useUnit(roomModel.$canChange);

	const title = t('title');
	const actions = canChange ? <InviteUserButton /> : null;

	return (
		<Container className={cn(styles.wrapper, className)}>
			<SectionHeader title={title} actions={actions} />
			<UserList />
			<Popups popupMap={popupMap} />
		</Container>
	);
};

export default UsersPage;
