import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { tasksGate } from '@/models/tasks';
import { groupsGate } from '@/models/groups';
import { activityGate } from '@/models/activities';
import { progressGate } from '@/models/progress';
import { roomGate } from '@/models/rooms';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types/common';
import { RoomHeader } from '@/components/RoomHeader';
import { StyledAside, StyledLayout, StyledTasks } from './styles';

const RoomPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { id: roomId } = useParams();
	usePageTitle(t('title'));
	useGate(roomGate, { roomId: Number(roomId) });
	useGate(tasksGate, { roomId: Number(roomId) });
	useGate(groupsGate, { roomId: Number(roomId) });
	useGate(activityGate, { roomId: Number(roomId) });
	useGate(progressGate, { roomId: Number(roomId) });

	return (
		<StyledLayout className={className}>
			<RoomHeader />
			<StyledTasks />
			<StyledAside />
		</StyledLayout>
	);
};

export default RoomPage;
