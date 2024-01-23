import { ListItem, Skeleton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './skeleton-task-progress.module.css';

export interface SkeletonTaskProgressProps extends CommonProps {}

export const SkeletonTaskProgress: React.FC<SkeletonTaskProgressProps> =
	React.memo(function SkeletonTaskProgress(props) {
		const { className, } = props;
		return (
			<ListItem className={cn(styles.item, className)}>
				<Skeleton width='30%' height='1.25em' />
				<Skeleton width='100%' height='1.25em' />
			</ListItem>
		);
	});
