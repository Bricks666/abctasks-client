import { Stack } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { OpenCreateTaskButton } from '@/features/tasks';

import { SkeletonTaskCard, TaskColumnHeader } from '@/entities/tasks';

import { Task, TaskStatus } from '@/shared/api';
import { getEmptyArray } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

import { dragTaskModel } from '../../model';
import { TaskCard } from '../task-card';

import styles from './task-column.module.css';

export interface TaskColumnProps extends CommonProps {
	readonly tasks: Task[];
	readonly isLoading: boolean;
	readonly columnStatus: TaskStatus;
	readonly hasActions?: boolean;
	readonly header?: string | null;
}
const onDragOver: React.DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TaskColumn: React.FC<TaskColumnProps> = (props) => {
	const { tasks, className, columnStatus, hasActions, header, isLoading, } =
		props;
	const onDrop = useUnit(dragTaskModel.drop);

	let items: React.ReactElement[];

	if (isLoading) {
		items = getEmptyArray(4).map((_, i) => <SkeletonTaskCard key={i} />);
	} else {
		items = tasks.map((task) => {
			return <TaskCard {...task} key={task.id} />;
		});
	}

	const headerActions = hasActions ? (
		<OpenCreateTaskButton columnStatus={columnStatus} />
	) : null;

	/**
	 * @todo
	 * Should I make it ul list?
	 */
	/**
	 * @todo
	 * Add translation for aria-label
	 */
	return (
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1}
			onDrop={onDrop}
			onDragOver={onDragOver}
			data-status={columnStatus}
			aria-label={header!}
			component='section'>
			<TaskColumnHeader slots={{ actions: headerActions, }}>
				{header}
			</TaskColumnHeader>
			<Stack className={styles.list} spacing={1} role='group'>
				{items}
			</Stack>
		</Stack>
	);
};
