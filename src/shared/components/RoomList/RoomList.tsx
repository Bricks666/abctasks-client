import { useQuery } from '@farfetched/react';
import * as React from 'react';
import { getEmptyArray } from '@/shared/const';
import { RoomCard, SkeletonRoomCard } from './components';

import styles from './RoomList.module.css';
import { getRoomsQuery } from '@/models';

export const RoomList: React.FC = () => {
	const { data, } = useQuery(getRoomsQuery);
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
