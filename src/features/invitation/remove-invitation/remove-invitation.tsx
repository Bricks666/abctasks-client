import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openConfirm } from './model';

export interface RemoveInvitationProps extends CommonProps {
	readonly id: number;
}

export const RemoveInvitation: React.FC<RemoveInvitationProps> = (props) => {
	const { className, id, } = props;

	const openPopup = useUnit(openConfirm);

	const { t, } = useTranslation('room-invitations');

	const openText = t('actions.remove_invitation.actions.open');

	const onClick = () => {
		openPopup(id);
	};

	return (
		<Tooltip title={openText}>
			<IconButton className={className} color='primary' onClick={onClick}>
				<RemoveIcon />
			</IconButton>
		</Tooltip>
	);
};
