import ReplayIcon from '@mui/icons-material/Replay';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TaskColumn } from '@/widgets/tasks';

import { useGroupedTasks } from '@/entities/tasks';

import { Task, TaskStatus } from '@/shared/api';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction } from '@/shared/ui';

import styles from './tasks.module.css';

export interface Column {
	readonly tasks: Task[];
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const roomId = useParam(routes.room.tasks, 'id');
	const tasks = useGroupedTasks();
	/*
  TODO: Пересмотреть распределение на колонки
  */
	const columns: Column[] = [
		{
			tasks: tasks.data.ready,
			status: 'ready',
		},
		{
			tasks: tasks.data.in_progress,
			status: 'in_progress',
		},
		{
			tasks: tasks.data.needReview,
			status: 'review',
		},
		{
			tasks: tasks.data.done,
			status: 'done',
		}
	];

	const isLoading = tasks.pending && !tasks.stale;
	const isError = !!tasks.error;

	if (isError) {
		const onRetry = () => {
			tasks.start({ roomId, });
		};

		return (
			<TextWithAction
				className={className}
				actionText='retry'
				text='Tasks were not loaded. To retry?'
				onClick={onRetry}
				icon={<ReplayIcon />}
			/>
		);
	}

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ status, tasks, }) => (
				<TaskColumn
					roomId={roomId}
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
