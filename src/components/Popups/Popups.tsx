import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { routes } from '@/const';
import { CreateTaskPopup } from '../CreateTaskPopup';
import { UpdateTaskPopup } from '../UpdateTaskPopup';
import { GroupsPopup } from '../GroupsPopup';
import { UpdateGroupPopup } from '../UpdateGroupPopup';
import { CreateGroupPopup } from '../CreateGroupPopup';
import { BasePopupProps } from '@/types';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { CreateRoomPopup } from '../CreateRoomPopup';
import { usePopups } from './usePopups';
import { UpdateRoomPopup } from '../UpdateRoomPopup';

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

	React.useEffect(() => {
		if (mountedPopups.length) {
			document.body.classList.add('popup_open');
			return () => {
				document.body.classList.remove('popup_open');
			};
		}
	}, [mountedPopups.length]);
	return (
		<>
			<Outlet />
			<React.Suspense fallback={<LoadingIndicator />}>
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
			</React.Suspense>
		</>
	);
};
