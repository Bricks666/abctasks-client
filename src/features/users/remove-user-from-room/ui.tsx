import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openConfirm } from './model';

export interface RemoveUserFromRoomProps extends CommonProps {
	readonly userId: number;
}

export const RemoveUserFromRoom: React.FC<RemoveUserFromRoomProps> = (
	props
) => {
	const { userId, className, } = props;
	const { t, } = useTranslation('room-users');
	const open = useUnit(openConfirm);

	const openText = t('actions.remove_user.actions.open');

	const onClick = () => {
		open(userId);
	};

	return (
		<Tooltip title={openText}>
			<IconButton className={className} onClick={onClick}>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	);
};
