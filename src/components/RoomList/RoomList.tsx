import * as React from 'react';
import { useQuery } from '@farfetched/react';
import { getRoomsQuery } from '@/models/rooms';
import { RoomCard } from './RoomCard';
import { ui } from '@/const';
import { SkeletonRoomCard } from './SkeletonRoomCard';

import styles from './RoomList.module.css';

export const RoomList: React.FC = () => {
	const { data } = useQuery(getRoomsQuery);
	const isLoading = !data;
	const items = isLoading
		? ui
				.getEmptyArray(15)
				.map((_, i) => <SkeletonRoomCard className={styles.card} key={i} />)
		: data.map((room) => (
				<RoomCard className={styles.card} {...room} key={room.id} />
		  ));

	return <section className={styles.list}>{items}</section>;
};
