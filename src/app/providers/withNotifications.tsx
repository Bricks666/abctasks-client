import * as React from 'react';
import { notificationsModel } from '@/entities/notifications';
import { SnackbarList } from '@/shared/ui';

export const withNotifications =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<>
					<Component />
					<SnackbarList
						model={notificationsModel.notifications}
						domRootSelector='#root'
					/>
				</>
			);
		};
