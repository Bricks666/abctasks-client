import * as React from 'react';
import { Stack } from '@mui/material';
import { useQuery } from '@farfetched/react';
import { getRoomsQuery } from '@/models/rooms';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { RoomCard } from './RoomCard';

export const RoomList: React.FC = () => {
	const { data, pending } = useQuery(getRoomsQuery);
	const isLoading = !data && pending;

	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}>
			<Stack spacing={1} direction='row'>
				{data?.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</Stack>
		</LoadingWrapper>
	);
};
