import { Skeleton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import styles from './SkeletonTaskForm.module.css';

export interface SkeletonTaskFormProps extends CommonProps {}

export const SkeletonTaskForm: React.FC<SkeletonTaskFormProps> = React.memo(
	function SkeletonTaskForm(props) {
		const { className, } = props;
		return (
			<div className={cn(styles.form, className)}>
				<Skeleton className={styles.select} />
				<Skeleton className={styles.select} />
				<Skeleton className={styles.field} />
				<Skeleton className={styles.button} />
			</div>
		);
	}
);
