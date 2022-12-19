import { useMutation } from '@farfetched/react';
import { Stack } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { TaskListActions, updateTaskModel } from '@/features/tasks';
import { SkeletonTaskCard, TaskListHeader } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { routes, getEmptyArray } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TaskCard } from '../task-card';

import styles from './task-list.module.css';

export interface TaskListProps extends CommonProps {
	readonly tasks: Task[];
	readonly isLoading: boolean;
	readonly columnStatus: TaskStatus;
	readonly header?: string | null;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TaskList: React.FC<TaskListProps> = (props) => {
	const { tasks, className, columnStatus, header, isLoading, } = props;
	const roomId = useParam(routes.room, 'id');
	const moveTask = useMutation(updateTaskModel.updateTaskMutation);
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
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}>
			<TaskListHeader
				actions={
					<TaskListActions roomId={roomId} columnStatus={columnStatus} />
				}>
				{header}
			</TaskListHeader>
			<Stack className={styles.list} spacing={1} component='main'>
				{isLoading
					? getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />)
					: tasks.map((task) => <TaskCard {...task} key={task.id} />)}
			</Stack>
		</Stack>
	);
};
