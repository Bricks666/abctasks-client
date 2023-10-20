import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Activity } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import { ActivityActionPicture } from '../activity-action-picture';

import styles from './activity-list-item.module.css';

export interface ActivityListItemProps
	extends CommonProps,
		Activity,
		Omit<ListItemProps, keyof Activity> {}

export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		id: _,
		action,
		sphere,
		className,
		createdAt,
		activist,
		...rest
	} = props;
	const { t, } = useTranslation('room');
	const activityText = t('activities.text', {
		type: action.name,
		sphere: sphere.name,
		activist: activist.username,
	});

	return (
		<ListItem className={cn(styles.item, className)} {...rest}>
			<ListItemAvatar>
				<ActivityActionPicture {...action} />
			</ListItemAvatar>
			<ListItemText
				primary={activityText}
				secondary={<DateTime date={createdAt} format='HH:mm MMM DD' />}
			/>
		</ListItem>
	);
};
