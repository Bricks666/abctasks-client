import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useTasksProgress, useTasksProgressLoading } from './hooks';
import { TaskProgress } from '../TaskProgress';
import { Text } from '@/ui/Text';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { Stack } from '@/ui/Stack';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import styles from './TasksProgress.module.css';
import { CommonProps } from '@/types/common';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const progresses = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={cn(styles.wrapper, className)}>
			<Text component='h3'>{t('taskProgress.title')}</Text>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size='small' />}>
				<Stack className={styles.list}>
					{progresses.map((progress) => (
						<TaskProgress {...progress} key={progress.groupId} />
					))}
				</Stack>
			</LoadingWrapper>
		</section>
	);
};
