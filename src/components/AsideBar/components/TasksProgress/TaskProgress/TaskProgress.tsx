import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Progress, Group } from '@/models';
import { CommonProps } from '@/types';
import { StyledLegend, StyledProgress } from './styles';

export interface TaskProgressComponent
	extends CommonProps,
		Omit<Progress, 'groupId'>,
		Pick<Group, 'mainColor' | 'secondColor' | 'name'> {}

export const TaskProgress: React.FC<TaskProgressComponent> = React.memo(
	(props) => {
		const {
			completedCount,
			totalCount,
			className,
			mainColor,
			secondColor,
			name,
		} = props;
		const { t } = useTranslation('room');

		const value = (completedCount / totalCount) * 100;

		return (
			<div>
				<StyledLegend variant='body1'>
					{name}{' '}
					<Typography component='span' color='#b4b4b4'>
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
	}
);
