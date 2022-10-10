import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskProgressStructure } from '@/models/Progress/types';
import { CommonProps } from '@/interfaces/common';
import { ProgressBar } from '@/ui/ProgressBar';
import { useGroup } from '@/hooks/useGroup';

export interface TaskProgressComponent
	extends CommonProps,
		TaskProgressStructure {}

export const TaskProgress: React.FC<TaskProgressComponent> = ({
	completedCount,
	totalCount,
	className,
	groupId,
}) => {
	const { t } = useTranslation('room');
	const group = useGroup(groupId);

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
