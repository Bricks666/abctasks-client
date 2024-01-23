import * as React from 'react';

import {
	OpenRoom,
	OpenUpdateRoomFormMenuItem,
	RemoveRoomMenuItem
} from '@/features/rooms';
import { ExitRoomUserMenuItem } from '@/features/users';

import { TemplateRoomCard } from '@/entities/rooms';

import { Room } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { EditMenu } from '@/shared/ui';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = (props) => {
	const { id, canChange, } = props;
	return (
		<TemplateRoomCard
			{...props}
			menu={canChange ? <CardMenu roomId={id} /> : null}
			actions={<OpenRoom id={id} />}
		/>
	);
};

const CardMenu: React.FC<{ roomId: number }> = (props) => {
	const { roomId, } = props;

	return (
		<EditMenu>
			<OpenUpdateRoomFormMenuItem roomId={roomId} />
			<ExitRoomUserMenuItem roomId={roomId} />
			<RemoveRoomMenuItem roomId={roomId} />
		</EditMenu>
	);
};
