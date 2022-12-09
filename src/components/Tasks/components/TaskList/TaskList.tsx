import * as React from 'react';
import cn from 'classnames';
import { Stack } from '@mui/material';
import { useMutation } from '@farfetched/react';
import { TaskStatus, Task, updateTaskMutation } from '@/models';
import { useParam } from '@/hooks';
import { roomRoute } from '@/routes';
import { getEmptyArray } from '@/const';
import { CommonProps } from '@/types';
import { SkeletonTaskCard, TaskCard, TaskListHeader } from './components';

import styles from './TaskList.module.css';

export interface TaskListProps extends CommonProps {
	readonly tasks: Task[] | null;
	readonly columnStatus: TaskStatus;
	readonly header?: string | null;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TaskList: React.FC<TaskListProps> = ({
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
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}>
			<TaskListHeader columnStatus={columnStatus} roomId={roomId}>
				{header}
			</TaskListHeader>
			<Stack className={styles.list} spacing={1} component='main'>
				{loading
					? getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />)
					: tasks.map((task) => <TaskCard {...task} key={task.id} />)}
			</Stack>
		</Stack>
	);
};
