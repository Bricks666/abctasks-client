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
import { CommonProps } from '@/shared/types';
import { UserAvatar } from '../user-avatar';

import styles from './template-user-list-item.module.css';

export interface TemplateUserListItemProps
	extends CommonProps,
		User,
		Omit<ListItemProps, keyof CommonProps | keyof User> {
	readonly actions?: React.ReactElement | null;
	readonly extra?: React.ReactElement | null;
}

export const TemplateUserListItem: React.FC<TemplateUserListItemProps> = (
	props
) => {
	const { login, actions, className, photo, extra, id: _id, ...rest } = props;

	return (
		<ListItem
			className={cn(styles.card, className)}
			secondaryAction={actions}
			{...rest}>
			<ListItemAvatar>
				<UserAvatar login={login} photo={photo} />
			</ListItemAvatar>
			<ListItemText
				primary={login}
				primaryTypographyProps={{ variant: 'subtitle1', component: 'p', }}
			/>
			{extra}
		</ListItem>
	);
};
