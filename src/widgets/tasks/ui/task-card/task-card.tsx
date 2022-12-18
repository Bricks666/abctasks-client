import { useUnit } from 'effector-react';
import * as React from 'react';
import { TaskCardActions } from '@/features/tasks';
import {
	GroupLabel,
	groupsModel,
	SkeletonGroupLabel,
	useGroup
} from '@/entities/groups';
import { TemplateTaskCard } from '@/entities/tasks';
import { Task } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { groupId, id, roomId, } = props;

	const { data: group, } = useGroup(roomId, groupId);
	const status = useUnit(groupsModel.getGroupsQuery.$status);
	const isLoading = status === 'initial' || status === 'pending';

	if (!isLoading && !group) {
		return null;
	}

	const actions = <TaskCardActions roomId={roomId} taskId={id} />;
	const groupLabel = !isLoading ? (
		<GroupLabel {...group!} />
	) : (
		<SkeletonGroupLabel />
	);

	return <TemplateTaskCard actions={actions} group={groupLabel} {...props} />;
});
