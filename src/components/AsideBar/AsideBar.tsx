import * as React from 'react';
import { CommonProps } from '@/types';
import { ActivitiesList } from '../ActivitiesList';
import { StyledProgress, StyledWrapper } from './styles';

export interface AsideBarProps extends CommonProps {}

export const AsideBar: React.FC<AsideBarProps> = React.memo(function AsideBar(
	props
) {
	const { className } = props;
	return (
		<StyledWrapper className={className}>
			<StyledProgress />
			<ActivitiesList />
		</StyledWrapper>
	);
});
