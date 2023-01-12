import { useUnit } from 'effector-react';
import * as React from 'react';
import { NotificationCard } from '@/widgets/notifications';
import { notificationModel } from '@/entities/notifications';
import { NotificationList } from '@/shared/ui';

export const withNotifications =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			const notification = useUnit(notificationModel.$last);
			const { notifications, position, } = useUnit({
				notifications: notificationModel.$notifications,
				position: notificationModel.$position,
			});
			return (
				<>
					<Component />
					{notification ? <NotificationCard {...notification} /> : null}
					<NotificationList
						notifications={notifications}
						position={position}
						domRootSelector='#root'
					/>
				</>
			);
		};
