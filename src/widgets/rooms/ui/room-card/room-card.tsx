import * as React from 'react';
import { RoomCardActions, RoomCardMenu } from '@/features/rooms';
import { TemplateRoomCard } from '@/entities/rooms';
import { Room } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface RoomCardProps extends CommonProps, Room {}

export const RoomCard: React.FC<RoomCardProps> = (props) => {
	const { id, } = props;
	return (
		<TemplateRoomCard
			{...props}
			menu={<RoomCardMenu id={id} />}
			actions={<RoomCardActions id={id} />}
		/>
	);
};
