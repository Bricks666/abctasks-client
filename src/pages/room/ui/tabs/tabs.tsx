import AssessmentIcon from '@mui/icons-material/Assessment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { OpenSearchUserPopup } from '@/features/rooms';
import { routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { ActivityList } from '../activity-list';
import { Tasks } from '../tasks';
import { TasksProgress } from '../tasks-progresses';
import { UserInRoomList } from '../user-in-room-list';

import styles from './tabs.module.css';

export const Tabs: React.FC<CommonProps> = () => {
	const { id, tab = 'tasks', } = useUnit(routes.room.$params);
	const query = useUnit(routes.room.$query);

	const onChange = React.useCallback(
		(_evt: unknown, value: string) => {
			routes.room.navigate({
				params: {
					id,
					tab: value,
				},
				query,
			});
		},
		[id, query]
	);

	return (
		<TabContext value={tab}>
			<TabList onChange={onChange} variant='scrollable' scrollButtons='auto'>
				<Tab
					icon={<ListAltIcon />}
					iconPosition='start'
					label='Задачи'
					value='tasks'
				/>
				<Tab
					icon={<AssessmentIcon />}
					iconPosition='start'
					label='Активности'
					value='activities'
				/>
				<Tab
					icon={<PeopleIcon />}
					iconPosition='start'
					label='Пользователи'
					value='users'
				/>
			</TabList>
			<TabPanel className={styles.panel} value='tasks'>
				<div className={styles.tasksBlock}>
					<Tasks />
					<TasksProgress />
				</div>
			</TabPanel>
			<TabPanel className={styles.panel} value='activities'>
				{/*
        TODO: Заменить на фильтры и  фильтрованный список
        */}
				<ActivityList />
			</TabPanel>
			<TabPanel className={styles.panel} value='users'>
				<OpenSearchUserPopup />
				<UserInRoomList />
			</TabPanel>
		</TabContext>
	);
};
