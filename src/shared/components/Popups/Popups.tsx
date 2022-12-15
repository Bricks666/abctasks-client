import * as React from 'react';
import { CreateGroupPopup, UpdateGroupPopup } from '@/widgets/groups';
import { CreateRoomPopup, UpdateRoomPopup } from '@/widgets/rooms';
import { CreateTaskPopup, UpdateTaskPopup } from '@/widgets/tasks';
import { popups } from '@/shared/const';
import { BasePopupProps } from '@/shared/types';
import { usePopups } from './hooks';

const popupsMap: Record<string, React.ComponentType<BasePopupProps>> = {
	[popups.createTask]: CreateTaskPopup,
	[popups.updateTask]: UpdateTaskPopup,
	[popups.createGroup]: CreateGroupPopup,
	[popups.updateGroup]: UpdateGroupPopup,
	[popups.createRoom]: CreateRoomPopup,
	[popups.updateRoom]: UpdateRoomPopup,
};

export const Popups = () => {
	const { mountedPopups, popups, } = usePopups();

	return (
		<>
			{mountedPopups.map((mountedPopup) => {
				const Component = popupsMap[mountedPopup];

				if (!Component) {
					return null;
				}
				return (
					<Component
						isOpen={popups.includes(mountedPopup)}
						key={mountedPopup}
					/>
				);
			})}
		</>
	);
};
