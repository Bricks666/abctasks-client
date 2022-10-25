import * as React from 'react';
import { useQuery } from '@farfetched/react';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { getRoomsQuery } from '@/models/rooms';
import { Stack } from '@/ui/Stack';
import { RoomCard } from './RoomCard';

export const RoomList: React.FC = () => {
	const { data, pending } = useQuery(getRoomsQuery);
	const isLoading = !data && pending;

	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}>
			<Stack direction='row'>
				{data?.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</Stack>
		</LoadingWrapper>
	);
};
