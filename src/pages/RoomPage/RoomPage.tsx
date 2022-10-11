import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { TasksProgress } from '@/components/TasksProgress';
import { Tasks } from '@/components/Tasks';
import { usePageTitle } from '@/hooks';
import { ActivitiesList } from '@/components/ActivitiesList';
import { Stack } from '@/ui/Stack';
import { RoomHeader } from '@/components/RoomHeader';

import styles from './RoomPage.module.css';

const RoomPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	usePageTitle(t('title'));
	return (
		<main>
			<ContentLayout className={cn(styles.layout, className)}>
				<RoomHeader />
				<Tasks className={styles.tasks} />
				<Stack className={styles.aside}>
					<TasksProgress />
					<ActivitiesList />
				</Stack>
			</ContentLayout>
		</main>
	);
};

export default RoomPage;
