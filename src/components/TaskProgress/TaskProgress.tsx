import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/models/progress/types';
import { CommonProps } from '@/types/common';
import { StyledLegend, StyledProgress } from './styles';
import { Group } from '@/models/groups';

export interface TaskProgressComponent
	extends CommonProps,
		Omit<Progress, 'groupId'>,
		Pick<Group, 'mainColor' | 'secondColor' | 'name'> {}

export const TaskProgress: React.FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	mainColor,
	secondColor,
	name,
}) => {
	const { t } = useTranslation('room');

	const value = (completedCount / totalCount) * 100;

	return (
		<div>
			<StyledLegend variant='body1'>
				{name}{' '}
				<Typography>
					{completedCount}/{totalCount}
				</Typography>
			</StyledLegend>
			<StyledProgress
				className={className}
				variant='determinate'
				value={value}
				valueBuffer={100}
				aria-label={t('taskProgress.progressAria', {
					name,
					completed: completedCount,
				})}
				secondColor={secondColor}
				mainColor={mainColor}
			/>
		</div>
	);
};
