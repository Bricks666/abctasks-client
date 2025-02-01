import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import * as React from 'react';

import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { Room } from '../../models';

export interface RoomListItemProps extends CommonProps, ListItemProps {
	readonly room: Room;
}

export const RoomListItem: React.FC<RoomListItemProps> = (props) => {
	const { room, className, ...rest } = props;

	const style = {
		background: stringToColor(''.padEnd(15, room.id.toString())),
	};

	return (
		<ListItem className={className} {...rest} disablePadding>
			<ListItemAvatar>
				<Avatar style={style}>{room.name.at(0)}</Avatar>
			</ListItemAvatar>
			<ListItemText primary={room.name} secondary={room.description} />
		</ListItem>
	);
};
