import React, { FC } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { useRooms } from "@/hooks";
import { RoomCard } from "./RoomCard";
import { Stack } from "@mui/material";

export const RoomList: FC = () => {
	const { isLoading, rooms } = useRooms();
	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}
		>
			<Stack direction="row" spacing={2}>
				{rooms.map((room) => (
					<RoomCard {...room} key={room.id} />
				))}
			</Stack>
		</LoadingWrapper>
	);
};
