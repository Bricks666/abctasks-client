import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, MenuItem, MenuItemProps } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';

import { openPopup } from './model';

export interface OpenUpdateRoomFormMenuItemProps
	extends CommonProps,
		MenuItemProps {
	readonly roomId: number;
}

export const OpenUpdateRoomFormMenuItem: React.FC<
	OpenUpdateRoomFormMenuItemProps
> = (props) => {
	const { className, roomId, ...rest } = props;
	const open = useUnit(openPopup);
	const { t, } = useTranslation('rooms');
	const editText = t('actions.update_room.name');

	const onClick = () => {
		open(roomId);
	};

	return (
		<MenuItem className={className} {...rest} onClick={onClick}>
			<ListItemIcon>
				<EditIcon />
			</ListItemIcon>
			{editText}
		</MenuItem>
	);
};
