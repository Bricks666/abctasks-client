import { Stack } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { TaskColumnMenu, updateTaskModel } from '@/features/tasks';
import { SkeletonTaskCard, TaskColumnHeader } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { routes, getEmptyArray } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TaskCard } from '../task-card';

import styles from './task-column.module.css';

export interface TaskColumnProps extends CommonProps {
	readonly tasks: Task[];
	readonly isLoading: boolean;
	readonly columnStatus: TaskStatus;
	readonly header?: string | null;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TaskColumn: React.FC<TaskColumnProps> = (props) => {
	const { tasks, className, columnStatus, header, isLoading, } = props;
	const roomId = useParam(routes.room, 'id');
	const moveTask = useUnit(updateTaskModel.mutation);
	const onDrop = React.useCallback<React.DragEventHandler>(
		(evt) => {
			const id = Number(evt.dataTransfer.getData('taskId'));
			const status = evt.dataTransfer.getData('status');
			if (status === columnStatus || !Number.isInteger(id) || !status) {
				return;
			}
			moveTask.start({
				status: columnStatus as TaskStatus,
				roomId: Number(roomId),
				id,
			});
		},
		[roomId, columnStatus]
	);

	return (
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}>
			<TaskColumnHeader
				actions={
					<TaskColumnMenu roomId={roomId} columnStatus={columnStatus} />
				}>
				{header}
			</TaskColumnHeader>
			<Stack className={styles.list} spacing={1} component='main'>
				{isLoading
					? getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />)
					: tasks.map((task) => <TaskCard {...task} key={task.id} />)}
			</Stack>
		</Stack>
	);
};
