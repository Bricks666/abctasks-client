/* eslint-disable react/no-array-index-key */
import {
	Card,
	CardContent,
	CardHeader,
	CardProps,
	Skeleton,
	Typography
} from '@mui/material';
import { type FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

export interface TaskCardSkeletonProps extends CommonProps, CardProps {
	readonly contentLinesCount?: number;
}

export const TaskCardSkeleton: FC<TaskCardSkeletonProps> = memo((props) => {
	const { className, contentLinesCount = 2, ...rest } = props;
	const lines = Array(contentLinesCount).fill(0);
	return (
		<Card className={className} {...rest}>
			<CardHeader title={<Skeleton height='1.5em' width='50%' />} />
			<CardContent>
				{lines.map((_, i) => (
					<Typography key={i}>
						<Skeleton width='100%' />
					</Typography>
				))}
			</CardContent>
		</Card>
	);
});
