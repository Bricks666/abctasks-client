import { Skeleton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface SkeletonTagLabelProps extends CommonProps {}

export const SkeletonTagLabel: React.FC<SkeletonTagLabelProps> = React.memo(
	function SkeletonTagLabel(props) {
		const { className, } = props;
		return <Skeleton className={className} width='5em' height='1em + 4px' />;
	}
);
