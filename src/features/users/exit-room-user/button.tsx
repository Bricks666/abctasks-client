import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { IconButton, Tooltip } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openConfirm } from './model';

export interface ExitRoomUserButtonProps extends CommonProps {
	readonly roomId: number;
}

export const ExitRoomUserButton: React.FC<ExitRoomUserButtonProps> = (
	props
) => {
	const { className, roomId, } = props;

	const { t, } = useTranslation('rooms');
	const open = useUnit(openConfirm);

	const nameText = t('actions.exit_room.name');

	const onClick = () => {
		open(roomId);
	};

	return (
		<Tooltip className={className} title={nameText}>
			<IconButton onClick={onClick}>
				<ExitRoomIcon />
			</IconButton>
		</Tooltip>
	);
};
