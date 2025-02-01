import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardProps,
	Skeleton
} from '@mui/material';
import cn from 'classnames';
import { FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

import styles from './styles.module.css';

export interface RoomCardSkeletonProps extends CommonProps, CardProps<'li'> {}

export const RoomCardSkeleton: FC<RoomCardSkeletonProps> = memo((props) => {
	const { className, ...rest } = props;

	return (
		<Card className={cn(styles.card, className)} {...rest} component='li'>
			<Skeleton sx={{ height: 100, }} variant='rectangular' animation='wave' />
			<CardHeader title={<Skeleton width='6em' />} animation='wave' />
			<CardContent className={styles.content}>
				<Skeleton width='100%' height='2.5em' animation='wave' />
			</CardContent>
			<CardActions className={styles.actions}>
				<Skeleton width='100%' height='2em' animation='wave' />
			</CardActions>
		</Card>
	);
});
