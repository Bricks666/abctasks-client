/* eslint-disable sonarjs/no-duplicate-string */
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGroupedTasks } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { TaskList } from '../task-list';

import styles from './tasks.module.css';

export interface Column {
	readonly tasks: Task[];
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const { data: tasks, pending, stale, } = useGroupedTasks();
	/*
  TODO: Пересмотреть распределение на колонки
  */
	const columns = React.useMemo<Column[]>(
		() => [
			{
				tasks: tasks.ready,
				status: 'ready',
			},
			{
				tasks: tasks.in_progress,
				status: 'in_progress',
			},
			{
				tasks: tasks.needReview,
				status: 'review',
			},
			{
				tasks: tasks.done,
				status: 'done',
			}
		],
		[tasks]
	);

	const isLoading = pending && !stale;

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ status, tasks, }) => (
				<TaskList
					tasks={tasks}
					isLoading={isLoading}
					columnStatus={status}
					header={t(`statuses.${status}`)}
					key={status}
				/>
			))}
		</section>
	);
};
