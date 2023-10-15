import * as React from 'react';

import { SkeletonRoomCard, roomsModel } from '@/entities/rooms';

import { FriendlyList } from '@/shared/ui';

import { RoomCard } from '../room-card';

import styles from './room-list.module.css';

export const RoomList: React.FC = () => {
	return (
		<FriendlyList
			$query={roomsModel.query}
			getKey={(item) => item.id}
			ItemComponent={RoomCard}
			SkeletonComponent={SkeletonRoomCard}
			skeletonsCount={15}
			ErrorComponent={() => null}
			emptyText='There are no room yet. Create is for continue'
			classes={{
				list: styles.list,
			}}
			disableBorder
		/>
	);
};
