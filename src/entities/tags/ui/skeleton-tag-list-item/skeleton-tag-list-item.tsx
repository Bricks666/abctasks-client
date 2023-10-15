import { ListItem, ListItemProps, Skeleton } from '@mui/material';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface SkeletonTagListItemProps extends CommonProps, ListItemProps {}

export const SkeletonTagListItem: React.FC<SkeletonTagListItemProps> =
	React.memo(function SkeletonTagLabel(props) {
		const { className, ...rest } = props;
		return (
			<ListItem className={className} {...rest}>
				<Skeleton width='5em' height='1.5em' />
			</ListItem>
		);
	});
