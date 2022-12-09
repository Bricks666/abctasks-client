import * as React from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { CommonProps } from '@/types';
import { TasksProgress, ActivityList, Groups } from './components';

import styles from './AsideBar.module.css';

export interface AsideBarProps extends CommonProps {}

export const AsideBar: React.FC<AsideBarProps> = React.memo(function AsideBar(
	props
) {
	const { className } = props;
	const [openTab, setOpenTab] = React.useState('progress');

	const onChange = React.useCallback((_evt: unknown, value: string) => {
		setOpenTab(value);
	}, []);

	return (
		<aside className={className}>
			<TabContext value={openTab}>
				<TabList onChange={onChange} variant='fullWidth'>
					<Tab label='Прогресс' value='progress' />
					<Tab label='Группы' value='groups' />
				</TabList>
				<TabPanel className={styles.panel} value='progress'>
					<TasksProgress className={styles.progress} />
					<ActivityList />
				</TabPanel>
				<TabPanel className={styles.panel} value='groups'>
					<Groups />
				</TabPanel>
			</TabContext>
		</aside>
	);
});
