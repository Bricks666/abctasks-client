/* eslint-disable sonarjs/no-duplicate-string */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TaskStatus, Task } from '@/models/tasks/types';
import { useGroupedTasks, useGroupsMap } from '@/hooks';
import { CommonProps } from '@/types/common';
import { TasksList } from '../TasksList';
import { StyledWrapper } from './styles';

export interface Column {
	readonly headerCode: string;
	readonly tasks: Task[] | null;
	readonly status: TaskStatus;
}

export const Tasks: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('task');
	const { id: roomId } = useParams();
	const { data: tasks } = useGroupedTasks(Number(roomId));
	const { data: groupMap } = useGroupsMap(Number(roomId));
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
			},
		],
		[tasks]
	);

	return (
		<StyledWrapper className={className}>
			{columns.map(({ headerCode, status, tasks }) => (
				<TasksList
					tasks={tasks}
					groupMap={groupMap}
					columnStatus={status}
					header={t(`statuses.${headerCode}`)}
					key={headerCode}
				/>
			))}
		</StyledWrapper>
	);
};
