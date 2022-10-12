import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskProgressStructure } from '@/models/Progress/types';
import { CommonProps } from '@/types/common';
import { ProgressBar } from '@/ui/ProgressBar';

export interface TaskProgressComponent
	extends CommonProps,
		TaskProgressStructure {}

export const TaskProgress: React.FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	/* groupId, */
}) => {
	const { t } = useTranslation('room');
	const group = null;

	if (!group) {
		return null;
	}

	const { mainColor, name, secondColor } = group;

	return (
		<ProgressBar
			className={className}
			currentValue={completedCount}
			maxValue={totalCount}
			ariaText={t('taskProgress.progressAria', {
				name,
				completed: completedCount,
			})}
			progressbarBGColor={secondColor}
			progressbarColor={mainColor}>
			{name}
		</ProgressBar>
	);
};
