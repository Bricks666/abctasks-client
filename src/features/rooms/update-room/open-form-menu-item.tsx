import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, MenuItem, MenuItemProps } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';

import { getParams, popupsMap, routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

export interface OpenUpdateRoomFormMenuItemProps
	extends CommonProps,
		MenuItemProps {
	readonly roomId: number;
}

export const OpenUpdateRoomFormMenuItem: React.FC<
	OpenUpdateRoomFormMenuItemProps
> = (props) => {
	const { className, roomId, ...rest } = props;

	return (
		<MenuItem
			className={className}
			{...rest}
			to={routes.rooms}
			params={{}}
			query={{
				[getParams.popup]: popupsMap.updateRoom,
				[getParams.roomId]: roomId,
			}}
			component={Link}>
			<ListItemIcon>
				<EditIcon />
			</ListItemIcon>
			Edit
		</MenuItem>
	);
};
