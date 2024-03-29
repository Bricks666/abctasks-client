import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { SkeletonRoomCard, roomsModel } from '@/entities/rooms';

import { FriendlyList } from '@/shared/ui';

import { RoomCard } from '../room-card';

import styles from './room-list.module.css';

export const RoomList: React.FC = () => {
	const { t, } = useTranslation('rooms');
	const emptyText = t('rooms_list.empty_text');

	return (
		<FriendlyList
			$query={roomsModel.query}
			getKey={(item) => item.id}
			ItemComponent={RoomCard}
			SkeletonComponent={SkeletonRoomCard}
			skeletonsCount={15}
			ErrorComponent={() => null}
			emptyText={emptyText}
			classes={{
				list: styles.list,
			}}
			slots={{
				after: null,
			}}
			disableBorder
		/>
	);
};
