import AddLinkIcon from '@mui/icons-material/AddLink';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	GenerateInvitationLink,
	InviteUserIntoRoom
} from '@/features/invitation';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { deviceInfoModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

import { createInvitationModel } from '../../models';

import styles from './create-invitation.module.css';

export interface CreateInvitationProps extends CommonProps, BasePopupProps {}

export const CreateInvitation: React.FC<CreateInvitationProps> = (props) => {
	const [tab, setTab] = React.useState('invite_user');
	const { t, } = useTranslation('room-invitations');
	const roomId = useParam(routes.room.users, 'id');

	const close = useUnit(createInvitationModel.popupControls.close);

	const [isVertical, isMobile] = useUnit([
		deviceInfoModel.$isTabletVertical,
		deviceInfoModel.$isMobile
	]);

	const showLabels = !isVertical && !isMobile;

	const translation = t('actions', { returnObjects: true, }) as Record<
		string,
		any
	>;

	const { title, } = translation[tab];

	const onChange = React.useCallback((_evt: unknown, value: string) => {
		setTab(value);
	}, []);

	return (
		<MainPopup {...props} title={title} onClose={close}>
			<TabContext value={tab}>
				<TabList onChange={onChange} variant='fullWidth' scrollButtons='auto'>
					<Tab
						icon={<AddLinkIcon />}
						iconPosition='start'
						label={showLabels ? translation.generate_link.title_short : null}
						value='generate_link'
					/>
					<Tab
						icon={<PersonAddIcon />}
						iconPosition='start'
						label={showLabels ? translation.invite_user.title_short : null}
						value='invite_user'
					/>
				</TabList>
				<TabPanel className={styles.tab} value='generate_link'>
					<GenerateInvitationLink roomId={roomId} />
				</TabPanel>
				<TabPanel className={styles.tab} value='invite_user'>
					<InviteUserIntoRoom />
				</TabPanel>
			</TabContext>
		</MainPopup>
	);
};
