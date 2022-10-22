import * as React from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { CommonProps } from '@/types/common';
import { StyledBlock, StyledCard, StyledCardContent } from './styles';

export interface SkeletonActivityCardProps extends CommonProps {}

export const SkeletonActivityCard: React.FC<SkeletonActivityCardProps> =
	React.memo(function SkeletonActivityCard(props) {
		const { className } = props;
		return (
			<StyledCard className={className}>
				<StyledCardContent>
					<Skeleton variant='circular'>
						<Avatar />
					</Skeleton>
					<StyledBlock>
						<Skeleton variant='text' width='80%' />
						<Skeleton variant='text' width='50%' />
						<Skeleton variant='text' width='25%' />
					</StyledBlock>
				</StyledCardContent>
			</StyledCard>
		);
	});
