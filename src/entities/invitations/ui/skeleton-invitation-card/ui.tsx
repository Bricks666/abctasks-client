import { Avatar, Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface SkeletonInvitationCardProps extends CommonProps {}

export const SkeletonInvitationCard: React.FC<SkeletonInvitationCardProps> = (
	props
) => {
	const { className, } = props;

	return (
		<Card className={className}>
			<CardHeader
				avatar={
					<Skeleton>
						<Avatar />
					</Skeleton>
				}
				title={<Skeleton variant='text' width='60%' />}
				disableTypography
			/>
			<CardContent>
				<Skeleton>
					<Avatar />
				</Skeleton>
				<Skeleton variant='text' width='60%' />
				<Skeleton>
					<Avatar />
				</Skeleton>
			</CardContent>
			<Skeleton variant='rounded' width='80%' />
		</Card>
	);
};
