import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import * as React from 'react';
import { Groups } from '@/widgets/groups';
import { CommonProps } from '@/shared/types';
import styles from './AsideBar.module.css';
import { TasksProgress, ActivityList } from './components';

export interface AsideBarProps extends CommonProps {}

export const AsideBar: React.FC<AsideBarProps> = React.memo(function AsideBar(
	props
) {
	const { className, } = props;
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
