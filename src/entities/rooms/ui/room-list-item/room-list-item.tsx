import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText
} from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { Room } from '@/shared/api';
import { stringToColor } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { roomModel } from '../../model';

export interface RoomListItemProps extends CommonProps, Room {}

export const RoomListItem: React.FC<RoomListItemProps> = (props) => {
	const { description, id, name, className, } = props;
	const openRoomPage = useUnit(roomModel.openRoomPage);

	const style = {
		background: stringToColor(''.padEnd(15, id.toString())),
	};

	const onClick = React.useCallback(() => {
		openRoomPage({ roomId: id, });
	}, [id, openRoomPage]);

	return (
		<ListItem className={className} disablePadding>
			<ListItemButton onClick={onClick}>
				<ListItemAvatar>
					<Avatar style={style}>{name.at(0)}</Avatar>
				</ListItemAvatar>
				<ListItemText primary={name} secondary={description} />
			</ListItemButton>
		</ListItem>
	);
};
