import * as React from 'react';
import { CommonProps } from '@/types/common';
import { StyledWrapper } from './styles';
import { ActivitiesList } from '../ActivitiesList';
import { TasksProgress } from '../TasksProgress';

export interface AsideBarProps extends CommonProps {}

export const AsideBar: React.FC<AsideBarProps> = React.memo(function AsideBar(
	props
) {
	const { className } = props;
	return (
		<StyledWrapper className={className}>
			{' '}
			<TasksProgress />
			<ActivitiesList />
		</StyledWrapper>
	);
});
