import * as React from 'react';

import { SkeletonRoomCard, useRooms } from '@/entities/rooms';

import { getEmptyArray } from '@/shared/configs';

import { RoomCard } from '../room-card';

import styles from './room-list.module.css';

export const RoomList: React.FC = () => {
	const { data, } = useRooms();
	const isLoading = !data;
	const items = isLoading
		? getEmptyArray(15).map((_, i) => (
			<SkeletonRoomCard className={styles.card} key={i} />
		  ))
		: data.map((room) => (
			<RoomCard className={styles.card} {...room} key={room.id} />
		  ));

	return <section className={styles.list}>{items}</section>;
};
