import { useUnit } from 'effector-react';
import * as React from 'react';
import { notificationsModel } from '@/entities/notifications';
import { SnackbarList } from '@/shared/ui';

export const withNotifications =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			const { items, position, } = useUnit({
				items: notificationsModel.$items,
				position: notificationsModel.$position,
			});
			return (
				<>
					<Component />
					<SnackbarList
						items={items}
						position={position}
						domRootSelector='#root'
					/>
				</>
			);
		};
