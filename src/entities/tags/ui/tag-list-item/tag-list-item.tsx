import { ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import * as React from 'react';
import { Tag } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { TagLabel } from '../tag-label';

export interface TagListItemProps extends CommonProps, Tag {
	readonly actions?: React.ReactElement | null;
}

export const TagListItem: React.FC<TagListItemProps> = (props) => {
	const { actions, className, ...rest } = props;
	return (
		<ListItem className={className}>
			<ListItemText>
				<TagLabel {...rest} />
			</ListItemText>
			<ListItemSecondaryAction>{actions}</ListItemSecondaryAction>
		</ListItem>
	);
};
