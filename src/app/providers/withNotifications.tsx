import { SnackbarList } from 'effector-mui-snacks';
import * as React from 'react';

import { notificationsModel } from '@/entities/notifications';

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
