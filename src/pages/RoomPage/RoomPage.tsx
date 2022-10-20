import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/types/common';
import { usePageTitle } from '@/hooks';
import { RoomHeader } from '@/components/RoomHeader';
import { StyledAside, StyledLayout, StyledTasks } from './styles';

const RoomPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
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
