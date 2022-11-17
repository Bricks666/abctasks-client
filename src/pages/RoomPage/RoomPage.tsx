import * as React from 'react';
import cn from 'classnames';
import { useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
	TasksGate,
	GroupsGate,
	ActivityGate,
	ProgressGate,
	RoomGate,
} from '@/models';
import { roomRoute } from '@/routes';
import { MainLayout } from '@/layouts';
import { usePageTitle, useParam } from '@/hooks';
import { CommonProps } from '@/types';
import { AsideBar, RoomHeader, Tasks } from '@/components';

import styles from './Rooms.module.css';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('room');
	const roomId = useParam(roomRoute, 'id');
	useGate(RoomGate, { roomId });
	useGate(TasksGate, { roomId });
	useGate(GroupsGate, { roomId });
	useGate(ActivityGate, { roomId });
	useGate(ProgressGate, { roomId });
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
