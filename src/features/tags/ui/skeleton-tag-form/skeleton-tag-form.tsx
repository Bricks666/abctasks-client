import { Skeleton } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { SkeletonTagLabel } from '@/entities/tags';
import { CommonProps } from '@/shared/types';

import styles from './skeleton-tag-form.module.css';

export interface SkeletonTagFormProps extends CommonProps {}

export const SkeletonTagForm: React.FC<SkeletonTagFormProps> = React.memo(
	function SkeletonTagForm(props) {
		const { className, } = props;
		return (
			<div className={cn(styles.wrapper, className)}>
				<SkeletonTagLabel />
				<Skeleton className={styles.input} height='3em' />
				<Skeleton className={styles.colorInput} height='3em' />
				<Skeleton className={styles.colorInput} height='3em' />
				<Skeleton className={styles.button} height='2em' width='8em' />
			</div>
		);
	}
);
