import { Skeleton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface SkeletonGroupLabelProps extends CommonProps {}

export const SkeletonGroupLabel: React.FC<SkeletonGroupLabelProps> = React.memo(
	function SkeletonGroupLabel(props) {
		const { className, } = props;
		return <Skeleton className={className} width='5em' height='1em + 4px' />;
	}
);