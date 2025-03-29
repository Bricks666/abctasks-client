import { ListItem, ListItemProps, Skeleton } from '@mui/material';
import { FC, memo } from 'react';

import { CommonProps } from '@/shared/types';

export interface TagListItemSkeletonProps extends CommonProps, ListItemProps {}

export const TagListItemSkeleton: FC<TagListItemSkeletonProps> = memo(
	(props) => {
		const { className, ...rest } = props;
		return (
			<ListItem className={className} {...rest}>
				<Skeleton width='5em' height='1.5em' />
			</ListItem>
		);
	}
);
