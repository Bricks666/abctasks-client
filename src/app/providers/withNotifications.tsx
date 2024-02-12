import { SnackbarList } from 'effector-mui-snacks';
import * as React from 'react';

import { notificationsModel } from '@/shared/models';

import 'effector-mui-snacks/dist/style.css';

export const withNotifications =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			return (
				<>
					<Component />
					<SnackbarList
						model={notificationsModel.notifications}
						domRootSelector='body'
					/>
				</>
			);
		};
