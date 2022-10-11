import * as React from 'react';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { useRooms } from '@/hooks';
import { Stack } from '@/ui/Stack';
import { RoomCard } from './RoomCard';

export const RoomList: React.FC = () => {
	const { isLoading, rooms } = useRooms();
	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}>
			<Stack direction='row'>
				{rooms.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</Stack>
		</LoadingWrapper>
	);
};
