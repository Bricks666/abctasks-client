import * as React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { getProgressQuery } from '@/models/progress';
import { useGroupsMap } from '@/hooks';
import { ui } from '@/const';
import { CommonProps } from '@/types/common';
import { TaskProgress } from '../TaskProgress';
import { SkeletonTaskProgress } from '../SkeletonTaskProgress';
import { StyledList, StyledWrapper, titleSx } from './styles';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { data: progresses } = useQuery(getProgressQuery);
	const { data: groups } = useGroupsMap();

	const isLoading = !groups || !progresses;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h2' sx={titleSx}>
				{t('taskProgress.title')}
			</Typography>
			<StyledList spacing={1.5}>
				{isLoading
					? ui.EMPTY_ARRAYS[2].map(() => <SkeletonTaskProgress />)
					: progresses.map((progress) => (
							<TaskProgress
								{...progress}
								{...groups[progress.groupId]}
								key={progress.groupId}
							/>
					  ))}
			</StyledList>
		</StyledWrapper>
	);
};
