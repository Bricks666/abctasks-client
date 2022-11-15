import * as React from 'react';
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
import { usePageTitle, useParam } from '@/hooks';
import { CommonProps } from '@/types';
import { RoomHeader } from '@/components/RoomHeader';
import { StyledAside, StyledLayout, StyledTasks } from './styles';

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
		<StyledLayout className={className}>
			<RoomHeader />
			<StyledTasks />
			<StyledAside />
		</StyledLayout>
	);
};

export default RoomPage;
