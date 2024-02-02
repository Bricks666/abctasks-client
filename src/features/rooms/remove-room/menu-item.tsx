import DeleteIcon from '@mui/icons-material/Delete';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { MenuItem, MenuItemProps } from '@/shared/ui';

import { openConfirm } from './model';

export type RemoveRoomMenuItemProps = CommonProps &
	Omit<MenuItemProps<object>, 'to' | 'params' | 'query' | 'label'> & {
		readonly roomId: number;
	};

export const RemoveRoomMenuItem: React.FC<RemoveRoomMenuItemProps> = (
	props
) => {
	const { roomId, className, } = props;
	const { t, } = useTranslation('rooms');
	const open = useUnit(openConfirm);

	const nameText = t('actions.remove_room.name');

	const onClick = () => {
		open(roomId);
	};

	return (
		<MenuItem
			className={className}
			onClick={onClick}
			icon={<DeleteIcon />}
			label={nameText}
		/>
	);
};
