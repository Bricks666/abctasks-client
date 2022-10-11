import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useTasksProgress, useTasksProgressLoading } from './hooks';
import { TaskProgress } from '../TaskProgress';
import { Text } from '@/ui/Text';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { Stack } from '@/ui/Stack';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import TasksProgressStyle from './TasksProgress.module.css';
import { CommonProps } from '@/interfaces/common';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const progresses = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={cn(TasksProgressStyle.wrapper, className)}>
			<Text component='h3'>{t('taskProgress.title')}</Text>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size='small' />}>
				<Stack className={TasksProgressStyle.list}>
					{progresses.map((progress) => (
						<TaskProgress {...progress} key={progress.groupId} />
					))}
				</Stack>
			</LoadingWrapper>
		</section>
	);
};
