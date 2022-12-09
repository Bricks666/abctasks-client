/* eslint-disable sonarjs/no-duplicate-string */
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskList } from './components';
import styles from './Tasks.module.css';
import { useGroupedTasks } from '@/hooks';
import { TaskStatus, Task } from '@/models';
import { CommonProps } from '@/types';

export interface Column {
	readonly headerCode: string;
	readonly tasks: Task[] | null;
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const { data: tasks, } = useGroupedTasks();
	/*
  TODO: Пересмотреть распределение на колонки
  */
	const columns = React.useMemo<Column[]>(
		() => [
			{
				headerCode: 'ready',
				tasks: tasks?.ready || null,
				status: 'ready',
			},
			{
				headerCode: 'in progress',
				tasks: tasks?.['in progress'] || null,
				status: 'in progress',
			},
			{
				headerCode: 'review',
				tasks: tasks?.needReview || null,
				status: 'review',
			},
			{
				headerCode: 'done',
				tasks: tasks?.done || null,
				status: 'done',
			}
		],
		[tasks]
	);

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ headerCode, status, tasks, }) => (
				<TaskList
					tasks={tasks}
					columnStatus={status}
					header={t(`statuses.${headerCode}`)}
					key={headerCode}
				/>
			))}
		</section>
	);
};
