import * as React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';
import { TaskStatus, TaskStructure } from '@/models/Tasks/types';
import { DropZone } from '../DropZone';
import { TaskListHeader } from '../TaskListHeader';
import { moveTask } from '@/models/Tasks';
import { DraggableTaskCard } from '../DraggableTaskCard';
import { Stack } from '@/ui/Stack';

import styles from './TasksList.module.css';

export interface TasksListProps extends CommonProps {
	readonly tasks: TaskStructure[];
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
	const onDrop = React.useCallback<React.DragEventHandler>(
		(evt) => {
			const taskId = +evt.dataTransfer.getData('taskId');
			const status = +evt.dataTransfer.getData('status');
			if (status !== columnStatus && roomId != null) {
				moveTask({
					status: columnStatus.toString() as unknown as TaskStatus,
					taskId,
					roomId,
				});
			}
		},
		[roomId, columnStatus]
	);

	return (
		<DropZone
			className={cn(styles.dropZone, className)}
			onDrop={onDrop}
			onDragOver={onDragOver}>
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
