import { Skeleton } from '@mui/material';
import { ComponentProps, FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

export interface TagLabelSkeletonProps
	extends CommonProps,
		ComponentProps<'span'> {}

export const TagLabelSkeleton: FC<TagLabelSkeletonProps> = memo((props) => {
	const { className, ...rest } = props;

	return (
		<Skeleton className={className} width='5em' height='1.5em' {...rest} />
	);
});
