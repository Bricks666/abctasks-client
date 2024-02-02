import { Container } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	CreateInvitation,
	CreateInvitationButton
} from '@/widgets/invitations';
import { Popups, PopupsProps } from '@/widgets/page';

import { ConfirmRemoveInvitation } from '@/features/invitation';
import { ConfirmRemoveUser, ConfirmUserExit } from '@/features/users';

import { roomModel } from '@/entities/rooms';

import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { InvitationList, UserList } from './ui';

export interface UsersPageProps extends CommonProps {}

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createInvitation]: CreateInvitation,
	[popupsMap.removeInvitation]: ConfirmRemoveInvitation,
	[popupsMap.removeUserFromRoom]: ConfirmRemoveUser,
	[popupsMap.exitRoom]: ConfirmUserExit,
};

const UsersPage: React.FC<UsersPageProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-users');
	const canChange = useUnit(roomModel.$canChange);

	const usersTitle = t('title');
	const invitationsTitle = t('title', { ns: 'room-invitations', });
	const actions = canChange ? <CreateInvitationButton /> : null;

	return (
		<Container className={cn(styles.wrapper, className)}>
			<div className={styles.group}>
				<SectionHeader title={usersTitle} actions={actions} />
				<UserList />
			</div>
			<div className={styles.group}>
				<SectionHeader title={invitationsTitle} />
				<InvitationList />
			</div>
			<Popups popupMap={popupMap} />
		</Container>
	);
};

export default UsersPage;
