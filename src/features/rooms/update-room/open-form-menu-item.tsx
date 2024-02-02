import EditIcon from '@mui/icons-material/Edit';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { MenuItem, MenuItemProps } from '@/shared/ui';

import { openPopup } from './model';

export type OpenUpdateRoomFormMenuItemProps = CommonProps &
	Omit<MenuItemProps<object>, 'to' | 'params' | 'query' | 'label'> & {
		readonly roomId: number;
	};

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
		<MenuItem
			className={className}
			{...rest}
			onClick={onClick}
			icon={<EditIcon />}
			label={editText}
		/>
	);
};
