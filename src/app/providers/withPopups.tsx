import * as React from 'react';
import { CreateGroupPopup, UpdateGroupPopup } from '@/widgets/groups';
import { CreateRoomPopup, UpdateRoomPopup } from '@/widgets/rooms';
import { CreateTaskPopup, UpdateTaskPopup } from '@/widgets/tasks';
import { usePopups } from '@/entities/popups';
import { popups } from '@/shared/configs';
import { BasePopupProps } from '@/shared/types';

const popupsMap: Record<string, React.ComponentType<BasePopupProps>> = {
	[popups.createTask]: CreateTaskPopup,
	[popups.updateTask]: UpdateTaskPopup,
	[popups.createGroup]: CreateGroupPopup,
	[popups.updateGroup]: UpdateGroupPopup,
	[popups.createRoom]: CreateRoomPopup,
	[popups.updateRoom]: UpdateRoomPopup,
};

export const withPopups =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			const { mountedPopups, popups, } = usePopups();
			return (
				<>
					<Component />
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
