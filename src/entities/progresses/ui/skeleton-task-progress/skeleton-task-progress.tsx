import { Skeleton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface SkeletonTaskProgressProps extends CommonProps {}

export const SkeletonTaskProgress: React.FC<SkeletonTaskProgressProps> =
	React.memo(function SkeletonTaskProgress(props) {
		const { className, } = props;
		return (
			<div className={className}>
				<Skeleton width='30%' height='1.25em' />
				<Skeleton width='100%' height='1.25em' />
			</div>
		);
	});
