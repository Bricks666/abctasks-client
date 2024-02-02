import ExitRoomIcon from '@mui/icons-material/MeetingRoom';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { MenuItem } from '@/shared/ui';

import { openConfirm } from './model';

export interface ExitRoomUserMenuItemProps extends CommonProps {
	readonly roomId: number;
}

export const ExitRoomUserMenuItem: React.FC<ExitRoomUserMenuItemProps> = (
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
		<MenuItem
			className={className}
			onClick={onClick}
			icon={<ExitRoomIcon />}
			label={nameText}
		/>
	);
};
