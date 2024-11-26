/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { UserDto } from '@/shared/api';
import { CommonProps, Slots } from '@/shared/types';

import { UserAvatar } from '../user-avatar';

import styles from './styles.module.css';

export interface TemplateUserListItemProps
	extends CommonProps,
		Pick<UserDto, 'username' | 'email' | 'photo'>,
		Omit<ListItemProps, keyof CommonProps | keyof UserDto | 'slots'> {
	readonly slots?: Slots<'actions' | 'extra'>;
}

export const TemplateUserListItem: React.FC<TemplateUserListItemProps> = (
	props
) => {
	const { username, className, photo, email, slots = {}, ...rest } = props;

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
