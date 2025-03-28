/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText
} from '@mui/material';
import cn from 'classnames';
import { FC } from 'react';

import { CommonProps, Slots } from '@/shared/types';

import { User } from '../../models';
import { UserAvatar } from '../user-avatar';

import styles from './styles.module.css';

export interface TemplateUserListItemProps
	extends CommonProps,
		Omit<ListItemProps, keyof CommonProps | 'slots'> {
	readonly user: User;
	readonly slots?: Slots<'actions' | 'extra'>;
}

export const TemplateUserListItem: FC<TemplateUserListItemProps> = (props) => {
	const { user, className, slots = {}, ...rest } = props;

	return (
		<ListItem
			className={cn(styles.card, className)}
			secondaryAction={slots.actions}
			{...rest}>
			<ListItemAvatar>
				<UserAvatar
					username={user.username}
					email={user.email}
					photo={user.photo}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={user.username}
				secondary={user.email}
				primaryTypographyProps={{ variant: 'subtitle1', component: 'p', }}
			/>
			{slots.extra}
		</ListItem>
	);
};
