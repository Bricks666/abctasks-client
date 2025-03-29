import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import { Activity } from '../../models';
import { ActivityActionIcon } from '../activity-action-icon';

import styles from './styles.module.css';

export interface ActivityListItemProps
	extends CommonProps,
		Pick<Activity, 'activist' | 'sphere' | 'action' | 'createdAt'>,
		ListItemProps {}

/**
 * @todo Rework props. Stay only needed
 */
export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
	const { action, sphere, className, createdAt, activist, ...rest } = props;
	const { t, } = useTranslation('activities');
	const activityText = t('card.text', {
		type: action.name,
		sphere: sphere.name,
		activist: activist.username,
	});

	return (
		<ListItem className={cn(styles.item, className)} {...rest}>
			<ListItemAvatar>
				<ActivityActionIcon action={action.name} />
			</ListItemAvatar>
			<ListItemText
				primary={activityText}
				secondary={<DateTime date={createdAt} format='HH:mm MMM DD' />}
			/>
		</ListItem>
	);
};
