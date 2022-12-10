/* eslint-disable react/no-array-index-key */
import {
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	Typography
} from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { SkeletonGroupLabel } from '@/shared/ui/SkeletonGroupLabel';

export interface SkeletonTaskCardProps extends CommonProps {
	readonly contentLinesCount?: number;
}

export const SkeletonTaskCard: React.FC<SkeletonTaskCardProps> = React.memo(
	function SkeletonTaskCard(props) {
		const { className, contentLinesCount = 2, } = props;
		const lines = Array(contentLinesCount).fill(0);
		return (
			<Card className={className}>
				<CardHeader title={<SkeletonGroupLabel />} />
				<CardContent>
					{lines.map((_, i) => (
						<Typography key={i}>
							<Skeleton width='100%' />
						</Typography>
					))}
				</CardContent>
			</Card>
		);
	}
);
