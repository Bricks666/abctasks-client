import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityList } from '@/widgets/activities';
import { Groups } from '@/widgets/groups';
import { Header } from '@/widgets/page';
import { TasksProgress } from '@/widgets/progresses';
import { RoomHeader } from '@/widgets/rooms';
import { Tasks } from '@/widgets/tasks';
import { OpenSearchUserPopup } from '@/features/rooms';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';
import styles from './styles.module.css';
import { UserList } from './ui';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const [openTab, setOpenTab] = React.useState('progress');
	usePageTitle(t('title'));

	const onChange = React.useCallback((_evt: unknown, value: string) => {
		setOpenTab(value);
	}, []);

	return (
		<MainLayout className={cn(styles.layout, className)} header={<Header />}>
			<RoomHeader />
			<Tasks className={styles.tasks} />
			<div className={styles.aside}>
				<TabContext value={openTab}>
					<TabList onChange={onChange} variant='fullWidth'>
						<Tab label='Прогресс' value='progress' />
						<Tab label='Группы' value='groups' />
						<Tab label='Пользователи' value='users' />
					</TabList>
					<TabPanel className={styles.panel} value='progress'>
						<TasksProgress className={styles.progress} />
						<ActivityList />
					</TabPanel>
					<TabPanel className={styles.panel} value='groups'>
						<Groups />
					</TabPanel>
					<TabPanel className={styles.panel} value='users'>
						<OpenSearchUserPopup />
						<UserList />
					</TabPanel>
				</TabContext>
			</div>
		</MainLayout>
	);
};

pageModel.loaded();

export default RoomPage;