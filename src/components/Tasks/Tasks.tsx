import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useGroupedTasks, useLoadingTasks } from '@/hooks';
import { CommonProps } from '@/interfaces/common';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { TasksList } from '../TasksList';
import { TaskStatus, TaskStructure } from '@/models/Tasks/types';

import styles from './Tasks.module.css';

export interface Column {
	readonly headerCode: string;
	readonly tasks: TaskStructure[];
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const tasks = useGroupedTasks();
	const isLoading = useLoadingTasks();

	const columns = React.useMemo<Column[]>(
		() => [
			{
				headerCode: 'ready',
				tasks: tasks.ready,
				status: TaskStatus.READY,
			},
			{
				headerCode: 'inProgress',
				tasks: tasks.inProgress,
				status: TaskStatus.IN_PROGRESS,
			},
			{
				headerCode: 'review',
				tasks: tasks.needReview,
				status: TaskStatus.REVIEW,
			},
			{
				headerCode: 'done',
				tasks: tasks.done,
				status: TaskStatus.DONE,
			},
		],
		[tasks]
	);

	return (
		<section className={cn(styles.tasks, className)}>
			<LoadingWrapper
				className={styles.loading}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}>
				{columns.map(({ headerCode, status, tasks }) => (
					<TasksList
						tasks={tasks}
						columnStatus={status}
						header={t(`statuses.${headerCode}`)}
						key={headerCode}
					/>
				))}
			</LoadingWrapper>
		</section>
	);
};
