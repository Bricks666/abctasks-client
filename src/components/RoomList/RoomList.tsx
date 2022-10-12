import * as React from 'react';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { getRoomsQuery } from '@/models/rooms';
import { Stack } from '@/ui/Stack';
import { RoomCard } from './RoomCard';
import { useImminentlyQuery } from '@/hooks';

export const RoomList: React.FC = () => {
	const { data, pending } = useImminentlyQuery(getRoomsQuery, undefined);
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
