import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText
} from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';

import { Room } from '@/shared/api';
import { routes } from '@/shared/configs';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface RoomListItemProps extends CommonProps, Room {}

export const RoomListItem: React.FC<RoomListItemProps> = (props) => {
	const { description, id, name, className, } = props;
	const style = {
		background: stringToColor(''.padEnd(15, id.toString())),
	};

	return (
		<ListItem className={className} disablePadding>
			<ListItemButton
				to={routes.room.tasks as any}
				params={{ id, }}
				component={Link}>
				<ListItemAvatar>
					<Avatar style={style}>{name.at(0)}</Avatar>
				</ListItemAvatar>
				<ListItemText primary={name} secondary={description} />
			</ListItemButton>
		</ListItem>
	);
};
