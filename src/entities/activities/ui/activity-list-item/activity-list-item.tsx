import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityDto } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import { ActivityActionIcon } from '../activity-action-icon';

import styles from './activity-list-item.module.css';

export interface ActivityListItemProps
	extends CommonProps,
		ActivityDto,
		Omit<ListItemProps, keyof ActivityDto> {}

/**
 * @todo Rework props. Stay only needed
 */
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
