import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemProps,
	ListItemText,
	Skeleton
} from '@mui/material';
import cn from 'classnames';
import { type FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

import styles from './styles.module.css';

export interface ActivityListItemSkeletonProps
	extends CommonProps,
		ListItemProps {}

export const ActivityListItemSkeleton: FC<ActivityListItemSkeletonProps> = memo(
	(props) => {
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
	}
);
