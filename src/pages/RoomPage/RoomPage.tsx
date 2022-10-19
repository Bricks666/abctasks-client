import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/types/common';
import { TasksProgress } from '@/components/TasksProgress';
import { Tasks } from '@/components/Tasks';
import { usePageTitle } from '@/hooks';
import { ActivitiesList } from '@/components/ActivitiesList';
import { Stack } from '@/ui/Stack';
import { RoomHeader } from '@/components/RoomHeader';
import { MainLayout } from '@/layouts/MainLayout';

import styles from './RoomPage.module.css';

const RoomPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	usePageTitle(t('title'));
	return (
		<MainLayout className={className}>
			<RoomHeader />
			<Tasks className={styles.tasks} />
			<Stack className={styles.aside}>
				<TasksProgress />
				<ActivitiesList />
			</Stack>
		</MainLayout>
	);
};

export default RoomPage;
