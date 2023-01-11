import AssessmentIcon from '@mui/icons-material/Assessment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { TabContext, TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { routes } from '@/shared/configs';
import { CommonProps } from '@/shared/types';

import styles from './tabs.module.css';

export const Tabs: React.FC<CommonProps> = () => {
	const { id, tab = 'tasks', } = useUnit(routes.room.base.$params);

	const onChange = React.useCallback(
		(_evt: unknown, value: string) => {
			routes.room.base.navigate({
				params: {
					id,
					tab: value,
				},
				query: {},
			});
		},
		[id]
	);

	return (
		<TabContext value={tab}>
			<TabList onChange={onChange} variant='scrollable' scrollButtons='auto'>
				<Tab
					className={styles.tab}
					icon={<ListAltIcon />}
					iconPosition='start'
					label='Задачи'
					value='tasks'
				/>
				<Tab
					className={styles.tab}
					icon={<ListAltIcon />}
					iconPosition='start'
					label='Группы'
					value='groups'
				/>
				<Tab
					className={styles.tab}
					icon={<AssessmentIcon />}
					iconPosition='start'
					label='Активности'
					value='activities'
				/>
				<Tab
					className={styles.tab}
					icon={<PeopleIcon />}
					iconPosition='start'
					label='Пользователи'
					value='users'
				/>
			</TabList>
		</TabContext>
	);
};
