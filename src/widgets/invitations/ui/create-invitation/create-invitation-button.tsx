import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { createInvitationModel } from '../../models';

export interface CreateInvitationButtonProps extends CommonProps {}

export const CreateInvitationButton: React.FC<CreateInvitationButtonProps> =
	React.memo(() => {
		const { t, } = useTranslation('room-invitations');
		const open = useUnit(createInvitationModel.popupControls.open);

		const title = t('actions.create_invitation.actions.open');

		return (
			<Tooltip title={title}>
				<IconButton onClick={open}>
					<PersonAddAlt1Icon />
				</IconButton>
			</Tooltip>
		);
	});
