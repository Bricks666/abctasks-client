import { Groups } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import cn from 'classnames';
import { useGate } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomHeader } from '@/widgets/rooms';
import { Tasks } from '@/widgets/tasks';
import {
	TasksProgress,
	ActivityList
} from '@/shared/components/AsideBar/components';
import { routes } from '@/shared/configs';
import { MainLayout } from '@/shared/layouts';
import { usePageTitle, useParam } from '@/shared/lib';
import { ActivityGate, ProgressGate } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import styles from './Rooms.module.css';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const [openTab, setOpenTab] = React.useState('progress');
	const roomId = useParam(routes.room, 'id');
	useGate(ActivityGate, { roomId, });
	useGate(ProgressGate, { roomId, });
	usePageTitle(t('title'));

	const onChange = React.useCallback((_evt: unknown, value: string) => {
		setOpenTab(value);
	}, []);

	return (
		<MainLayout className={cn(styles.layout, className)}>
			<RoomHeader />
			<Tasks className={styles.tasks} />
			<div className={styles.aside}>
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
			</div>
		</MainLayout>
	);
};

export default RoomPage;
