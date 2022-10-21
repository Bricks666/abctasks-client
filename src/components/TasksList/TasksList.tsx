import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useMutation } from '@farfetched/react';
import { TaskStatus, Task, updateTaskMutation } from '@/models/tasks';
import { CommonProps } from '@/types/common';
import { TaskListHeader } from '../TaskListHeader';
import { TaskCard } from '../TaskCard';
import { SkeletonTaskCard } from '../SkeletonTaskCard';
import { StyledList } from './styles';
import { GroupsMap } from '@/models/groups';
import { EMPTY_ARRAYS } from '@/const/ui';

export interface TasksListProps extends CommonProps {
	readonly tasks: Task[] | null;
	readonly columnStatus: TaskStatus;
	readonly groupMap: GroupsMap | null;
	readonly header?: string;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TasksList: React.FC<TasksListProps> = ({
	tasks,
	className,
	columnStatus,
	header,
	groupMap,
}) => {
	const { id: roomId } = useParams();
	const moveTask = useMutation(updateTaskMutation);
	const onDrop = React.useCallback<React.DragEventHandler>(
		(evt) => {
			const id = +evt.dataTransfer.getData('taskId');
			const status = evt.dataTransfer.getData('status');
			if (status !== columnStatus && roomId != null) {
				moveTask.start({
					status: columnStatus as TaskStatus,
					roomId: Number(roomId),
					id,
				});
			}
		},
		[roomId, columnStatus]
	);

	const isLoading = !tasks;

	return (
		<Stack
			className={className}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}>
			<TaskListHeader columnStatus={columnStatus}>{header}</TaskListHeader>
			<StyledList spacing={1}>
				{isLoading
					? EMPTY_ARRAYS[4].map(() => <SkeletonTaskCard />)
					: tasks.map((task) => {
							const group = groupMap ? groupMap[task.groupId] : null;
							return <TaskCard {...task} group={group} key={task.id} />;
					  })}
			</StyledList>
		</Stack>
	);
};
