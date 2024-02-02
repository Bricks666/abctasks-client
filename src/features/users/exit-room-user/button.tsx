import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openConfirm } from './model';

export interface ExitRoomUserButtonProps extends CommonProps {}

export const ExitRoomUserButton: React.FC<ExitRoomUserButtonProps> = (
	props
) => {
	const { className, } = props;

	const { t, } = useTranslation('rooms');
	const open = useUnit(openConfirm);

	const nameText = t('actions.exit_room.name');

	return (
		<Tooltip className={className} title={nameText}>
			<IconButton onClick={open}>
				<ExitRoomIcon />
			</IconButton>
		</Tooltip>
	);
};
