import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskColumn } from '@/widgets/tasks';
import { useGroupedTasks } from '@/entities/tasks';
import { Task, TaskStatus } from '@/shared/api';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './tasks.module.css';

export interface Column {
	readonly tasks: Task[];
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const roomId = useParam(routes.room, 'id');
	const { data: tasks, pending, stale, error, start, } = useGroupedTasks();
	/*
  TODO: Пересмотреть распределение на колонки
  */
	const columns: Column[] = [
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
	];

	const isLoading = pending && !stale;
	const isError = !!error;

	if (isError) {
		const onRetry = () => {
			start(roomId);
		};

		return (
			<RetryLoadingSlat
				className={className}
				buttonText='retry'
				content='Tasks were not loaded. To retry?'
				onRetry={onRetry}
			/>
		);
	}

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ status, tasks, }) => (
				<TaskColumn
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
