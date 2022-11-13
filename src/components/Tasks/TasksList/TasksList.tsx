import * as React from 'react';
import { useMutation } from '@farfetched/react';
import { TaskStatus, Task, updateTaskMutation } from '@/models/tasks';
import { useParam } from '@/hooks';
import { roomRoute } from '@/routes';
import { ui } from '@/const';
import { CommonProps } from '@/types';
import { TaskListHeader } from './TaskListHeader';
import { TaskCard } from './TaskCard';
import { SkeletonTaskCard } from './SkeletonTaskCard';
import { StyledList, StyledWrapper } from './styles';

export interface TasksListProps extends CommonProps {
	readonly tasks: Task[] | null;
	readonly columnStatus: TaskStatus;
	readonly header?: string;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TasksList: React.FC<TasksListProps> = ({
	tasks,
	className,
	columnStatus,
	header,
}) => {
	const roomId = useParam(roomRoute, 'id');
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

	const loading = !tasks;

	return (
		<StyledWrapper
			className={className}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}>
			<TaskListHeader columnStatus={columnStatus} roomId={roomId}>
				{header}
			</TaskListHeader>
			<StyledList spacing={1}>
				{loading
					? ui.getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />)
					: tasks.map((task) => <TaskCard {...task} key={task.id} />)}
			</StyledList>
		</StyledWrapper>
	);
};
