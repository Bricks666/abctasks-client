import { Collapse, Portal, Stack } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Notification, Position } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { NotificationCard } from '../notification-card';

import styles from './notification-list.module.css';

export interface NotificationListProps extends CommonProps {
	readonly notifications: Notification[];
	readonly position: Position;
	readonly domRootSelector?: string;
}

export const NotificationList: React.FC<NotificationListProps> = (props) => {
	const { notifications, position, domRootSelector, className, } = props;
	const { horizontal, vertical, } = position;

	const isEmpty = !notifications.length;

	const classes = cn(
		styles.container,
		styles[`horizontal__${horizontal}`],
		styles[`vertical__${vertical}`],
		className
	);

	const list = (
		<Collapse className={classes} in={!isEmpty} mountOnEnter unmountOnExit>
			<Stack direction='column-reverse' alignItems='flex-end' spacing={1}>
				{notifications.map((notification) => (
					<NotificationCard {...notification} key={notification.instanceId} />
				))}
			</Stack>
		</Collapse>
	);

	return domRootSelector ? (
		<Portal container={document.querySelector(domRootSelector)}>{list}</Portal>
	) : (
		list
	);
};
