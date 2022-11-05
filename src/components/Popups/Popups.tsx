import * as React from 'react';
import { routes } from '@/const';
import { BasePopupProps } from '@/types';
import {
	CreateTaskPopup,
	UpdateTaskPopup,
	GroupsPopup,
	UpdateGroupPopup,
	CreateGroupPopup,
	CreateRoomPopup,
	UpdateRoomPopup,
} from './components';
import { usePopups } from './hooks';

const popupsMap: Record<string, React.ComponentType<BasePopupProps>> = {
	[routes.POPUPS.createTask]: CreateTaskPopup,
	[routes.POPUPS.updateTask]: UpdateTaskPopup,
	[routes.POPUPS.groups]: GroupsPopup,
	[routes.POPUPS.createGroup]: CreateGroupPopup,
	[routes.POPUPS.updateGroup]: UpdateGroupPopup,
	[routes.POPUPS.createRoom]: CreateRoomPopup,
	[routes.POPUPS.updateRoom]: UpdateRoomPopup,
};

export const Popups = () => {
	const { mountedPopups, popups } = usePopups();

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
