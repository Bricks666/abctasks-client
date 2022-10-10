import * as React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { TasksProgress } from '@/components/TasksProgress';
import { Tasks } from '@/components/Tasks';
import { usePageTitle } from '@/hooks';
import { ActivitiesList } from '@/components/ActivitiesList';
import { Stack } from '@/ui/Stack';
import { RoomHeader } from '@/components/RoomHeader';

import HomePageStyle from './RoomPage.module.css';

export const RoomPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	usePageTitle(t('title'));
	return (
		<main>
			<ContentLayout className={classNames(HomePageStyle.layout, className)}>
				<RoomHeader />
				<Tasks className={HomePageStyle.tasks} />
				<Stack className={HomePageStyle.aside}>
					<TasksProgress />
					<ActivitiesList />
				</Stack>
			</ContentLayout>
		</main>
	);
};
