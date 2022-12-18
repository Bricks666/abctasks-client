import { useUnit } from 'effector-react';
import * as React from 'react';
import { NotificationCard } from '@/widgets/notifications';
import { notificationModel } from '@/entities/notifications';

export const withNotifications =
	(Component: React.ComponentType): React.ComponentType =>
		() => {
			const notification = useUnit(notificationModel.$lastNotification);
			return (
				<>
					<Component />
					{notification ? <NotificationCard {...notification} /> : null}
				</>
			);
		};
