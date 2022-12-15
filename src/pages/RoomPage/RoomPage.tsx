import cn from 'classnames';
import { useGate } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomHeader } from '@/widgets/rooms';
import { Tasks } from '@/widgets/tasks';
import { AsideBar } from '@/shared/components';
import { routes } from '@/shared/configs';
import { MainLayout } from '@/shared/layouts';
import { usePageTitle, useParam } from '@/shared/lib';
import { ActivityGate, ProgressGate } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import styles from './Rooms.module.css';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room, 'id');
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
