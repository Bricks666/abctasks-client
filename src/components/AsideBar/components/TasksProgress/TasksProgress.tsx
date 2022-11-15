import * as React from 'react';
import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { $GroupsMap, getProgressQuery } from '@/models';
import { getEmptyArray } from '@/const';
import { CommonProps } from '@/types';
import { TaskProgress } from './TaskProgress';
import { SkeletonTaskProgress } from './SkeletonTaskProgress';
import { StyledList, StyledWrapper, titleSx } from './styles';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: progresses } = useQuery(getProgressQuery);
	const groups = useUnit($GroupsMap);

	const isLoading = !groups || !progresses;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h2' sx={titleSx}>
				{t('taskProgress.title')}
			</Typography>
			<StyledList spacing={1.5}>
				{isLoading
					? getEmptyArray(2).map((_, i) => <SkeletonTaskProgress key={i} />)
					: progresses.map((progress) => {
							const group = groups[progress.groupId];
							if (!group) {
								return null;
							}
							return (
								<TaskProgress {...progress} {...group} key={progress.groupId} />
							);
					  })}
			</StyledList>
		</StyledWrapper>
	);
};
