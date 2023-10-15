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

import styles from './skeleton-activity-list-item.module.css';

export interface SkeletonActivityListItemProps
	extends CommonProps,
		ListItemProps {}

export const SkeletonActivityListItem: React.FC<SkeletonActivityListItemProps> =
	React.memo(function SkeletonActivityCard(props) {
		const { className, ...rest } = props;
		return (
			<ListItem className={cn(styles.item, className)} {...rest}>
				<ListItemAvatar>
					<Skeleton variant='circular'>
						<Avatar />
					</Skeleton>
				</ListItemAvatar>
				<ListItemText
					primary={<Skeleton variant='text' width='80%' />}
					secondary={<Skeleton variant='text' width='25%' />}
				/>
			</ListItem>
		);
	});
