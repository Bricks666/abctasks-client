import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Skeleton
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import styles from './skeleton-room-card.module.css';

export interface SkeletonRoomCardProps extends CommonProps {}

export const SkeletonRoomCard: React.FC<SkeletonRoomCardProps> = React.memo(
	function SkeletonRoomCard(props) {
		const { className, } = props;
		return (
			<Card className={cn(styles.card, className)}>
				<CardHeader title={<Skeleton width='6em' />} />
				<CardContent>
					<Skeleton width='100%' height='2.5em' />
				</CardContent>
				<CardActions>
					<Skeleton width='100%' height='2em' />
				</CardActions>
			</Card>
		);
	}
);