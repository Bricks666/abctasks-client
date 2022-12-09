import { Avatar, Card, CardContent, Skeleton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import styles from './SkeletonActivityCard.module.css';
import { CommonProps } from '@/types';

export interface SkeletonActivityCardProps extends CommonProps {}

export const SkeletonActivityCard: React.FC<SkeletonActivityCardProps> =
	React.memo(function SkeletonActivityCard(props) {
		const { className, } = props;
		return (
			<Card className={cn(styles.card, className)}>
				<CardContent className={styles.cardContent}>
					<Skeleton variant='circular'>
						<Avatar />
					</Skeleton>
					<div className={styles.block}>
						<Skeleton variant='text' width='80%' />
						<Skeleton variant='text' width='50%' />
						<Skeleton variant='text' width='25%' />
					</div>
				</CardContent>
			</Card>
		);
	});
