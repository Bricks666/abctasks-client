/* eslint-disable sonarjs/no-duplicate-string */
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGroupedTasks } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TaskList } from '../task-list';

import styles from './tasks.module.css';

export interface Column {
	readonly tasks: Task[] | null;
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const roomId = useParam(routes.room, 'id');
	const { data: tasks, } = useGroupedTasks(roomId);
	/*
  TODO: Пересмотреть распределение на колонки
  */
	const columns = React.useMemo<Column[]>(
		() => [
			{
				tasks: tasks?.ready || null,
				status: 'ready',
			},
			{
				tasks: tasks?.['in progress'] || null,
				status: 'in progress',
			},
			{
				tasks: tasks?.needReview || null,
				status: 'review',
			},
			{
				tasks: tasks?.done || null,
				status: 'done',
			}
		],
		[tasks]
	);

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ status, tasks, }) => (
				<TaskList
					tasks={tasks}
					columnStatus={status}
					header={t(`statuses.${status}`)}
					key={status}
				/>
			))}
		</section>
	);
};
