import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Skeleton,
	type CardProps
} from '@mui/material';
import { type FC, memo } from 'react';

import type { CommonProps } from '@/shared/types';

export interface InvitationCardSkeletonProps extends CommonProps, CardProps {}

export const InvitationCardSkeleton: FC<InvitationCardSkeletonProps> = memo(
	(props) => {
		return (
			<Card {...props}>
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
	}
);
