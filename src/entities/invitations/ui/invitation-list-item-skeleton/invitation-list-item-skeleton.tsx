import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	type ListItemProps
} from '@mui/material';
import cn from 'classnames';
import { memo, type FC } from 'react';

import type { CommonProps } from '@/shared/types';

import styles from './styles.module.css';

export interface InvitationListItemSkeletonProps
	extends CommonProps,
		ListItemProps {}

export const InvitationListItemSkeleton: FC<InvitationListItemSkeletonProps> =
	memo((props) => {
		const { className, ...rest } = props;

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
	});
