import { Stack } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { TaskColumnActions } from '@/features/tasks';
import { useTagsMap } from '@/entities/tags';
import { SkeletonTaskCard, TaskColumnHeader } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { dragTaskModel } from '../../model';
import { TaskCard } from '../task-card';

import styles from './task-column.module.css';

export interface TaskColumnProps extends CommonProps {
	readonly tasks: Task[];
	readonly roomId: number;
	readonly isLoading: boolean;
	readonly columnStatus: TaskStatus;
	readonly header?: string | null;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TaskColumn: React.FC<TaskColumnProps> = (props) => {
	const { tasks, className, columnStatus, header, isLoading, roomId, } = props;
	const onDrop = useUnit(dragTaskModel.drop);
	const tagsMap = useTagsMap();

	let items: React.ReactElement[];

	if (isLoading) {
		items = getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />);
	} else {
		items = tasks.map((task) => {
			const tags = task.tagIds.map((tagId) => tagsMap.data[tagId] ?? null);
			return <TaskCard {...task} tags={tags} key={task.id} />;
		});
	}

	return (
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}
			data-status={columnStatus}>
			<TaskColumnHeader
				actions={
					<TaskColumnActions roomId={roomId} columnStatus={columnStatus} />
				}>
				{header}
			</TaskColumnHeader>
			<Stack className={styles.list} spacing={1} component='main'>
				{items}
			</Stack>
		</Stack>
	);
};
