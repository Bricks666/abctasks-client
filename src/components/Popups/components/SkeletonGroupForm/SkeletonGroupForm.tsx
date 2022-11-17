import * as React from 'react';
import cn from 'classnames';
import { Skeleton } from '@mui/material';
import { CommonProps } from '@/types';
import { SkeletonGroupLabel } from '@/shared/components/SkeletonGroupLabel';

import styles from './SkeletonGroupForm.module.css';

export interface SkeletonGroupFormProps extends CommonProps {}

export const SkeletonGroupForm: React.FC<SkeletonGroupFormProps> = React.memo(
	function SkeletonGroupForm(props) {
		const { className } = props;
		return (
			<div className={cn(styles.wrapper, className)}>
				<SkeletonGroupLabel />
				<Skeleton className={styles.input} height='6em' />
				<Skeleton className={styles.colorInput} height='6em' />
				<Skeleton className={styles.colorInput} height='6em' />
				<Skeleton className={styles.button} height='2em' width='5em' />
			</div>
		);
	}
);
