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
			menu={<CardMenu roomId={id} canChange={canChange} />}
			actions={<OpenRoom id={id} />}
		/>
	);
};

const CardMenu: React.FC<{ roomId: number; canChange?: boolean }> = (props) => {
	const { roomId, canChange, } = props;

	return (
		<EditMenu>
			{canChange ? <OpenUpdateRoomFormMenuItem roomId={roomId} /> : null}
			<ExitRoomUserMenuItem roomId={roomId} />
			{canChange ? <RemoveRoomMenuItem roomId={roomId} /> : null}
		</EditMenu>
	);
};
