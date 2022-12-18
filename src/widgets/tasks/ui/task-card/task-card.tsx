import * as React from 'react';
import { TaskCardActions } from '@/features/tasks';
import { GroupLabel, SkeletonGroupLabel, useGroup } from '@/entities/groups';
import { TemplateTaskCard } from '@/entities/tasks';
import { Task } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface TaskCardProps extends CommonProps, Task {}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { groupId, id, roomId, } = props;

	const group = useGroup(roomId, groupId);

	const actions = <TaskCardActions roomId={roomId} taskId={id} />;
	const groupLabel = group ? <GroupLabel {...group} /> : <SkeletonGroupLabel />;

	return <TemplateTaskCard actions={actions} group={groupLabel} {...props} />;
});
