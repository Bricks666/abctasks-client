import { Skeleton, Stack } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import styles from './skeleton-room-form.module.css';

export interface SkeletonRoomFormProps extends CommonProps {}

export const SkeletonRoomForm: React.FC<SkeletonRoomFormProps> = (props) => {
	const { className, } = props;

	return (
		<Stack className={cn(styles.form, className)} spacing={1}>
			<Skeleton height='3em' />
			<Skeleton height='3em' />
			<Skeleton height='3em' />
		</Stack>
	);
};
