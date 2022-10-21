import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProgressQuery } from '@/models/progress';
import { useGroupsMap, useImminentlyQuery } from '@/hooks';
import { EMPTY_ARRAYS } from '@/const/ui';
import { CommonProps } from '@/types/common';
import { TaskProgress } from '../TaskProgress';
import { SkeletonTaskProgress } from '../SkeletonTaskProgress';
import { StyledWrapper } from './styles';

export const TasksProgress: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('room');
	const { id: roomId } = useParams();
	const { data: progresses } = useImminentlyQuery(
		getProgressQuery,
		Number(roomId),
		roomId
	);
	const { data: groups } = useGroupsMap(Number(roomId));

	const isLoading = !groups || !progresses;

	return (
		<StyledWrapper className={className} spacing={1.5}>
			<Typography variant='body2' component='h2' fontWeight={700}>
				{t('taskProgress.title')}
			</Typography>
			<Stack spacing={1.5}>
				{isLoading
					? EMPTY_ARRAYS[2].map(() => <SkeletonTaskProgress />)
					: progresses.map((progress) => (
							<TaskProgress
								{...progress}
								{...groups[progress.groupId]}
								key={progress.groupId}
							/>
					  ))}
			</Stack>
		</StyledWrapper>
	);
};
