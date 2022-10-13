/* eslint-disable sonarjs/no-duplicate-string */
import * as React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGroupedTasks } from '@/hooks';
import { CommonProps } from '@/types/common';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { TasksList } from '../TasksList';
import { TaskStatus, Task } from '@/models/tasks/types';

import styles from './Tasks.module.css';

export interface Column {
	readonly headerCode: string;
	readonly tasks: Task[];
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { id: roomId } = useParams();
	const tasks = useGroupedTasks(Number(roomId));
	/*
TODO: Пересмотреть распределение на колонки
*/
	const columns = React.useMemo<Column[]>(
		() => [
			{
				headerCode: 'ready',
				tasks: tasks.ready,
				status: 'ready',
			},
			{
				headerCode: 'in progress',
				tasks: tasks['in progress'],
				status: 'in progress',
			},
			{
				headerCode: 'review',
				tasks: tasks.needReview,
				status: 'review',
			},
			{
				headerCode: 'done',
				tasks: tasks.done,
				status: 'done',
			},
		],
		[tasks]
	);

	return (
		<section className={cn(styles.tasks, className)}>
			<LoadingWrapper
				className={styles.loading}
				isLoading={false}
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
