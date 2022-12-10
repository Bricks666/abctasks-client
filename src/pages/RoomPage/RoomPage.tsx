import cn from 'classnames';
import { useGate } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AsideBar, RoomHeader, Tasks } from '@/shared/components';
import { roomRoute } from '@/shared/configs';
import { usePageTitle, useParam } from '@/shared/lib';
import {
	TasksGate,
	GroupsGate,
	ActivityGate,
	ProgressGate,
	RoomGate
} from '@/shared/models';
import { CommonProps } from '@/shared/types';
import styles from './Rooms.module.css';
import { MainLayout } from '@/layouts';

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
