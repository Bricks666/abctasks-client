import { useUnit } from 'effector-react';
import * as React from 'react';
import { TaskCardMenu } from '@/features/tasks';
import { GroupLabel, groupsModel, SkeletonGroupLabel } from '@/entities/groups';
import { TemplateTaskCard } from '@/entities/tasks';
import { Tag, Task } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface TaskCardProps extends CommonProps, Task {
	readonly group: Tag | null;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo((props) => {
	const { group, id, roomId, } = props;

	const status = useUnit(groupsModel.query.$status);
	const isLoading = status === 'initial' || status === 'pending';

	if (!isLoading && !group) {
		return null;
	}

	const actions = <TaskCardMenu roomId={roomId} taskId={id} />;
	const groupLabel = group ? <GroupLabel {...group} /> : <SkeletonGroupLabel />;

	return <TemplateTaskCard {...props} actions={actions} group={groupLabel} />;
});
