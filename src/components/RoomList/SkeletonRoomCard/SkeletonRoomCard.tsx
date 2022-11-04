import * as React from 'react';
import cn from 'classnames';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Skeleton,
} from '@mui/material';
import { CommonProps } from '@/types';

import styles from './SkeletonRoomCard.module.css';

export interface SkeletonRoomCardProps extends CommonProps {}

export const SkeletonRoomCard: React.FC<SkeletonRoomCardProps> = React.memo(
	function SkeletonRoomCard(props) {
		const { className } = props;
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
