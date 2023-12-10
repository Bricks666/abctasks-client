import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText,
	Skeleton
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './skeleton-invitation-list-item.module.css';

export interface SkeletonInvitationListItemProps
	extends CommonProps,
		ListItemProps {}

export const SkeletonInvitationListItem: React.FC<
	SkeletonInvitationListItemProps
> = (props) => {
	const {
		className,

		...rest
	} = props;

	return (
		<ListItem className={cn(styles.card, className)} {...rest}>
			<ListItemAvatar>
				<Skeleton variant='circular'>
					<Avatar />
				</Skeleton>
			</ListItemAvatar>
			<ListItemText
				primary={<Skeleton variant='text' width='10%' />}
				secondary={<Skeleton variant='text' width='15%' />}
				primaryTypographyProps={{ variant: 'subtitle1', component: 'p', }}
			/>
		</ListItem>
	);
};
