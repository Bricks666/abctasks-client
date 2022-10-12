import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { TaskStatus, Task, updateTaskMutation } from '@/models/tasks';
import { CommonProps } from '@/interfaces/common';
import { DropZone } from '../DropZone';
import { TaskListHeader } from '../TaskListHeader';
import { DraggableTaskCard } from '../DraggableTaskCard';
import { Stack } from '@/ui/Stack';

import styles from './TasksList.module.css';

export interface TasksListProps extends CommonProps {
	readonly tasks: Task[];
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

	return (
		<DropZone className={className} onDrop={onDrop} onDragOver={onDragOver}>
			<Stack space='l'>
				<TaskListHeader className={styles.header} columnStatus={columnStatus}>
					{header}
				</TaskListHeader>
				<Stack space='xs'>
					{tasks.map((task) => (
						<DraggableTaskCard {...task} key={task.id} />
					))}
				</Stack>
			</Stack>
		</DropZone>
	);
};
