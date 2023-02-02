import { ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import * as React from 'react';
import { Group } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { GroupLabel } from '../group-label';

export interface GroupListItemProps extends CommonProps, Group {
	readonly actions?: React.ReactElement | null;
}

export const GroupListItem: React.FC<GroupListItemProps> = (props) => {
	const { actions, className, ...rest } = props;
	return (
		<ListItem className={className}>
			<ListItemText>
				<GroupLabel {...rest} />
			</ListItemText>
			<ListItemSecondaryAction>{actions}</ListItemSecondaryAction>
		</ListItem>
	);
};
