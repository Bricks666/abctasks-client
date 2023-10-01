/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { User } from '@/shared/api';
import { CommonProps, Slots } from '@/shared/types';

import { UserAvatar } from '../user-avatar';

import styles from './template-user-list-item.module.css';

export interface TemplateUserListItemProps
	extends CommonProps,
		User,
		Omit<ListItemProps, keyof CommonProps | keyof User | 'slots'> {
	readonly slots?: Slots<'actions' | 'extra'>;
}

export const TemplateUserListItem: React.FC<TemplateUserListItemProps> = (
	props
) => {
	const {
		username,
		className,
		photo,
		email,
		id: _id,
		slots = {},
		...rest
	} = props;

	return (
		<ListItem
			className={cn(styles.card, className)}
			secondaryAction={slots.actions}
			{...rest}>
			<ListItemAvatar>
				<UserAvatar username={username} email={email} photo={photo} />
			</ListItemAvatar>
			<ListItemText
				primary={username}
				secondary={email}
				primaryTypographyProps={{ variant: 'subtitle1', component: 'p', }}
			/>
			{slots.extra}
		</ListItem>
	);
};
