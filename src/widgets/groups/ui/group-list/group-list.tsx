import {
	ListItem,
	ListItemSecondaryAction,
	Skeleton,
	List
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { GroupCardActions } from '@/features/groups';
import { GroupLabel, useGroups } from '@/entities/groups';
import { routes } from '@/shared/configs';
import { getEmptyArray } from '@/shared/const';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface GroupListProps extends CommonProps {}

export const GroupList: React.FC<GroupListProps> = React.memo(
	function GroupList(props) {
		const { className, } = props;
		const roomId = useParam(routes.room, 'id');
		const { data: groups, } = useGroups(roomId);

		const items = groups
			? groups.map((group) => (
				<ListItem key={group.id}>
					<GroupLabel {...group} />
					<ListItemSecondaryAction>
						<GroupCardActions groupId={group.id} roomId={roomId} />
					</ListItemSecondaryAction>
				</ListItem>
			  ))
			: getEmptyArray(4).map((_, i) => (
				<ListItem key={i}>
					<Skeleton width='100%' height='1rem + 4px' />
				</ListItem>
			  ));

		return <List className={cn(className)}>{items}</List>;
	}
);