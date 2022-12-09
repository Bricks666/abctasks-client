import cn from 'classnames';
import { useGate } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AsideBar, RoomHeader, Tasks } from '@/shared/components';
import styles from './Rooms.module.css';
import { usePageTitle, useParam } from '@/hooks';
import { MainLayout } from '@/layouts';
import {
	TasksGate,
	GroupsGate,
	ActivityGate,
	ProgressGate,
	RoomGate
} from '@/models';
import { roomRoute } from '@/routes';
import { CommonProps } from '@/types';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(roomRoute, 'id');
	useGate(RoomGate, { roomId, });
	useGate(TasksGate, { roomId, });
	useGate(GroupsGate, { roomId, });
	useGate(ActivityGate, { roomId, });
	useGate(ProgressGate, { roomId, });
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)}>
			<RoomHeader />
			<Tasks className={styles.tasks} />
			<AsideBar className={styles.aside} />
		</MainLayout>
	);
};

export default RoomPage;
